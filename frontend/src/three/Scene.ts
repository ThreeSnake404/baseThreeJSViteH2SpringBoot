import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createRenderer } from './core/Renderer';
import { setupResize } from './core/ResizeHandler';
import { FACILITY_CENTERS, FACILITY_PADS, FAILURE_SPHERE_UNIFORM_RADIUS, PAD_CONFIG } from '../padConfig';

/** Radians per second when steering left/right on the XZ plane. */
const STEER_SPEED = 1.2;
/** Units per second when moving forward/back on the XZ plane. */
const MOVE_SPEED = 3;
/** Length of the drag-axis line (positive and negative) so it goes off screen. */
const DRAG_AXIS_LINE_EXTENT = 1000;
/** NDC-to-radians scale for drag-to-rotate (pointer delta -> rotation delta). */
const ROTATE_SENSITIVITY = 2;
/** Rest orientation for RotationHelper (90° around Y) — used when loaded and when detached so rotations are always from global X,Y,Z. */
const ROTATION_HELPER_REST_EULER = { x: 0, y: Math.PI / 2, z: 0 };
/** Min scale factor to avoid zero or negative. */
const SCALE_MIN = 0.05;
/** Number of stacked planes per battery (forms a square when viewed). */
const BATTERY_SEGMENTS = 10;
/** Full cycle duration in seconds for empty-battery blink (yellow → red → yellow). */
const BATTERY_BLINK_CYCLE = 1;
/** Rack layout: battery width 1, gap = 1/5 of width; same gap between border and first/last battery. */
const RACK_BATTERY_WIDTH = 1;
const RACK_GAP = RACK_BATTERY_WIDTH / 5;
const RACK_PANEL_WIDTH = 4 * RACK_BATTERY_WIDTH + 3 * RACK_GAP + 2 * RACK_GAP;
const RACK_PANEL_HEIGHT = 1.2;
const RACK_CORNER_RADIUS = 0.15;
const RACK_BATTERY_X_OFFSETS: [number, number, number, number] = [
  -RACK_PANEL_WIDTH / 2 + RACK_GAP + RACK_BATTERY_WIDTH / 2,
  -RACK_PANEL_WIDTH / 2 + RACK_GAP + RACK_BATTERY_WIDTH / 2 + (RACK_BATTERY_WIDTH + RACK_GAP),
  -RACK_PANEL_WIDTH / 2 + RACK_GAP + RACK_BATTERY_WIDTH / 2 + 2 * (RACK_BATTERY_WIDTH + RACK_GAP),
  -RACK_PANEL_WIDTH / 2 + RACK_GAP + RACK_BATTERY_WIDTH / 2 + 3 * (RACK_BATTERY_WIDTH + RACK_GAP),
];

/** Bug waypoint: speed and arrival threshold. */
const BUG_WAYPOINT_SPEED = 2;
const BUG_WAYPOINT_ARRIVAL = 0.15;
const GROUND_PLANE_Y = 0.1;
/** Y-rotation offset so bug front (blue capsule) points toward waypoint; back (3x3 boxes) is opposite. */
const BUG_FORWARD_Y_OFFSET = -Math.PI / 2;
/** Charge value for empty slot (drawn black). */
const BATTERY_EMPTY = -1;
/** Seconds to fully charge a drained battery at a rack. */
const BATTERY_CHARGE_TIME = 10;
/** Max batteries a bug can carry. */
const BUG_MAX_BATTERIES = 9;
/** Distance from bug to pad center to trigger dock dialog. */
const DOCK_THRESHOLD = 1.5;
/** Duration in seconds for facility failure sphere expansion (red then dull gray). */
const FAILURE_SPHERE_DURATION = 2;

const CUBE_COLORS = [
  { name: 'red', hex: 0xff0000 },
  { name: 'green', hex: 0x00ff00 },
  { name: 'blue', hex: 0x0000ff },
  { name: 'orange', hex: 0xffa500 },
  { name: 'purple', hex: 0x800080 },
  { name: 'pink', hex: 0xff69b4 },
] as const;

export type OnColorChange = (currentColor: string, nextColor: string) => void;

export type SelectedObjectInfo = {
  id: string;
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  sx: number;
  sy: number;
  sz: number;
} | null;

export type CameraInfo = {
  position: { x: number; y: number; z: number };
  target: { x: number; y: number; z: number };
  projection: 'Perspective' | 'Orthographic';
  fov: number;
  near: number;
  far: number;
};

export type CameraParams = {
  position?: [number, number, number];
  target?: [number, number, number];
  fov?: number;
  near?: number;
  far?: number;
  projection?: 'Perspective' | 'Orthographic';
};

export type HoverInfo = {
  label: string;
  screenX: number;
  screenY: number;
} | null;

export type BatteryApi = {
  createBattery: (
    id: string,
    position?: [number, number, number],
    parent?: THREE.Object3D
  ) => void;
  setBatteryCharge: (id: string, charge: number) => void;
  /** Current charge (0–100) or negative for empty. Undefined if battery not found. */
  getBatteryCharge: (id: string) => number | undefined;
  /** True if this slot was filled with a full battery from the bug (simulation should not overwrite). */
  isBatteryUserFilled: (id: string) => boolean;
  removeBattery: (id: string) => void;
  createBatteryRack: (
    rackId: string,
    position?: [number, number, number],
    initialCharges?: number[],
    orientation?: 'hrack' | 'vrack'
  ) => void;
  removeBatteryRack: (rackId: string) => void;
  setFacilityFailed: (facilityId: string, failed: boolean) => void;
  /** Reset simulation: refill all batteries, clear overlays, return bugs to start. */
  resetSimulation: () => void;
  /** Re-apply battery colors (fixes black draw after zoom/camera change). */
  refreshBatteryMaterials: () => void;
  /** Get rack state for dock dialog. */
  getRackState: (rackId: string) => { charged: number; drained: number; empty: number };
  /** Get bug inventory (charged, drained; max 9 total). */
  getBugInventory: (bugId: string) => { charged: number; drained: number };
  /** Apply dock transfer after user answers dialog. */
  dockAtPad: (
    rackId: string,
    bugId: string,
    loadCharged: number,
    acceptDrained: number,
    loadYes: boolean,
    acceptYes: boolean
  ) => void;
};

export type DockAtPadParams = {
  rackId: string;
  bugId: string;
  loadCharged: number;
  acceptDrained: number;
  /** First question (e.g. "Transfer n drained batteries from the rack to the bug?"). */
  question1: string;
  /** Second question (e.g. "Transfer m full batteries from the bug to the rack?"). */
  question2: string;
  reason?: string;
};

export type PlacementFacilityOptions = {
  getPFEnabled: () => boolean;
  onSelectionChange: (info: SelectedObjectInfo) => void;
  onCameraChange?: (info: CameraInfo) => void;
  onHoverInfoChange?: (info: HoverInfo) => void;
  onRoutingChange?: (isRouting: boolean) => void;
  onDockAtPad?: (params: DockAtPadParams, onAnswer: (loadYes: boolean, acceptYes: boolean) => void) => void;
  onRimWallBlock?: () => void;
  setPositionRef?: { current: ((x: number, y: number, z: number) => void) | null };
  setRotationRef?: { current: ((rx: number, ry: number, rz: number) => void) | null };
  setScaleRef?: { current: ((sx: number, sy: number, sz: number) => void) | null };
  setCameraRef?: { current: ((params: CameraParams) => void) | null };
  batteryApiRef?: { current: BatteryApi | null };
};

/**
 * Single render loop and scene lifecycle. Cube is clickable; cycles through colors and invokes onColorChange.
 * Optionally loads a GLB model (e.g. AxisHelper.glb) at world origin for Blender orientation reference.
 */
export class Scene {
  private readonly canvas: HTMLCanvasElement;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  private initialCameraDistance = 0;
  private readonly clock: THREE.Clock;
  private readonly cubeMesh: THREE.Mesh;
  private readonly markerSphere: THREE.Mesh;
  private readonly orbitControls: OrbitControls;
  private readonly onColorChange?: OnColorChange;
  private readonly axisHelperUrl?: string;
  private readonly referenceVehicleUrl?: string;
  private axisHelperGroup: THREE.Group | null = null;
  private referenceVehicleGroup: THREE.Group | null = null;
  private shinyPathGroup: THREE.Group | null = null;
  private readonly buggies = new Map<string, THREE.Group>();
  /** Bug currently being given waypoints (has selection circle + connecting line). */
  private activeRoutingBugId: string | null = null;

  private setActiveRoutingBugId(id: string | null): void {
    const wasRouting = this.activeRoutingBugId !== null;
    this.activeRoutingBugId = id;
    const isRouting = id !== null;
    if (wasRouting !== isRouting) {
      this.pfOptions?.onRoutingChange?.(isRouting);
    }
  }
  /** Per-bug route state so multiple bugs can have active routes. */
  private readonly bugRouteStates = new Map<
    string,
    {
      waypoints: THREE.Vector3[];
      waypointTerminalPlaced: boolean;
      waypointCurrentIndex: number;
      selectionCircle: THREE.Group | null;
      waypointMarkersGroup: THREE.Group | null;
      waypointMarkerObjects: THREE.Group[];
    }
  >();
  private readonly groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -GROUND_PLANE_Y);
  private mousePosition3D: THREE.Vector3 | null = null;
  private connectingLine: THREE.Line | null = null;
  private readonly waypointLinePoints: THREE.Vector3[] = [];
  private lastFrameNearPadsByBug = new Map<string, Set<string>>();
  private readonly tempVec3b = new THREE.Vector3();
  private readonly bugInventory = new Map<string, { charged: number; drained: number }>();
  private readonly bugStartPads = new Map<string, { padName: string; rotation: number }>();
  private readonly batteriesAllowedToCharge = new Set<string>();
  /** Battery IDs that are empty (transferred out). Never blink these; always draw black. */
  private readonly emptyBatteryIds = new Set<string>();
  /** Battery IDs filled with a full from the bug at a facility; simulation must not overwrite. */
  private readonly userFilledBatteryIds = new Set<string>();
  private colorIndex = 0;
  private readonly raycaster = new THREE.Raycaster();
  private readonly segRaycaster = new THREE.Raycaster();
  private rimWallMesh: THREE.Object3D | null = null;
  private readonly pointer = new THREE.Vector2();
  private tooltipEl: HTMLDivElement | null = null;
  private readonly keysPressed = new Set<string>();
  private readonly moveDirection = new THREE.Vector3();
  private readonly pfOptions?: PlacementFacilityOptions;
  private selectedObject: THREE.Object3D | null = null;
  private selectionOverlay: THREE.Group | null = null;
  private pointerDownOnSelected = false;
  private gKeyPending = false;
  private rKeyPending = false;
  private rotateMode: 'x' | 'y' | 'z' | null = null;
  private lastPointerRotate: THREE.Vector2 | null = null;
  private rotationHelperGroup: THREE.Group | null = null;
  private dragMode: 'x' | 'y' | 'z' | null = null;
  private dragStartObjectPosition: THREE.Vector3 | null = null;
  private dragStartIntersection: THREE.Vector3 | null = null;
  private dragAxisLine: THREE.Line | null = null;
  private scaleMode = false;
  private scaleStartScale: THREE.Vector3 | null = null;
  private scaleStartPointerDist = 0;
  private readonly batteries = new Map<
    string,
    { group: THREE.Group; planes: THREE.Mesh[]; charge: number }
  >();
  private readonly racks = new Map<string, THREE.Group>();
  private readonly facilityFailureOverlays = new Map<string, THREE.Group>();
  private mapHalfExtent = 10;
  private readonly dragPlane = new THREE.Plane();
  private readonly dragPlaneNormal = new THREE.Vector3();
  private readonly dragIntersect = new THREE.Vector3();
  private readonly rotateAxis = new THREE.Vector3();
  private readonly rotateQuat = new THREE.Quaternion();
  private readonly tempVec3 = new THREE.Vector3();
  private resizeDispose: (() => void) | null = null;
  private rafId: number | null = null;
  private disposed = false;
  private boundOnPointerDown: (e: PointerEvent) => void;
  private boundOnPointerMove: (e: PointerEvent) => void;
  private boundOnKeyDown: (e: KeyboardEvent) => void;
  private boundOnKeyUp: (e: KeyboardEvent) => void;
  private boundOnPointerUp: (e: PointerEvent) => void;
  private boundOnOrbitChange: () => void;
  private boundOnContextMenu: (e: MouseEvent) => void;

  constructor(
    canvas: HTMLCanvasElement,
    onColorChange?: OnColorChange,
    axisHelperUrl?: string,
    referenceVehicleUrl?: string,
    pfOptions?: PlacementFacilityOptions
  ) {
    this.canvas = canvas;
    this.onColorChange = onColorChange;
    this.axisHelperUrl = axisHelperUrl;
    this.referenceVehicleUrl = referenceVehicleUrl;
    this.pfOptions = pfOptions;
    this.renderer = createRenderer(canvas);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      canvas.clientWidth / canvas.clientHeight || 1,
      0.1,
      1000
    );
    // Temporary initial position; will be updated after ShinyPath loads.
    this.camera.position.set(0, 22, 0);
    this.camera.lookAt(0, 0, 0);
    this.orbitControls = new OrbitControls(this.camera, this.canvas);
    this.orbitControls.target.set(0, 0, 0);
    this.clock = new THREE.Clock();

    // Enough light to see GLB models (Blender exports often use MeshStandardMaterial)
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const directional = new THREE.DirectionalLight(0xffffff, 0.9);
    directional.position.set(2, 4, 3);
    const fill = new THREE.DirectionalLight(0xffffff, 0.3);
    fill.position.set(-2, 1, 2);
    this.scene.add(ambient, directional, fill);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: CUBE_COLORS[0].hex,
    });
    this.cubeMesh = new THREE.Mesh(geometry, material);
    this.cubeMesh.visible = false; // hidden for now; AxisHelper.glb at origin is the focus
    this.scene.add(this.cubeMesh);

    const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    this.markerSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.markerSphere.position.set(2, 1, 0);
    this.scene.add(this.markerSphere);

    this.boundOnPointerDown = this.onPointerDown.bind(this);
    this.boundOnPointerMove = this.onPointerMove.bind(this);
    this.boundOnKeyDown = this.onKeyDown.bind(this);
    this.boundOnKeyUp = this.onKeyUp.bind(this);
    this.boundOnPointerUp = this.onPointerUp.bind(this);
    this.boundOnOrbitChange = () => {
      if (this.pfOptions?.onCameraChange) this.pfOptions.onCameraChange(this.getCameraInfo());
    };
    this.boundOnContextMenu = (e: MouseEvent) => {
      if (this.activeRoutingBugId || this.bugRouteStates.size > 0) e.preventDefault();
    };
  }

  private setCameraPreset(preset: 'front' | 'back' | 'top' | 'bottom' | 'side' | 'left'): void {
    const target = this.orbitControls.target;
    const d = this.camera.position.distanceTo(target);
    switch (preset) {
      case 'front':
        this.camera.position.set(target.x, target.y, target.z + d);
        break;
      case 'back':
        this.camera.position.set(target.x, target.y, target.z - d);
        break;
      case 'top':
        this.camera.position.set(target.x, target.y + d, target.z);
        break;
      case 'bottom':
        this.camera.position.set(target.x, target.y - d, target.z);
        break;
      case 'side':
        this.camera.position.set(target.x + d, target.y, target.z);
        break;
      case 'left':
        this.camera.position.set(target.x - d, target.y, target.z);
        break;
    }
    this.camera.lookAt(target);
    if (this.pfOptions?.onCameraChange) this.pfOptions.onCameraChange(this.getCameraInfo());
  }

  private createBattery(
    id: string,
    position?: [number, number, number],
    parent?: THREE.Object3D
  ): void {
    if (this.batteries.has(id)) return;
    const group = new THREE.Group();
    const planes: THREE.Mesh[] = [];
    const segW = RACK_BATTERY_WIDTH;
    const segH = segW / BATTERY_SEGMENTS;
    for (let i = 0; i < BATTERY_SEGMENTS; i++) {
      const geom = new THREE.PlaneGeometry(segW, segH);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        depthTest: false,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.renderOrder = 10;
      mesh.position.y = (i + 0.5) * segH - segW / 2;
      group.add(mesh);
      planes.push(mesh);
    }
    if (position) group.position.set(position[0], position[1], position[2]);
    if (parent) {
      group.rotation.x = -Math.PI / 2;
      parent.add(group);
    } else {
      this.scene.add(group);
    }
    this.batteries.set(id, { group, planes, charge: 0 });
    this.updateBatteryColors(id, 0);
  }

  private makeRoundedRectShape(w: number, h: number, r: number): THREE.Shape {
    const shape = new THREE.Shape();
    const x = w / 2 - r;
    const y = h / 2 - r;
    shape.moveTo(-x, -h / 2);
    shape.lineTo(x, -h / 2);
    shape.absarc(w / 2 - r, -h / 2 + r, r, -Math.PI / 2, 0);
    shape.lineTo(w / 2, h / 2 - r);
    shape.absarc(w / 2 - r, h / 2 - r, r, 0, Math.PI / 2);
    shape.lineTo(-w / 2 + r, h / 2);
    shape.absarc(-w / 2 + r, h / 2 - r, r, Math.PI / 2, Math.PI);
    shape.lineTo(-w / 2, -h / 2 + r);
    shape.absarc(-w / 2 + r, -h / 2 + r, r, Math.PI, Math.PI * 1.5);
    return shape;
  }

  private createBatteryRack(
    rackId: string,
    position?: [number, number, number],
    initialCharges?: number[],
    orientation: 'hrack' | 'vrack' = 'hrack'
  ): void {
    const existing = this.racks.get(rackId);
    if (existing) {
      if (position) existing.position.set(position[0], position[1], position[2]);
      existing.rotation.y = orientation === 'vrack' ? Math.PI / 2 : 0;
      return;
    }
    const rackGroup = new THREE.Group();
    rackGroup.name = rackId;
    if (position) rackGroup.position.set(position[0], position[1], position[2]);

    const shape = this.makeRoundedRectShape(
      RACK_PANEL_WIDTH,
      RACK_PANEL_HEIGHT,
      RACK_CORNER_RADIUS
    );
    const panelGeom = new THREE.ShapeGeometry(shape);
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      emissive: 0x000000,
    });
    const panelMesh = new THREE.Mesh(panelGeom, panelMat);
    panelMesh.rotation.x = -Math.PI / 2;
    rackGroup.add(panelMesh);

    const borderPoints2D = shape.getPoints(24);
    const borderPoints3D = borderPoints2D.map(
      (p) => new THREE.Vector3(p.x, p.y, 0)
    );
    const borderGeom = new THREE.BufferGeometry().setFromPoints(borderPoints3D);
    const borderMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
    });
    const borderLine = new THREE.LineLoop(borderGeom, borderMat);
    borderLine.rotation.x = -Math.PI / 2;
    rackGroup.add(borderLine);

    for (let i = 0; i < 4; i++) {
      const batId = `${rackId}-battery-${i + 1}`;
      const pos: [number, number, number] = [RACK_BATTERY_X_OFFSETS[i], 0, 0];
      this.createBattery(batId, pos, rackGroup);
      if (initialCharges && initialCharges[i] !== undefined) {
        this.setBatteryCharge(batId, initialCharges[i]);
      }
    }

    if (orientation === 'vrack') {
      rackGroup.rotation.y = Math.PI / 2;
    }

    rackGroup.scale.set(0.25, 0.25, 0.25);
    this.scene.add(rackGroup);
    this.racks.set(rackId, rackGroup);
  }

  private removeBatteryRack(rackId: string): void {
    const rackGroup = this.racks.get(rackId);
    if (!rackGroup) return;
    for (let i = 1; i <= 4; i++) {
      this.removeBattery(`${rackId}-battery-${i}`);
    }
    rackGroup.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose();
        (obj.material as THREE.Material)?.dispose();
      } else if (obj instanceof THREE.Line) {
        obj.geometry?.dispose();
        (obj.material as THREE.Material)?.dispose();
      }
    });
    this.scene.remove(rackGroup);
    this.racks.delete(rackId);
  }

  private createFacilityFailureOverlay(facilityId: string): THREE.Group {
    const center = FACILITY_CENTERS[facilityId];
    if (!center) {
      const g = new THREE.Group();
      g.visible = false;
      return g;
    }
    const group = new THREE.Group();
    group.position.set(center[0], center[1], center[2]);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xcc0000,
      transparent: true,
      opacity: 0.8,
    });
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 24), mat);
    group.add(mesh);
    group.userData.facilityId = facilityId;
    group.userData.mesh = mesh;
    group.userData.material = mat;
    group.userData.startTime = null as number | null;
    group.userData.done = false;
    const R = FAILURE_SPHERE_UNIFORM_RADIUS;
    group.scale.setScalar(R * 0.1);
    group.visible = false;
    this.scene.add(group);
    return group;
  }

  private setFacilityFailed(facilityId: string, failed: boolean): void {
    let overlay = this.facilityFailureOverlays.get(facilityId);
    if (!overlay) {
      overlay = this.createFacilityFailureOverlay(facilityId);
      this.facilityFailureOverlays.set(facilityId, overlay);
    }
    if (failed && overlay.userData.startTime == null) {
      overlay.userData.startTime = this.clock.getElapsedTime();
      overlay.userData.done = false;
      const mat = overlay.userData.material as THREE.MeshBasicMaterial;
      mat.color.setHex(0xcc0000);
      mat.opacity = 0.8;
    }
    overlay.visible = failed;
  }

  private updateFacilityFailureOverlays(): void {
    const t = this.clock.getElapsedTime();
    const R = FAILURE_SPHERE_UNIFORM_RADIUS;
    this.facilityFailureOverlays.forEach((group) => {
      if (!group.visible) return;
      const mat = group.userData.material as THREE.MeshBasicMaterial;
      const startTime = group.userData.startTime as number | null;
      if (startTime == null) return;
      const elapsed = t - startTime;
      if (group.userData.done) {
        group.scale.setScalar(R * 1.1);
        return;
      }
      if (elapsed >= FAILURE_SPHERE_DURATION) {
        group.scale.setScalar(R * 1.1);
        mat.color.setHex(0x555555);
        mat.transparent = false;
        mat.opacity = 1;
        group.userData.done = true;
        return;
      }
      const u = elapsed / FAILURE_SPHERE_DURATION;
      const scale = R * (0.1 + 1.0 * u);
      group.scale.setScalar(scale);
    });
  }

  private updateBatteryColors(id: string, charge: number): void {
    const bat = this.batteries.get(id);
    if (!bat) return;
    const { planes } = bat;
    bat.charge = charge;
    if (charge < 0) {
      planes.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.color.setHex(0x000000);
      });
      return;
    }
    for (let i = 0; i < planes.length; i++) {
      const mesh = planes[i];
      const mat = mesh.material as THREE.MeshBasicMaterial;
      const threshold = (i + 1) * (100 / BATTERY_SEGMENTS);
      const isGreen = charge >= threshold;
      mat.color.setHex(isGreen ? 0x00ff00 : 0xff0000);
    }
  }

  private setBatteryCharge(id: string, charge: number): void {
    const bat = this.batteries.get(id);
    if (!bat) return;
    const c = charge < 0 ? BATTERY_EMPTY : Math.max(0, Math.min(100, charge));
    this.updateBatteryColors(id, c);
  }

  private getBatteryCharge(id: string): number | undefined {
    const bat = this.batteries.get(id);
    return bat === undefined ? undefined : bat.charge;
  }

  private removeBattery(id: string): void {
    const bat = this.batteries.get(id);
    if (!bat) return;
    this.scene.remove(bat.group);
    bat.planes.forEach((mesh) => {
      mesh.geometry.dispose();
      (mesh.material as THREE.Material).dispose();
    });
    this.batteries.delete(id);
  }

  private static readonly BLINK_YELLOW = new THREE.Color(0xffff00);
  private static readonly BLINK_RED = new THREE.Color(0xff0000);
  private readonly blinkLerpColor = new THREE.Color();

  private updateBatteryBlink(elapsed: number): void {
    this.emptyBatteryIds.forEach((id) => {
      const bat = this.batteries.get(id);
      if (!bat) return;
      bat.planes.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.color.setHex(0x000000);
      });
    });
    const t = (elapsed % BATTERY_BLINK_CYCLE) / BATTERY_BLINK_CYCLE;
    const smooth = 0.5 - 0.5 * Math.cos(t * Math.PI * 2);
    this.blinkLerpColor.lerpColors(
      Scene.BLINK_YELLOW,
      Scene.BLINK_RED,
      smooth
    );
    const blinkHex = this.blinkLerpColor.getHex();
    this.batteries.forEach((bat, id) => {
      if (this.emptyBatteryIds.has(id)) return;
      if (bat.charge < 0) return;
      if (bat.charge !== 0) return;
      bat.planes.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.color.setHex(blinkHex);
      });
    });
  }

  private resetSimulation(): void {
    // Clear all route/waypoint state
    this.clearWaypointState();

    // Clear battery transfer sets
    this.emptyBatteryIds.clear();
    this.userFilledBatteryIds.clear();
    this.batteriesAllowedToCharge.clear();

    // Refill all batteries to 100
    for (const [id] of this.batteries) {
      this.updateBatteryColors(id, 100);
    }

    // Clear bug inventories
    this.bugInventory.clear();

    // Clear all facility failure overlays
    for (const [facilityId] of this.facilityFailureOverlays) {
      this.setFacilityFailed(facilityId, false);
    }

    // Return bugs to starting positions and rotations
    for (const [bugId, { padName, rotation }] of this.bugStartPads) {
      const bug = this.buggies.get(bugId);
      if (!bug) continue;
      bug.rotation.y = rotation;
      this.positionBuggyOnPad(padName, bug);
    }
  }

  private refreshBatteryMaterials(): void {
    this.batteries.forEach((bat, id) => {
      this.updateBatteryColors(id, bat.charge);
    });
  }

  private onKeyDown(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
    if (key === 'escape' && this.activeRoutingBugId) {
      this.clearBugWaypointState(this.activeRoutingBugId);
      this.setActiveRoutingBugId(null);
      event.preventDefault();
      return;
    }
    const code = event.code;
    const pfOn = this.pfOptions?.getPFEnabled();
    if (pfOn) {
      const shift = event.shiftKey;
      if (key === '1' || code === 'Numpad1') {
        event.preventDefault();
        this.setCameraPreset(shift ? 'back' : 'front');
        return;
      }
      if (key === '3' || code === 'Numpad3') {
        event.preventDefault();
        this.setCameraPreset(shift ? 'left' : 'side');
        return;
      }
      if (key === '7' || code === 'Numpad7') {
        event.preventDefault();
        this.setCameraPreset(shift ? 'bottom' : 'top');
        return;
      }
    }
    if (pfOn && this.selectedObject) {
      if (key === 'S') {
        event.preventDefault();
        this.saveLayout();
        return;
      }
      if (this.pointerDownOnSelected) {
        if (key === 'g') {
          event.preventDefault();
          this.gKeyPending = true;
          return;
        }
        if (key === 'r') {
          event.preventDefault();
          this.rKeyPending = true;
          return;
        }
        if (this.gKeyPending && (key === 'x' || key === 'y' || key === 'z')) {
          event.preventDefault();
          this.gKeyPending = false;
          this.dragMode = key;
          if (this.selectedObject) {
            this.dragStartObjectPosition = this.selectedObject.position.clone();
            this.dragStartIntersection = null;
            if (key === 'x') this.dragPlaneNormal.set(0, 1, 0);
            else if (key === 'y') this.dragPlaneNormal.set(0, 0, 1);
            else this.dragPlaneNormal.set(0, 1, 0);
            this.createDragAxisLine(key);
          }
          return;
        }
        if (this.rKeyPending && (key === 'x' || key === 'y' || key === 'z')) {
          event.preventDefault();
          this.rKeyPending = false;
          this.rotateMode = key;
          this.lastPointerRotate = null;
          if (this.selectedObject && this.rotationHelperGroup) this.attachRotationHelper(key);
          return;
        }
        if (key === 's') {
          event.preventDefault();
          this.scaleMode = true;
          if (this.selectedObject) {
            this.scaleStartScale = this.selectedObject.scale.clone();
            this.selectedObject.getWorldPosition(this.tempVec3);
            this.tempVec3.project(this.camera);
            const dx = this.pointer.x - this.tempVec3.x;
            const dy = this.pointer.y - this.tempVec3.y;
            this.scaleStartPointerDist = Math.max(Math.hypot(dx, dy), 0.01);
          }
          return;
        }
      }
    }
    if (!pfOn && (key === 'a' || key === 'd' || key === 'w' || key === 's')) {
      event.preventDefault();
      this.keysPressed.add(key);
    }
  }

  private onKeyUp(event: KeyboardEvent): void {
    this.keysPressed.delete(event.key.toLowerCase());
  }

  private getSelectableRoots(): THREE.Object3D[] {
    const roots: THREE.Object3D[] = [];
    if (this.referenceVehicleGroup) roots.push(this.referenceVehicleGroup);
    this.buggies.forEach((g) => roots.push(g));
    return roots;
  }

  private findRootForObject(obj: THREE.Object3D): THREE.Object3D | null {
    const roots = this.getSelectableRoots();
    let current: THREE.Object3D | null = obj;
    while (current) {
      if (roots.includes(current)) return current;
      current = current.parent;
    }
    return null;
  }

  private getObjectId(obj: THREE.Object3D): string {
    const u = (obj as THREE.Object3D & { userData?: Record<string, unknown> }).userData;
    return (u?.displayName as string) ?? (u?.layoutId as string) ?? obj.name ?? 'object';
  }

  private static LAYOUT_STORAGE_KEY = 'sceneLayout';

  private getSavedLayout(): Record<string, { position: [number, number, number] }> {
    try {
      const raw = localStorage.getItem(Scene.LAYOUT_STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  setSelectedObjectPosition(x: number, y: number, z: number): void {
    if (!this.selectedObject) return;
    this.selectedObject.position.set(x, y, z);
    this.emitSelectionChange();
  }

  setSelectedObjectRotation(rx: number, ry: number, rz: number): void {
    if (!this.selectedObject) return;
    this.selectedObject.rotation.set(rx, ry, rz);
    this.emitSelectionChange();
  }

  setSelectedObjectScale(sx: number, sy: number, sz: number): void {
    if (!this.selectedObject) return;
    this.selectedObject.scale.set(sx, sy, sz);
    this.emitSelectionChange();
  }

  setCamera(params: CameraParams): void {
    const target = this.orbitControls.target;
    if (params.position) {
      this.camera.position.set(params.position[0], params.position[1], params.position[2]);
    }
    if (params.target) {
      target.set(params.target[0], params.target[1], params.target[2]);
    }
    if (params.projection === 'Orthographic') {
      if (!(this.camera instanceof THREE.OrthographicCamera)) {
        const aspect = this.canvas.clientWidth / this.canvas.clientHeight || 1;
        const dist = this.camera.position.distanceTo(target);
        const fovRad = ((this.camera instanceof THREE.PerspectiveCamera ? this.camera.fov : 50) * Math.PI) / 180;
        const halfH = Math.tan(fovRad / 2) * dist;
        const halfW = halfH * aspect;
        const near = this.camera.near;
        const far = this.camera.far;
        const ortho = new THREE.OrthographicCamera(-halfW, halfW, halfH, -halfH, near, far);
        ortho.position.copy(this.camera.position);
        ortho.quaternion.copy(this.camera.quaternion);
        (this.orbitControls as { object: THREE.Camera }).object = ortho;
        this.camera = ortho;
      }
    } else if (params.projection === 'Perspective') {
      if (!(this.camera instanceof THREE.PerspectiveCamera)) {
        const persp = new THREE.PerspectiveCamera(50, this.canvas.clientWidth / this.canvas.clientHeight || 1, this.camera.near, this.camera.far);
        persp.position.copy(this.camera.position);
        persp.quaternion.copy(this.camera.quaternion);
        (this.orbitControls as { object: THREE.Camera }).object = persp;
        this.camera = persp;
      }
    }
    const cam = this.camera;
    if (params.fov !== undefined && cam instanceof THREE.PerspectiveCamera) {
      cam.fov = params.fov;
      cam.updateProjectionMatrix();
    }
    if (params.near !== undefined) {
      cam.near = params.near;
      cam.updateProjectionMatrix();
    }
    if (params.far !== undefined) {
      cam.far = params.far;
      cam.updateProjectionMatrix();
    }
    if (this.pfOptions?.onCameraChange) {
      this.pfOptions.onCameraChange(this.getCameraInfo());
    }
  }

  private getCameraInfo(): CameraInfo {
    const pos = this.camera.position;
    const target = this.orbitControls.target;
    let projection: 'Perspective' | 'Orthographic' = 'Perspective';
    let fov = 50;
    if (this.camera instanceof THREE.PerspectiveCamera) {
      projection = 'Perspective';
      fov = this.camera.fov;
    } else {
      projection = 'Orthographic';
      const dist = this.camera.position.distanceTo(target);
      const halfH = (this.camera.top - this.camera.bottom) / 2;
      if (dist > 0) fov = (2 * Math.atan(halfH / dist) * 180) / Math.PI;
    }
    return {
      position: { x: pos.x, y: pos.y, z: pos.z },
      target: { x: target.x, y: target.y, z: target.z },
      projection,
      fov,
      near: this.camera.near,
      far: this.camera.far,
    };
  }

  private emitSelectionChange(): void {
    if (!this.selectedObject || !this.pfOptions) return;
    const r = this.selectedObject.rotation;
    const s = this.selectedObject.scale;
    this.pfOptions.onSelectionChange({
      id: this.getObjectId(this.selectedObject),
      x: this.selectedObject.position.x,
      y: this.selectedObject.position.y,
      z: this.selectedObject.position.z,
      rx: r.x,
      ry: r.y,
      rz: r.z,
      sx: s.x,
      sy: s.y,
      sz: s.z,
    });
  }

  private saveLayout(): void {
    if (!this.selectedObject || !this.pfOptions) return;
    const id = this.getObjectId(this.selectedObject);
    const layout = this.getSavedLayout();
    const p = this.selectedObject.position;
    layout[id] = { position: [p.x, p.y, p.z] };
    localStorage.setItem(Scene.LAYOUT_STORAGE_KEY, JSON.stringify(layout));
  }

  private createSelectionOverlay(root: THREE.Object3D): THREE.Group {
    const overlay = root.clone(true);
    overlay.position.set(0, 0, 0);
    overlay.quaternion.identity();
    overlay.scale.set(1, 1, 1);
    overlay.traverse((o) => {
      if (o instanceof THREE.Mesh && o.geometry) {
        o.material = new THREE.MeshBasicMaterial({
          color: 0xff8800,
          transparent: true,
          opacity: 0.4,
          depthWrite: false,
        });
      }
    });
    return overlay as THREE.Group;
  }

  private setSelection(root: THREE.Object3D | null): void {
    if (this.selectionOverlay && this.selectedObject) {
      this.selectedObject.remove(this.selectionOverlay);
      this.selectionOverlay.traverse((o) => {
        if (o instanceof THREE.Mesh && o.material) (o.material as THREE.Material).dispose();
      });
      this.selectionOverlay = null;
    }
    if (!root) {
      if (this.rotateMode) {
        this.attachRotationHelper(null);
        this.rotateMode = null;
        this.lastPointerRotate = null;
      }
      if (this.scaleMode) {
        this.scaleMode = false;
        this.scaleStartScale = null;
        this.scaleStartPointerDist = 0;
      }
    }
    this.selectedObject = root;
    if (root) {
      this.selectionOverlay = this.createSelectionOverlay(root);
      root.add(this.selectionOverlay);
    }
    this.pfOptions?.onSelectionChange(
      root
        ? {
            id: this.getObjectId(root),
            x: root.position.x,
            y: root.position.y,
            z: root.position.z,
            rx: root.rotation.x,
            ry: root.rotation.y,
            rz: root.rotation.z,
            sx: root.scale.x,
            sy: root.scale.y,
            sz: root.scale.z,
          }
        : null
    );
  }

  private updatePointerFromEvent(event: PointerEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  private onPointerMove(event: PointerEvent): void {
    if (this.disposed) return;
    this.updatePointerFromEvent(event);
    if (this.activeRoutingBugId) {
      this.mousePosition3D = this.getGroundIntersection();
    }
    if (this.rotateMode && this.selectedObject) {
      if (this.lastPointerRotate === null) {
        this.lastPointerRotate = this.pointer.clone();
      } else {
        const dx = this.pointer.x - this.lastPointerRotate.x;
        const dy = this.pointer.y - this.lastPointerRotate.y;
        const s = ROTATE_SENSITIVITY;
        const angle = (this.rotateMode === 'x' ? -dy : this.rotateMode === 'z' ? -dx : dx) * s;
        if (this.rotateMode === 'x') this.rotateAxis.set(1, 0, 0);
        else if (this.rotateMode === 'y') this.rotateAxis.set(0, 1, 0);
        else this.rotateAxis.set(0, 0, 1);
        this.rotateQuat.setFromAxisAngle(this.rotateAxis, angle);
        this.selectedObject.quaternion.premultiply(this.rotateQuat);
        this.lastPointerRotate.copy(this.pointer);
        this.emitSelectionChange();
      }
      return;
    }
    if (this.scaleMode && this.selectedObject && this.scaleStartScale) {
      this.selectedObject.getWorldPosition(this.tempVec3);
      this.tempVec3.project(this.camera);
      const dx = this.pointer.x - this.tempVec3.x;
      const dy = this.pointer.y - this.tempVec3.y;
      const currentDist = Math.max(Math.hypot(dx, dy), 0.01);
      const ratio = currentDist / this.scaleStartPointerDist;
      const s = this.scaleStartScale;
      this.selectedObject.scale.set(
        Math.max(s.x * ratio, SCALE_MIN),
        Math.max(s.y * ratio, SCALE_MIN),
        Math.max(s.z * ratio, SCALE_MIN)
      );
      this.emitSelectionChange();
      return;
    }
    if (this.dragMode && this.selectedObject) {
      this.raycaster.setFromCamera(this.pointer, this.camera);
      this.dragPlane.normal.copy(this.dragPlaneNormal);
      this.dragPlane.constant = -this.selectedObject.position.dot(this.dragPlane.normal);
      this.raycaster.ray.intersectPlane(this.dragPlane, this.dragIntersect);
      if (this.dragIntersect && this.dragStartObjectPosition) {
        if (this.dragStartIntersection === null) {
          this.dragStartIntersection = this.dragIntersect.clone();
        } else {
          const dx = this.dragIntersect.x - this.dragStartIntersection.x;
          const dy = this.dragIntersect.y - this.dragStartIntersection.y;
          const dz = this.dragIntersect.z - this.dragStartIntersection.z;
          if (this.dragMode === 'x') this.selectedObject.position.x = this.dragStartObjectPosition.x + dx;
          if (this.dragMode === 'y') this.selectedObject.position.y = this.dragStartObjectPosition.y + dy;
          if (this.dragMode === 'z') this.selectedObject.position.z = this.dragStartObjectPosition.z + dz;
        }
        if (this.selectedObject) this.emitSelectionChange();
      }
      return;
    }

    // Hover: show the first (closest) hit label only (rack or displayName from map objects).
    if (this.pfOptions?.onHoverInfoChange) {
      const roots: THREE.Object3D[] = [];
      if (this.shinyPathGroup) roots.push(this.shinyPathGroup);
      this.buggies.forEach((group) => roots.push(group));
      this.racks.forEach((group) => roots.push(group));
      if (roots.length === 0) {
        this.pfOptions.onHoverInfoChange(null);
      } else {
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const hits = this.raycaster.intersectObjects(roots, true);
        let label: string | null = null;
        if (hits.length > 0) {
          let obj: THREE.Object3D | null = hits[0].object;
          while (obj) {
            for (const [id, group] of this.racks) {
              if (group === obj) {
                label = id.startsWith('battery-rack-') ? id.slice('battery-rack-'.length) : id;
                break;
              }
            }
            if (label) break;
            for (const [bugId, group] of this.buggies) {
              if (group === obj) {
                const inv = this.getBugInventory(bugId);
                label = `${bugId}\n[${inv.drained}] drained batteries\n[${inv.charged}] full batteries`;
                break;
              }
            }
            if (label) break;
            const u = (obj as THREE.Object3D & { userData?: Record<string, unknown> }).userData;
            if (u && typeof u.displayName === 'string') {
              label = u.displayName as string;
              break;
            }
            obj = obj.parent;
          }
          if (!label) label = '(object)';
        }
        if (label) {
          this.pfOptions.onHoverInfoChange({
            label,
            screenX: event.clientX,
            screenY: event.clientY,
          });
        } else {
          this.pfOptions.onHoverInfoChange(null);
        }
      }
    }

    if (!this.tooltipEl || this.pfOptions?.getPFEnabled()) return;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObject(this.markerSphere, false);
    if (hits.length > 0) {
      const p = this.markerSphere.position;
      this.tooltipEl.textContent = `(${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)})`;
      this.tooltipEl.style.display = 'block';
      this.tooltipEl.style.left = `${event.clientX + 12}px`;
      this.tooltipEl.style.top = `${event.clientY + 12}px`;
    } else {
      this.tooltipEl.style.display = 'none';
    }
  }

  private loadAxisHelper(): void {
    if (!this.axisHelperUrl || this.disposed) return;
    const loader = new GLTFLoader();
    loader.load(
      this.axisHelperUrl,
      (gltf) => {
        if (this.disposed) {
          gltf.scene.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
              obj.geometry?.dispose();
              if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
              else obj.material?.dispose();
            }
          });
          return;
        }
        this.axisHelperGroup = gltf.scene;
        this.axisHelperGroup.userData.layoutId = 'AxisHelper_01';
        const layout = this.getSavedLayout();
        const layoutAxis = layout['AxisHelper_01'];
        this.axisHelperGroup.position.set(
          layoutAxis?.position[0] ?? 0,
          layoutAxis?.position[1] ?? 0,
          layoutAxis?.position[2] ?? 0
        );
        this.axisHelperGroup.scale.set(3, 3, 3);
        this.axisHelperGroup.renderOrder = 1;
        this.axisHelperGroup.traverse((o) => {
          const obj = o as THREE.Object3D & { material?: THREE.Material | THREE.Material[] };
          if (obj.material) {
            obj.renderOrder = 1;
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            mats.forEach((m) => {
              m.depthTest = false;
              m.depthWrite = false;
            });
          }
        });
        this.scene.add(this.axisHelperGroup);
      },
      undefined,
      (err) => {
        const msg = err?.message ?? String(err);
        if (msg.includes("<!DOCTYPE") || msg.includes("not valid JSON")) {
          console.error(
            'AxisHelper.glb not found: the server returned HTML instead of the model. ' +
              'Add your Blender export to frontend/public/models/AxisHelper.glb'
          );
        } else {
          console.error('Failed to load AxisHelper.glb:', err);
        }
      }
    );
  }

  private loadReferenceVehicle(): void {
    if (!this.referenceVehicleUrl || this.disposed) return;
    const loader = new GLTFLoader();
    loader.load(
      this.referenceVehicleUrl,
      (gltf) => {
        if (this.disposed) {
          gltf.scene.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
              obj.geometry?.dispose();
              if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
              else obj.material?.dispose();
            }
          });
          return;
        }
        this.referenceVehicleGroup = gltf.scene;
        this.referenceVehicleGroup.userData.layoutId = 'ReferenceVehicle_01';
        const layout = this.getSavedLayout();
        const layoutVeh = layout['ReferenceVehicle_01'];
        this.referenceVehicleGroup.position.set(
          layoutVeh?.position[0] ?? 0,
          layoutVeh?.position[1] ?? 0,
          layoutVeh?.position[2] ?? 0
        );
        this.referenceVehicleGroup.visible = false;
        this.scene.add(this.referenceVehicleGroup);
      },
      undefined,
      (err) => {
        const msg = err?.message ?? String(err);
        if (msg.includes('<!DOCTYPE') || msg.includes('not valid JSON')) {
          console.error(
            'ReferenceVehicle_01.glb not found: server returned HTML. ' +
              'Add frontend/public/models/ReferenceVehicle_01.glb'
          );
        } else {
          console.error('Failed to load ReferenceVehicle_01.glb:', err);
        }
      }
    );
  }

  private loadShinyPath(): void {
    if (this.disposed) return;
    const loader = new GLTFLoader();
    loader.load(
      '/models/ShinyPath_04.glb',
      (gltf) => {
        if (this.disposed) {
          gltf.scene.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
              obj.geometry?.dispose();
              if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
              else obj.material?.dispose();
            }
          });
          return;
        }
        this.shinyPathGroup = gltf.scene;
        this.shinyPathGroup.position.set(0, 0, 0);
        this.scene.add(this.shinyPathGroup);
        // Cache the RimWall object for route segment collision detection.
        // Tunnels are holes (absent geometry) so segments through them never hit.
        this.shinyPathGroup.traverse((obj) => {
          if (obj.userData.displayName === 'RimWall' || obj.name === 'RingWall') {
            this.rimWallMesh = obj;
          }
        });
        this.buggies.forEach((buggy, id) => {
          const padName = (id === 'bug1' ? 'VehicleBayPad1' : id === 'bug2' ? 'VehicleBayPad2' : id === 'bug3' ? 'VehicleBayPad3' : 'VehicleBayPad4');
          this.positionBuggyOnPad(padName, buggy);
        });
        // Compute map extents and adjust initial camera distance and clamp.
        const box = new THREE.Box3().setFromObject(this.shinyPathGroup);
        const center = box.getCenter(new THREE.Vector3());
        const halfX = (box.max.x - box.min.x) / 2;
        const halfZ = (box.max.z - box.min.z) / 2;
        this.mapHalfExtent = Math.max(halfX, halfZ);
        this.orbitControls.target.set(center.x, 0, center.z);
        if (this.camera instanceof THREE.PerspectiveCamera) {
          const fovRad = (this.camera.fov * Math.PI) / 180;
          const dist = this.mapHalfExtent / Math.tan(fovRad / 2);
          this.camera.position.set(center.x, dist, center.z);
          this.initialCameraDistance = dist;
          if (this.pfOptions?.onCameraChange) {
            this.pfOptions.onCameraChange(this.getCameraInfo());
          }
        }
      },
      undefined,
      (err) => {
        const msg = (err as Error)?.message ?? String(err);
        if (msg.includes('<!DOCTYPE') || msg.includes('not valid JSON')) {
          console.error(
            'ShinyPath_04.glb not found: server returned HTML. Add frontend/public/models/ShinyPath_04.glb'
          );
        } else {
          console.error('Failed to load ShinyPath_04.glb:', err);
        }
      }
    );
  }

  private getBugLength(bug: THREE.Group): number {
    const box = new THREE.Box3().setFromObject(bug);
    const size = box.getSize(this.tempVec3);
    return Math.max(size.x, size.z);
  }

  private createSelectionCircle(radius: number): THREE.Group {
    const group = new THREE.Group();
    const ring = new THREE.RingGeometry(radius - 0.03, radius + 0.03, 32);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      depthTest: false,
    });
    const mesh = new THREE.Mesh(ring, mat);
    mesh.rotation.x = -Math.PI / 2;
    group.add(mesh);
    return group;
  }

  private createWaypointMarker(bugId: string): THREE.Group {
    const group = new THREE.Group();
    const bug = this.buggies.get(bugId);
    const radius = bug ? this.getBugLength(bug) : 1;
    const ring = new THREE.RingGeometry(radius - 0.03, radius + 0.03, 32);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      depthTest: false,
    });
    const mesh = new THREE.Mesh(ring, mat);
    mesh.rotation.x = -Math.PI / 2;
    group.add(mesh);
    const sphereGeom = new THREE.SphereGeometry(0.08, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(sphereGeom, sphereMat);
    sphere.position.y = 0.01;
    group.add(sphere);
    return group;
  }

  private getGroundIntersection(): THREE.Vector3 | null {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const ray = this.raycaster.ray;
    const target = new THREE.Vector3();
    if (ray.intersectPlane(this.groundPlane, target)) return target;
    return null;
  }

  /**
   * Returns true if the line segment from `from` to `to` intersects any solid
   * part of the RimWall mesh. Tunnel openings are absent geometry, so segments
   * passing through tunnels return false (no hit).
   */
  private segmentCrossesRimWall(from: THREE.Vector3, to: THREE.Vector3): boolean {
    if (!this.rimWallMesh) return false;
    const dir = new THREE.Vector3().subVectors(to, from);
    const length = dir.length();
    if (length < 0.001) return false;
    dir.normalize();
    this.segRaycaster.set(from, dir);
    this.segRaycaster.near = 0;
    this.segRaycaster.far = length;
    return this.segRaycaster.intersectObject(this.rimWallMesh, true).length > 0;
  }

  private addWaypoint(position: THREE.Vector3, terminal: boolean): void {
    const bugId = this.activeRoutingBugId;
    if (!bugId) return;
    const state = this.bugRouteStates.get(bugId);
    if (!state) return;

    // Determine the start of this new segment (bug position if first waypoint, else last waypoint).
    let segFrom: THREE.Vector3;
    if (state.waypoints.length > 0) {
      segFrom = state.waypoints[state.waypoints.length - 1];
    } else {
      const bug = this.buggies.get(bugId);
      if (!bug) return;
      segFrom = new THREE.Vector3();
      bug.getWorldPosition(segFrom);
    }

    // Reject the segment if it passes through solid RimWall (tunnels are gaps — no geometry hit).
    if (this.segmentCrossesRimWall(segFrom, position)) {
      this.clearBugWaypointState(bugId);
      this.pfOptions?.onRimWallBlock?.();
      return;
    }

    state.waypoints.push(position.clone());
    if (terminal) {
      state.waypointTerminalPlaced = true;
      if (state.selectionCircle?.parent) state.selectionCircle.parent.remove(state.selectionCircle);
      state.selectionCircle = null;
      this.setActiveRoutingBugId(null);
    }
    if (!state.waypointMarkersGroup) {
      state.waypointMarkersGroup = new THREE.Group();
      this.scene.add(state.waypointMarkersGroup);
    }
    const marker = this.createWaypointMarker(bugId);
    marker.position.copy(position);
    state.waypointMarkersGroup.add(marker);
    state.waypointMarkerObjects.push(marker);
  }

  private updateConnectingLine(): void {
    if (!this.connectingLine) return;
    let bugId = this.activeRoutingBugId;
    if (!bugId) {
      // No active bug; show path for any bug that has waypoints (e.g. just dropped a terminal)
      for (const [id, state] of this.bugRouteStates) {
        if (state.waypoints.length > 0) {
          bugId = id;
          break;
        }
      }
    }
    if (!bugId) {
      this.connectingLine.visible = false;
      return;
    }
    const state = this.bugRouteStates.get(bugId);
    const bug = this.buggies.get(bugId);
    if (!state || !bug) {
      this.connectingLine.visible = false;
      return;
    }
    this.waypointLinePoints.length = 0;
    bug.getWorldPosition(this.tempVec3);
    this.waypointLinePoints.push(this.tempVec3.clone());
    for (let i = state.waypointCurrentIndex; i < state.waypoints.length; i++) {
      this.waypointLinePoints.push(state.waypoints[i].clone());
    }
    if (!state.waypointTerminalPlaced && this.mousePosition3D) {
      this.waypointLinePoints.push(this.mousePosition3D.clone());
    }
    if (this.waypointLinePoints.length < 2) {
      this.connectingLine.visible = false;
      return;
    }
    this.connectingLine.geometry.setFromPoints(this.waypointLinePoints);
    this.connectingLine.visible = true;
  }

  private removeWaypointAndMarkerAtIndex(bugId: string, index: number): void {
    const state = this.bugRouteStates.get(bugId);
    if (!state || index < 0 || index >= state.waypoints.length || index >= state.waypointMarkerObjects.length) return;
    const marker = state.waypointMarkerObjects[index];
    if (state.waypointMarkersGroup) state.waypointMarkersGroup.remove(marker);
    marker.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose();
        (obj.material as THREE.Material)?.dispose();
      }
    });
    state.waypointMarkerObjects.splice(index, 1);
    state.waypoints.splice(index, 1);
  }

  private updateBugAlongPath(dt: number): void {
    const toRemove: string[] = [];
    this.bugRouteStates.forEach((state, bugId) => {
      if (state.waypoints.length === 0) {
        if (state.waypointTerminalPlaced) toRemove.push(bugId);
        return;
      }
      const bug = this.buggies.get(bugId);
      if (!bug) return;
      if (state.waypointCurrentIndex >= state.waypoints.length) {
        if (state.waypointTerminalPlaced) toRemove.push(bugId);
        return;
      }
      const target = state.waypoints[state.waypointCurrentIndex];
      bug.getWorldPosition(this.tempVec3);
      const dx = target.x - this.tempVec3.x;
      const dz = target.z - this.tempVec3.z;
      const dist = Math.sqrt(dx * dx + dz * dz) || 0.0001;
      if (dist < BUG_WAYPOINT_ARRIVAL) {
        this.removeWaypointAndMarkerAtIndex(bugId, state.waypointCurrentIndex);
        if (state.waypoints.length === 0 && state.waypointTerminalPlaced) toRemove.push(bugId);
        return;
      }
      const move = Math.min(BUG_WAYPOINT_SPEED * dt, dist);
      const t = move / dist;
      bug.position.x += dx * t;
      bug.position.z += dz * t;
      const angle = Math.atan2(dx, dz) + BUG_FORWARD_Y_OFFSET;
      bug.rotation.y = angle;
    });
    for (const bugId of toRemove) this.clearBugWaypointState(bugId);
  }

  private clearBugWaypointState(bugId: string): void {
    const state = this.bugRouteStates.get(bugId);
    if (!state) return;
    if (state.selectionCircle?.parent) state.selectionCircle.parent.remove(state.selectionCircle);
    if (state.waypointMarkersGroup) {
      state.waypointMarkersGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          (obj.material as THREE.Material)?.dispose();
        }
      });
      this.scene.remove(state.waypointMarkersGroup);
    }
    this.bugRouteStates.delete(bugId);
    this.lastFrameNearPadsByBug.delete(bugId);
    if (this.activeRoutingBugId === bugId) {
      this.setActiveRoutingBugId(null);
      if (this.connectingLine) {
        this.scene.remove(this.connectingLine);
        this.connectingLine.geometry.dispose();
        (this.connectingLine.material as THREE.Material).dispose();
        this.connectingLine = null;
      }
    }
  }

  private clearWaypointState(): void {
    this.mousePosition3D = null;
    const bugIds = Array.from(this.bugRouteStates.keys());
    for (const bugId of bugIds) this.clearBugWaypointState(bugId);
    if (this.connectingLine) {
      this.scene.remove(this.connectingLine);
      this.connectingLine.geometry.dispose();
      (this.connectingLine.material as THREE.Material).dispose();
      this.connectingLine = null;
    }
    this.setActiveRoutingBugId(null);
  }

  private selectBugForWaypoints(bugId: string): void {
    const bug = this.buggies.get(bugId);
    if (!bug) return;
    let state = this.bugRouteStates.get(bugId);
    if (!state) {
      state = {
        waypoints: [],
        waypointTerminalPlaced: false,
        waypointCurrentIndex: 0,
        selectionCircle: null,
        waypointMarkersGroup: null,
        waypointMarkerObjects: [],
      };
      this.bugRouteStates.set(bugId, state);
    }
    this.setActiveRoutingBugId(bugId);
    const radius = this.getBugLength(bug);
    if (!state.selectionCircle) {
      state.selectionCircle = this.createSelectionCircle(radius);
      this.scene.add(state.selectionCircle);
    }
    bug.getWorldPosition(this.tempVec3);
    state.selectionCircle.position.set(this.tempVec3.x, GROUND_PLANE_Y, this.tempVec3.z);
    if (!state.waypointMarkersGroup) {
      state.waypointMarkersGroup = new THREE.Group();
      this.scene.add(state.waypointMarkersGroup);
    }
    if (!this.connectingLine) {
      const lineGeom = new THREE.BufferGeometry();
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.6,
        depthTest: false,
      });
      this.connectingLine = new THREE.Line(lineGeom, lineMat);
      this.scene.add(this.connectingLine);
    }
  }

  private getPadRoot(obj: THREE.Object3D): THREE.Object3D | null {
    let current: THREE.Object3D | null = obj;
    while (current) {
      const name = (current as THREE.Object3D & { userData?: { displayName?: string } }).userData?.displayName ?? current.name ?? '';
      if (typeof name === 'string' && name.includes('Pad')) return current;
      current = current.parent;
    }
    return null;
  }

  private hitIsPad(obj: THREE.Object3D): boolean {
    return this.getPadRoot(obj) !== null;
  }

  private getPadCenter(obj: THREE.Object3D): THREE.Vector3 {
    const pad = this.getPadRoot(obj);
    const root = pad ?? obj;
    const box = new THREE.Box3().setFromObject(root);
    return box.getCenter(new THREE.Vector3());
  }

  /** Treat as drained when charge is 0 or very low (simulation can leave fractional values). */
  private static readonly DRAINED_THRESHOLD = 1;

  private rackBatteryKey(rackId: string): string {
    return rackId.startsWith('battery-rack-') ? rackId : `battery-rack-${rackId}`;
  }

  private getRackState(rackId: string): { charged: number; drained: number; empty: number } {
    let charged = 0,
      drained = 0,
      empty = 0;
    const key = this.rackBatteryKey(rackId);
    for (let i = 1; i <= 4; i++) {
      const bat = this.batteries.get(`${key}-battery-${i}`);
      if (!bat) continue;
      if (bat.charge < 0) empty++;
      else if (bat.charge >= 100) charged++;
      else if (bat.charge < Scene.DRAINED_THRESHOLD) drained++;
    }
    return { charged, drained, empty };
  }

  private getFacilityState(facilityId: string): { charged: number; drained: number; empty: number } {
    let charged = 0,
      drained = 0,
      empty = 0;
    const rackIds = FACILITY_PADS[facilityId];
    if (!rackIds) return { charged, drained, empty };
    for (const rId of rackIds) {
      const s = this.getRackState(rId);
      charged += s.charged;
      drained += s.drained;
      empty += s.empty;
    }
    return { charged, drained, empty };
  }

  private getBugInventory(bugId: string): { charged: number; drained: number } {
    if (!this.bugInventory.has(bugId)) this.bugInventory.set(bugId, { charged: 0, drained: 0 });
    return this.bugInventory.get(bugId)!;
  }

  private dockAtPad(
    rackId: string,
    bugId: string,
    loadCharged: number,
    acceptDrained: number,
    loadYes: boolean,
    acceptYes: boolean
  ): void {
    const inv = this.getBugInventory(bugId);
    const isChargingStation = rackId.startsWith('ChargingStation');
    const key = this.rackBatteryKey(rackId);
    if (isChargingStation) {
      // CS: question2 = "Transfer n full from station to bug?" (acceptYes). Do first to free slots.
      if (acceptYes && loadCharged > 0) {
        let taken = 0;
        for (let i = 1; i <= 4 && taken < loadCharged; i++) {
          const id = `${key}-battery-${i}`;
          const bat = this.batteries.get(id);
          if (bat && bat.charge >= 100) {
            this.setBatteryCharge(id, BATTERY_EMPTY);
            taken++;
            inv.charged++;
          }
        }
      }
      // CS: question1 = "Transfer m drained from bug to station?" (loadYes). Into empty slots.
      if (loadYes && acceptDrained > 0) {
        let placed = 0;
        for (let i = 1; i <= 4 && placed < acceptDrained; i++) {
          const id = `${key}-battery-${i}`;
          const bat = this.batteries.get(id);
          if (bat && bat.charge < 0) {
            this.setBatteryCharge(id, 0);
            this.batteriesAllowedToCharge.add(id);
            placed++;
            inv.drained--;
          }
        }
      }
    } else {
      // Facility: question1 = "Transfer n drained from rack to bug?" (loadYes). Take from all racks in this facility.
      if (loadYes && acceptDrained > 0) {
        const facilityId = this.getFacilityForRack(rackId);
        const rackIds = facilityId ? (FACILITY_PADS[facilityId] ?? [rackId]) : [rackId];
        let taken = 0;
        for (const rId of rackIds) {
          if (taken >= acceptDrained) break;
          const rKey = this.rackBatteryKey(rId);
          for (let i = 1; i <= 4 && taken < acceptDrained; i++) {
            const id = `${rKey}-battery-${i}`;
            const bat = this.batteries.get(id);
            if (bat && bat.charge >= 0 && bat.charge < Scene.DRAINED_THRESHOLD) {
              bat.charge = BATTERY_EMPTY;
              this.emptyBatteryIds.add(id);
              this.updateBatteryColors(id, BATTERY_EMPTY);
              taken++;
              inv.drained++;
            }
          }
        }
      }
      // Facility: question2 = "Transfer m full from bug to rack?" (acceptYes). Into empty slots.
      if (acceptYes && loadCharged > 0) {
        let placed = 0;
        for (let i = 1; i <= 4 && placed < loadCharged; i++) {
          const id = `${key}-battery-${i}`;
          const bat = this.batteries.get(id);
          if (bat && bat.charge < 0) {
            this.emptyBatteryIds.delete(id);
            this.userFilledBatteryIds.add(id);
            this.setBatteryCharge(id, 100);
            placed++;
            inv.charged--;
          }
        }
      }
    }
  }

  private isBatteryUserFilled(id: string): boolean {
    return this.userFilledBatteryIds.has(id);
  }

  private getFacilityForRack(rackId: string): string | undefined {
    const base = rackId.startsWith('battery-rack-') ? rackId.slice('battery-rack-'.length) : rackId;
    for (const [facilityId, rackIds] of Object.entries(FACILITY_PADS)) {
      if (rackIds.includes(base) || rackIds.includes(rackId)) return facilityId;
    }
    return undefined;
  }

  private checkDockAtPad(): void {
    this.bugRouteStates.forEach((routeState, bugId) => {
      // Only transfer at a terminal waypoint (the final destination), not while passing through.
      if (!routeState.waypointTerminalPlaced || routeState.waypoints.length !== 1) return;

      const bug = this.buggies.get(bugId);
      if (!bug) return;
      bug.getWorldPosition(this.tempVec3);
      const bx = this.tempVec3.x;
      const bz = this.tempVec3.z;
      const currentNear = new Set<string>();
      for (const pad of PAD_CONFIG) {
        const [px, , pz] = pad.position;
        const dist = Math.sqrt((bx - px) ** 2 + (bz - pz) ** 2);
        if (dist <= DOCK_THRESHOLD) currentNear.add(pad.id);
      }
      const lastNear = this.lastFrameNearPadsByBug.get(bugId) ?? new Set<string>();
      for (const rackId of currentNear) {
        if (lastNear.has(rackId)) continue;
        const inv = this.getBugInventory(bugId);
        const total = inv.charged + inv.drained;
        const isCS = rackId.startsWith('ChargingStation');
        const room = BUG_MAX_BATTERIES - total;
        const facilityId = this.getFacilityForRack(rackId);
        const state = isCS ? this.getRackState(rackId) : (facilityId ? this.getFacilityState(facilityId) : this.getRackState(rackId));
        let loadCharged: number;
        let acceptDrained: number;
        if (isCS) {
          const nFullToBug = Math.min(state.charged, room);
          const mDrainedToStation = Math.min(inv.drained, state.empty + nFullToBug);
          loadCharged = nFullToBug;
          acceptDrained = mDrainedToStation;
        } else {
          const nDrainedToBug = Math.min(state.drained, room);
          const mFullToRack = Math.min(inv.charged, state.empty + nDrainedToBug);
          loadCharged = mFullToRack;
          acceptDrained = nDrainedToBug;
        }
        // Auto-answer yes to both transfer questions.
        this.dockAtPad(rackId, bugId, loadCharged, acceptDrained, true, true);
        this.lastFrameNearPadsByBug.set(bugId, new Set(currentNear));
        return;
      }
      this.lastFrameNearPadsByBug.set(bugId, currentNear);
    });
  }

  private updateBatteryCharging(dt: number): void {
    const rate = (100 / BATTERY_CHARGE_TIME) * dt;
    this.batteries.forEach((bat, id) => {
      if (bat.charge < 0 || bat.charge >= 100) return;
      if (!this.batteriesAllowedToCharge.has(id)) return;
      bat.charge = Math.min(100, bat.charge + rate);
      this.updateBatteryColors(id, bat.charge);
    });
  }

  /** Find pad by name or displayName in ShinyPath and set buggy position to its world position (y + 0.1). */
  private positionBuggyOnPad(padName: string, buggy: THREE.Group): void {
    if (!this.shinyPathGroup) return;
    let pad: THREE.Object3D | null = null;
    this.shinyPathGroup.traverse((obj) => {
      if (pad) return;
      const name = (obj as THREE.Object3D & { userData?: { displayName?: string } }).userData?.displayName ?? obj.name;
      if (name === padName) pad = obj;
    });
    if (!pad) {
      buggy.position.set(0, 0.1, 0);
      return;
    }
    const box = new THREE.Box3().setFromObject(pad);
    const center = box.getCenter(this.tempVec3);
    buggy.position.set(center.x, center.y + 0.1, center.z);
  }

  private loadBuggy(): void {
    if (this.disposed) return;
    const loader = new GLTFLoader();
    loader.load(
      '/models/LoadedBuggy_04.glb',
      (gltf) => {
        if (this.disposed) {
          gltf.scene.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
              obj.geometry?.dispose();
              if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
              else obj.material?.dispose();
            }
          });
          return;
        }
        const BUGGY_PADS = ['VehicleBayPad1', 'VehicleBayPad2', 'VehicleBayPad3', 'VehicleBayPad4'] as const;
        const buggyIds = ['bug1', 'bug2', 'bug3', 'bug4'] as const;
        const buggyRotations = [Math.PI / 2, Math.PI / 2, 0, 0];
        for (let i = 0; i < 4; i++) {
          const group = i === 0 ? gltf.scene : gltf.scene.clone(true);
          group.name = buggyIds[i];
          group.userData.displayName = buggyIds[i];
          group.scale.setScalar(2);
          group.rotation.y = buggyRotations[i];
          this.positionBuggyOnPad(BUGGY_PADS[i], group);
          this.scene.add(group);
          this.buggies.set(buggyIds[i], group);
          this.bugStartPads.set(buggyIds[i], { padName: BUGGY_PADS[i], rotation: buggyRotations[i] });
        }
      },
      undefined,
      (err) => {
        const msg = (err as Error)?.message ?? String(err);
        if (msg.includes('<!DOCTYPE') || msg.includes('not valid JSON')) {
          console.error(
            'LoadedBuggy_04.glb not found: server returned HTML. Add frontend/public/models/LoadedBuggy_04.glb'
          );
        } else {
          console.error('Failed to load LoadedBuggy_04.glb:', err);
        }
      }
    );
  }

  private onPointerDown(event: PointerEvent): void {
    this.updatePointerFromEvent(event);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    if (this.disposed) return;

    const buggyRoots = Array.from(this.buggies.values());
    const bugHits = buggyRoots.length > 0 ? this.raycaster.intersectObjects(buggyRoots, true) : [];
    const bugHit = bugHits.length > 0 ? bugHits[0] : null;
    const bugRoot = bugHit ? this.findRootForObject(bugHit.object) : null;
    let bugIdFromRoot: string | null = null;
    if (bugRoot) {
      for (const [id, group] of this.buggies) {
        if (group === bugRoot) {
          bugIdFromRoot = id;
          break;
        }
      }
    }

    if (event.button === 2) {
      if (this.activeRoutingBugId) {
        const pos = this.getGroundIntersection();
        if (pos) this.addWaypoint(pos, true);
        event.preventDefault();
      } else if (bugIdFromRoot) {
        this.selectBugForWaypoints(bugIdFromRoot);
        event.preventDefault();
      }
      return;
    }

    if (event.button === 0) {
      if (bugIdFromRoot) {
        this.selectBugForWaypoints(bugIdFromRoot);
        return;
      }
      if (this.activeRoutingBugId) {
        let padHit: THREE.Intersection | null = null;
        if (this.shinyPathGroup) {
          const mapHits = this.raycaster.intersectObject(this.shinyPathGroup, true);
          if (mapHits.length > 0 && this.hitIsPad(mapHits[0].object)) padHit = mapHits[0];
        }
        if (padHit) {
          const center = this.getPadCenter(padHit.object);
          center.y = GROUND_PLANE_Y;
          this.addWaypoint(center, true);
        } else {
          const pos = this.getGroundIntersection();
          if (pos) this.addWaypoint(pos, false);
        }
        return;
      }
    }

    if (this.pfOptions?.getPFEnabled()) {
      const roots = this.getSelectableRoots();
      const hits = this.raycaster.intersectObjects(roots, true);
      const hit = hits.length > 0 ? hits[0] : null;
      const root = hit ? this.findRootForObject(hit.object) : null;
      if (hits.length > 0 && root) {
        if (root === this.selectedObject) {
          this.pointerDownOnSelected = true;
          this.canvas.setPointerCapture?.(event.pointerId);
        } else if (this.selectedObject !== null) {
          this.setSelection(null);
          this.pointerDownOnSelected = false;
        } else {
          this.setSelection(root);
          this.pointerDownOnSelected = true;
          this.canvas.setPointerCapture?.(event.pointerId);
        }
      } else {
        this.setSelection(null);
        this.pointerDownOnSelected = false;
      }
      return;
    }
    if (event.button !== 0) return;
    const hits = this.raycaster.intersectObject(this.cubeMesh, false);
    if (hits.length === 0) return;
    const currentName = CUBE_COLORS[this.colorIndex].name;
    this.colorIndex = (this.colorIndex + 1) % CUBE_COLORS.length;
    const nextName = CUBE_COLORS[this.colorIndex].name;
    const nextHex = CUBE_COLORS[this.colorIndex].hex;
    const mat = this.cubeMesh.material as THREE.MeshStandardMaterial;
    mat.color.setHex(nextHex);
    this.onColorChange?.(currentName, nextName);
  }

  private onPointerUp = (event: PointerEvent): void => {
    if (event.button !== 0) return;
    this.pointerDownOnSelected = false;
    this.gKeyPending = false;
    if (this.dragMode) {
      this.removeDragAxisLine();
      this.dragMode = null;
      this.dragStartObjectPosition = null;
      this.dragStartIntersection = null;
      if (this.selectedObject) this.emitSelectionChange();
    }
    if (this.rotateMode) {
      this.attachRotationHelper(null);
      this.rotateMode = null;
      this.lastPointerRotate = null;
    }
    if (this.scaleMode) {
      this.scaleMode = false;
      this.scaleStartScale = null;
      this.scaleStartPointerDist = 0;
    }
    this.rKeyPending = false;
    this.canvas.releasePointerCapture?.(event.pointerId);
  };

  private createDragAxisLine(axis: 'x' | 'y' | 'z'): void {
    this.removeDragAxisLine();
    const e = DRAG_AXIS_LINE_EXTENT;
    const points = new Float32Array(6);
    if (axis === 'x') {
      points[0] = -e; points[1] = 0; points[2] = 0;
      points[3] = e; points[4] = 0; points[5] = 0;
    } else if (axis === 'y') {
      points[0] = 0; points[1] = -e; points[2] = 0;
      points[3] = 0; points[4] = e; points[5] = 0;
    } else {
      points[0] = 0; points[1] = 0; points[2] = -e;
      points[3] = 0; points[4] = 0; points[5] = e;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(points, 3));
    geometry.computeBoundingSphere();
    const color = axis === 'x' ? 0xff0000 : axis === 'y' ? 0x00ff00 : 0x0000ff;
    const material = new THREE.LineBasicMaterial({
      color,
      depthTest: false,
      depthWrite: false,
    });
    this.dragAxisLine = new THREE.Line(geometry, material);
    this.dragAxisLine.renderOrder = 2;
    this.scene.add(this.dragAxisLine);
  }

  private removeDragAxisLine(): void {
    if (this.dragAxisLine) {
      this.scene.remove(this.dragAxisLine);
      this.dragAxisLine.geometry.dispose();
      (this.dragAxisLine.material as THREE.Material).dispose();
      this.dragAxisLine = null;
    }
  }

  private attachRotationHelper(axis: 'x' | 'y' | 'z' | null): void {
    if (!this.rotationHelperGroup) return;
    if (this.rotationHelperGroup.parent) this.rotationHelperGroup.parent.remove(this.rotationHelperGroup);
    if (axis === null) {
      this.scene.add(this.rotationHelperGroup);
      this.rotationHelperGroup.visible = false;
      this.rotationHelperGroup.position.set(0, 0, 0);
      this.rotationHelperGroup.rotation.set(
        ROTATION_HELPER_REST_EULER.x,
        ROTATION_HELPER_REST_EULER.y,
        ROTATION_HELPER_REST_EULER.z
      );
      this.rotationHelperGroup.scale.set(1, 1, 1);
      return;
    }
    if (!this.selectedObject) return;
    this.scene.add(this.rotationHelperGroup);
    this.selectedObject.getWorldPosition(this.tempVec3);
    this.rotationHelperGroup.position.copy(this.tempVec3);
    // Same orientation for all axes: z at camera, x right, y up (matches X rotation start)
    const helperY180 = Math.PI;
    this.rotationHelperGroup.rotation.set(0, helperY180, 0);
    this.rotationHelperGroup.scale.set(1, 1, 1);
    this.rotationHelperGroup.visible = true;
  }

  private loadRotationHelper(): void {
    if (this.disposed) return;
    const loader = new GLTFLoader();
    loader.load(
      '/models/RotationHelper_01.glb',
      (gltf) => {
        if (this.disposed) {
          gltf.scene.traverse((obj) => {
            if (obj instanceof THREE.Mesh) {
              obj.geometry?.dispose();
              if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
              else obj.material?.dispose();
            }
          });
          return;
        }
        this.rotationHelperGroup = gltf.scene;
        this.rotationHelperGroup.visible = false;
        this.rotationHelperGroup.position.set(0, 0, 0);
        this.rotationHelperGroup.rotation.set(
          ROTATION_HELPER_REST_EULER.x,
          ROTATION_HELPER_REST_EULER.y,
          ROTATION_HELPER_REST_EULER.z
        );
        this.scene.add(this.rotationHelperGroup);
      },
      undefined,
      (err) => {
        const msg = (err as Error)?.message ?? String(err);
        if (msg.includes('<!DOCTYPE') || msg.includes('not valid JSON')) {
          console.error(
            'RotationHelper_01.glb not found: server returned HTML. Add frontend/public/models/RotationHelper_01.glb'
          );
        } else {
          console.error('Failed to load RotationHelper_01.glb:', err);
        }
      }
    );
  }

  start(): void {
    this.resizeDispose = setupResize(
      this.canvas,
      this.renderer,
      () => this.camera
    );
    this.tooltipEl = document.createElement('div');
    this.tooltipEl.style.cssText =
      'position:fixed;pointer-events:none;display:none;background:rgba(0,0,0,0.85);color:#fff;padding:6px 10px;border-radius:6px;font:12px/1.4 monospace;z-index:9999;';
    document.body.appendChild(this.tooltipEl);
    this.canvas.addEventListener('pointerdown', this.boundOnPointerDown);
    this.canvas.addEventListener('pointermove', this.boundOnPointerMove);
    this.canvas.addEventListener('pointerup', this.boundOnPointerUp);
    this.canvas.addEventListener('pointercancel', this.boundOnPointerUp);
    this.canvas.addEventListener('contextmenu', this.boundOnContextMenu);
    window.addEventListener('keydown', this.boundOnKeyDown);
    window.addEventListener('keyup', this.boundOnKeyUp);
    if (this.pfOptions?.setPositionRef) {
      this.pfOptions.setPositionRef.current = this.setSelectedObjectPosition.bind(this);
    }
    if (this.pfOptions?.setRotationRef) {
      this.pfOptions.setRotationRef.current = this.setSelectedObjectRotation.bind(this);
    }
    if (this.pfOptions?.setScaleRef) {
      this.pfOptions.setScaleRef.current = this.setSelectedObjectScale.bind(this);
    }
    if (this.pfOptions?.setCameraRef) {
      this.pfOptions.setCameraRef.current = this.setCamera.bind(this);
    }
    if (this.pfOptions?.onCameraChange) {
      this.orbitControls.addEventListener('change', this.boundOnOrbitChange);
      this.pfOptions.onCameraChange(this.getCameraInfo());
    }
    if (this.pfOptions?.batteryApiRef) {
      this.pfOptions.batteryApiRef.current = {
        createBattery: this.createBattery.bind(this),
        setBatteryCharge: this.setBatteryCharge.bind(this),
        getBatteryCharge: this.getBatteryCharge.bind(this),
        isBatteryUserFilled: this.isBatteryUserFilled.bind(this),
        removeBattery: this.removeBattery.bind(this),
        createBatteryRack: this.createBatteryRack.bind(this),
        removeBatteryRack: this.removeBatteryRack.bind(this),
        setFacilityFailed: this.setFacilityFailed.bind(this),
        resetSimulation: this.resetSimulation.bind(this),
        refreshBatteryMaterials: this.refreshBatteryMaterials.bind(this),
        getRackState: this.getRackState.bind(this),
        getBugInventory: this.getBugInventory.bind(this),
        dockAtPad: this.dockAtPad.bind(this),
      };
    }
    this.loadAxisHelper();
    this.loadReferenceVehicle();
    this.loadRotationHelper();
    this.loadShinyPath();
    this.loadBuggy();
    const loop = () => {
      if (this.disposed) return;
      this.rafId = requestAnimationFrame(loop);
      const dt = this.clock.getDelta();
      const pfOn = this.pfOptions?.getPFEnabled() ?? false;
      if (this.axisHelperGroup) {
        this.axisHelperGroup.visible = pfOn && (this.gKeyPending || this.dragMode !== null);
      }
      // Configure orbit controls based on PF and zoom level.
      const dist = this.camera.position.distanceTo(this.orbitControls.target);
      const zoomIsHigh =
        this.initialCameraDistance > 0 &&
        dist > this.initialCameraDistance * 0.9 &&
        dist < this.initialCameraDistance * 1.1;
      if (!pfOn) {
        // PF off: no rotate/zoom. Pan only when zoomed in (Med/Low).
        this.orbitControls.enableRotate = false;
        this.orbitControls.enableZoom = false;
        this.orbitControls.enablePan = !zoomIsHigh;
      } else {
        // PF on: full orbit controls.
        this.orbitControls.enableRotate = true;
        this.orbitControls.enableZoom = true;
        this.orbitControls.enablePan = true;
      }
      this.orbitControls.enabled = !(pfOn && this.selectedObject !== null);
      this.orbitControls.update();
      // Clamp panning (PF off) so the ShinyPath map stays in view and
      // never shows black border on top/bottom, or more black on the sides
      // than is necessary to keep the full map visible at the current zoom.
      if (!pfOn && this.camera instanceof THREE.PerspectiveCamera) {
        const M = this.mapHalfExtent;
        const fovRad = (this.camera.fov * Math.PI) / 180;
        const dist = this.camera.position.distanceTo(this.orbitControls.target);
        const halfWidth = dist * Math.tan(fovRad / 2);
        // When zoomed in (halfWidth < M), require the entire map to remain
        // inside the frustum: the target can move at most (M - halfWidth)
        // from the center without revealing black space.
        const maxOffset = Math.max(0, M - halfWidth);
        const tx = this.orbitControls.target.x;
        const tz = this.orbitControls.target.z;
        const clampedX = Math.min(Math.max(tx, -maxOffset), maxOffset);
        const clampedZ = Math.min(Math.max(tz, -maxOffset), maxOffset);
        const dx = clampedX - tx;
        const dz = clampedZ - tz;
        if (dx !== 0 || dz !== 0) {
          this.orbitControls.target.x += dx;
          this.orbitControls.target.z += dz;
          this.camera.position.x += dx;
          this.camera.position.z += dz;
        }
      }
      // Steer and move vehicle on XZ plane
      if (this.referenceVehicleGroup) {
        if (this.keysPressed.has('a')) this.referenceVehicleGroup.rotation.y += STEER_SPEED * dt;
        if (this.keysPressed.has('d')) this.referenceVehicleGroup.rotation.y -= STEER_SPEED * dt;
        // Forward/back: move along vehicle's facing direction (flattened to XZ)
        if (this.keysPressed.has('w') || this.keysPressed.has('s')) {
          this.referenceVehicleGroup.getWorldDirection(this.moveDirection);
          this.moveDirection.y = 0;
          this.moveDirection.normalize();
          const sign = this.keysPressed.has('w') ? 1 : -1;
          this.referenceVehicleGroup.position.addScaledVector(this.moveDirection, sign * MOVE_SPEED * dt);
        }
      }
      if (this.activeRoutingBugId || this.bugRouteStates.size > 0) {
        const activeId = this.activeRoutingBugId;
        if (activeId) {
          const state = this.bugRouteStates.get(activeId);
          const bug = this.buggies.get(activeId);
          if (bug && state?.selectionCircle) {
            bug.getWorldPosition(this.tempVec3);
            state.selectionCircle.position.set(this.tempVec3.x, GROUND_PLANE_Y, this.tempVec3.z);
          }
        }
        this.updateConnectingLine();
        this.updateBugAlongPath(dt);
        this.checkDockAtPad();
      }
      this.updateBatteryCharging(dt);
      const t = this.clock.getElapsedTime();
      this.cubeMesh.rotation.x = t * 0.2;
      this.cubeMesh.rotation.y = t * 0.3;
      this.updateBatteryBlink(t);
      this.updateFacilityFailureOverlays();
      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }

  dispose(): void {
    this.disposed = true;
    this.clearWaypointState();
    this.removeDragAxisLine();
    this.attachRotationHelper(null);
    if (this.rotationHelperGroup) {
      this.rotationHelperGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else (obj.material as THREE.Material)?.dispose();
        }
      });
    }
    if (this.pfOptions?.setPositionRef) this.pfOptions.setPositionRef.current = null;
    if (this.pfOptions?.setRotationRef) this.pfOptions.setRotationRef.current = null;
    if (this.pfOptions?.setScaleRef) this.pfOptions.setScaleRef.current = null;
    if (this.pfOptions?.setCameraRef) this.pfOptions.setCameraRef.current = null;
    if (this.pfOptions?.batteryApiRef) this.pfOptions.batteryApiRef.current = null;
    Array.from(this.racks.keys()).forEach((id) => this.removeBatteryRack(id));
    this.facilityFailureOverlays.forEach((group) => {
      group.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          (obj.material as THREE.Material)?.dispose();
        }
      });
      this.scene.remove(group);
    });
    this.facilityFailureOverlays.clear();
    Array.from(this.batteries.keys()).forEach((id) => this.removeBattery(id));
    if (this.pfOptions?.onCameraChange) {
      this.orbitControls.removeEventListener('change', this.boundOnOrbitChange);
    }
    this.canvas.removeEventListener('pointerdown', this.boundOnPointerDown);
    this.canvas.removeEventListener('pointermove', this.boundOnPointerMove);
    this.canvas.removeEventListener('pointerup', this.boundOnPointerUp);
    this.canvas.removeEventListener('pointercancel', this.boundOnPointerUp);
    this.canvas.removeEventListener('contextmenu', this.boundOnContextMenu);
    window.removeEventListener('keydown', this.boundOnKeyDown);
    window.removeEventListener('keyup', this.boundOnKeyUp);
    if (this.tooltipEl?.parentNode) this.tooltipEl.parentNode.removeChild(this.tooltipEl);
    this.tooltipEl = null;
    if (this.rafId != null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
    this.resizeDispose?.();
    this.orbitControls.dispose();
    if (this.axisHelperGroup) {
      this.axisHelperGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material?.dispose();
        }
      });
    }
    if (this.referenceVehicleGroup) {
      this.referenceVehicleGroup.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material?.dispose();
        }
      });
    }
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material?.dispose();
      }
    });
    this.renderer.dispose();
  }
}
