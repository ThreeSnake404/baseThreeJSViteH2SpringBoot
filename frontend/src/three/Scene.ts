import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createRenderer } from './core/Renderer';
import { setupResize } from './core/ResizeHandler';

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

export type PlacementFacilityOptions = {
  getPFEnabled: () => boolean;
  onSelectionChange: (info: SelectedObjectInfo) => void;
  onCameraChange?: (info: CameraInfo) => void;
  setPositionRef?: { current: ((x: number, y: number, z: number) => void) | null };
  setRotationRef?: { current: ((rx: number, ry: number, rz: number) => void) | null };
  setScaleRef?: { current: ((sx: number, sy: number, sz: number) => void) | null };
  setCameraRef?: { current: ((params: CameraParams) => void) | null };
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
  private readonly clock: THREE.Clock;
  private readonly cubeMesh: THREE.Mesh;
  private readonly markerSphere: THREE.Mesh;
  private readonly orbitControls: OrbitControls;
  private readonly onColorChange?: OnColorChange;
  private readonly axisHelperUrl?: string;
  private readonly referenceVehicleUrl?: string;
  private axisHelperGroup: THREE.Group | null = null;
  private referenceVehicleGroup: THREE.Group | null = null;
  private colorIndex = 0;
  private readonly raycaster = new THREE.Raycaster();
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
    this.camera.position.set(0, 0, 5);
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

  private onKeyDown(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
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

  private onPointerDown(event: PointerEvent): void {
    if (this.disposed || event.button !== 0) return;
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    if (this.pfOptions?.getPFEnabled()) {
      const roots = this.getSelectableRoots();
      const hits = this.raycaster.intersectObjects(roots, true);
      if (hits.length > 0) {
        const root = this.findRootForObject(hits[0].object);
        if (root) {
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
        }
      } else {
        this.setSelection(null);
        this.pointerDownOnSelected = false;
      }
      return;
    }
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
    this.loadAxisHelper();
    this.loadReferenceVehicle();
    this.loadRotationHelper();
    const loop = () => {
      if (this.disposed) return;
      this.rafId = requestAnimationFrame(loop);
      const dt = this.clock.getDelta();
      if (this.axisHelperGroup) {
        const pfOn = this.pfOptions?.getPFEnabled() ?? false;
        this.axisHelperGroup.visible = pfOn && (this.gKeyPending || this.dragMode !== null);
      }
      this.orbitControls.enabled = !(
        this.pfOptions?.getPFEnabled() && this.selectedObject !== null
      );
      this.orbitControls.update();
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
      const t = this.clock.getElapsedTime();
      this.cubeMesh.rotation.x = t * 0.2;
      this.cubeMesh.rotation.y = t * 0.3;
      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }

  dispose(): void {
    this.disposed = true;
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
    if (this.pfOptions?.onCameraChange) {
      this.orbitControls.removeEventListener('change', this.boundOnOrbitChange);
    }
    this.canvas.removeEventListener('pointerdown', this.boundOnPointerDown);
    this.canvas.removeEventListener('pointermove', this.boundOnPointerMove);
    this.canvas.removeEventListener('pointerup', this.boundOnPointerUp);
    this.canvas.removeEventListener('pointercancel', this.boundOnPointerUp);
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
