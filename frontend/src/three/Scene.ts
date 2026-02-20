import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createRenderer } from './core/Renderer';
import { setupResize } from './core/ResizeHandler';

const CUBE_COLORS = [
  { name: 'red', hex: 0xff0000 },
  { name: 'green', hex: 0x00ff00 },
  { name: 'blue', hex: 0x0000ff },
  { name: 'orange', hex: 0xffa500 },
  { name: 'purple', hex: 0x800080 },
  { name: 'pink', hex: 0xff69b4 },
] as const;

export type OnColorChange = (currentColor: string, nextColor: string) => void;

/**
 * Single render loop and scene lifecycle. Cube is clickable; cycles through colors and invokes onColorChange.
 */
export class Scene {
  private readonly canvas: HTMLCanvasElement;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly clock: THREE.Clock;
  private readonly cubeMesh: THREE.Mesh;
  private readonly onColorChange?: OnColorChange;
  private colorIndex = 0;
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2();
  private resizeDispose: (() => void) | null = null;
  private rafId: number | null = null;
  private disposed = false;
  private boundOnPointerDown: (e: PointerEvent) => void;
  private chompMixer: THREE.AnimationMixer | null = null;
  private chompClipAction: THREE.AnimationAction | null = null;
  private chompPlaying = false;
  private chompLoaded = false;
  private chompMixerLoggedOnce = false;
  private readonly gltfLoader = new GLTFLoader();
  private controls: InstanceType<typeof OrbitControls> | null = null;
  /** Set after ShinyPath load; used to scale buggy to 1/10 of white dome. */
  private whiteDomeSize: number | null = null;
  /** Buggy animation: model ref, start position, forward (horizontal), length, for 20 lengths in 1s fwd then 1s back. */
  private buggyModel: THREE.Object3D | null = null;
  private readonly buggyStartPosition = new THREE.Vector3();
  private readonly buggyForward = new THREE.Vector3();
  /** Initial buggy quaternion (wheels on ground, front away from dome). Route heading = world Z rotation * this. */
  private readonly buggyInitialQuat = new THREE.Quaternion();
  private readonly buggyZRotQuat = new THREE.Quaternion();
  private readonly worldZAxis = new THREE.Vector3(0, 0, 1);
  private buggyLength = 0;
  private buggyAnimationPlaying = false;
  private buggyAnimationTime = 0;
  /** Map (ShinyPath) bounds in world XY for pan clamping. Set when path loads. */
  private mapBounds: { minX: number; maxX: number; minY: number; maxY: number } | null = null;
  /** Fixed zoom levels: High = full map, Medium = 1/4 map, Low = 1/16 map. No wheel zoom. */
  private zoomLevel: 'high' | 'medium' | 'low' = 'high';
  private readonly zoomDistances = { high: 2.2, medium: 2.2 / 2, low: 2.2 / 4 };
  /** Route mode: green circle under buggy, waypoints, dynamic line, destinations (green domes). */
  private routeMode = false;
  private buggySelected = false;
  private readonly routeWaypoints: { x: number; y: number }[] = [];
  private buggyCircle: THREE.Mesh | null = null;
  private readonly waypointMeshes: THREE.Mesh[] = [];
  private dynamicLine: THREE.Line | null = null;
  private readonly destinationCircles: THREE.Mesh[] = [];
  /** Green dome destinations: center (x,y) and dome radius. Circle radius = domeRadius + buggyLength when drawing. */
  private destinations: { x: number; y: number; domeRadius: number }[] = [];
  /** Debug: red spheres on top of each detected green dome (to verify detection). */
  private readonly debugDomeSpheres: THREE.Mesh[] = [];
  private readonly mapPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  private readonly mapPlaneIntersect = new THREE.Vector3();
  private surfaceZ = 0;
  private boundOnPointerMove: (e: PointerEvent) => void;
  private boundOnPointerUp: (e: PointerEvent) => void;
  private boundOnContextMenu: (e: PointerEvent) => void;
  private onRouteModeChange?: (active: boolean) => void;
  /** Right mouse down in route mode: store target to detect pan. Terminate route only on right release if map was not panned. */
  private routeRightDown = false;
  private readonly routeRightDownTarget = new THREE.Vector3();
  private static readonly ROUTE_PAN_EPSILON = 1e-5;
  /** Route: buggy moving toward waypoints; start/end position and progress. */
  private routeMoveStart = new THREE.Vector3();
  private routeMoveEnd = new THREE.Vector3();
  private routeMoveDuration = 0;
  private routeMoveElapsed = 0;
  private readonly routeMoveSpeed = 6; // buggy lengths per second (max)
  /** Last mouse position on map plane (for dynamic route line when buggySelected). */
  private readonly lastMouseWorldOnMap = new THREE.Vector3();
  private static readonly MAX_ROUTE_LINE_POINTS = 64;

  constructor(canvas: HTMLCanvasElement, onColorChange?: OnColorChange, onRouteModeChange?: (active: boolean) => void) {
    this.canvas = canvas;
    this.onColorChange = onColorChange;
    this.onRouteModeChange = onRouteModeChange;
    this.renderer = createRenderer(canvas);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      50,
      canvas.clientWidth / canvas.clientHeight || 1,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 2.2); // closer so moon edges nearly fill viewport
    this.clock = new THREE.Clock();

    const ambient = new THREE.AmbientLight(0x404040);
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(2, 4, 3);
    const sun = new THREE.DirectionalLight(0xfff5e6, 1.2);
    sun.position.set(5, 10, 7);
    sun.castShadow = false; // disabled to avoid main-thread/GPU freeze with complex moon
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 50;
    sun.shadow.camera.left = -15;
    sun.shadow.camera.right = 15;
    sun.shadow.camera.top = 15;
    sun.shadow.camera.bottom = -15;
    this.scene.add(ambient, directional, sun);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: CUBE_COLORS[0].hex,
    });
    this.cubeMesh = new THREE.Mesh(geometry, material);
    this.cubeMesh.position.set(-1.5, 0, 0);
    this.cubeMesh.visible = false; // hidden per request
    this.scene.add(this.cubeMesh);

    // Small X,Y,Z axis helper to the left of center (world -X), with letter labels
    const axesOrigin = new THREE.Vector3(-1.2, 0, 0);
    const axesSize = 0.25;
    const axesHelper = new THREE.AxesHelper(axesSize);
    axesHelper.position.copy(axesOrigin);
    this.scene.add(axesHelper);
    const labelScale = 0.12;
    const xLabel = this.makeAxisLabel('X', 0xff2222);
    xLabel.position.set(axesOrigin.x + axesSize, axesOrigin.y, axesOrigin.z);
    xLabel.scale.setScalar(labelScale);
    this.scene.add(xLabel);
    const yLabel = this.makeAxisLabel('Y', 0x22cc22);
    yLabel.position.set(axesOrigin.x, axesOrigin.y + axesSize, axesOrigin.z);
    yLabel.scale.setScalar(labelScale);
    this.scene.add(yLabel);
    const zLabel = this.makeAxisLabel('Z', 0x2222ff);
    zLabel.position.set(axesOrigin.x, axesOrigin.y, axesOrigin.z + axesSize);
    zLabel.scale.setScalar(labelScale);
    this.scene.add(zLabel);

    this.boundOnPointerDown = this.onPointerDown.bind(this);
    this.boundOnPointerMove = this.onPointerMove.bind(this);
    this.boundOnPointerUp = this.onPointerUp.bind(this);
    this.boundOnContextMenu = this.onContextMenu.bind(this);
  }

  /** Create a sprite with a single letter for axis labeling (always faces camera). */
  private makeAxisLabel(text: string, color: number): THREE.Sprite {
    const canvas = document.createElement('canvas');
    const size = 64;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
    ctx.font = `bold ${size * 0.7}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, size / 2, size / 2);
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    return sprite;
  }

  /**
   * Load Moon_Surface_01.glb and add it at the center of the viewport (origin).
   */
  loadMoon(glbUrl: string): void {
    this.gltfLoader.load(
      glbUrl,
      (gltf) => {
        if (this.disposed) return;
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        // Rotate so moon surface plane is parallel to viewport (face the camera)
        model.rotation.x = -Math.PI / 2;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z, 0.001);
        const scale = 2 / maxDim;
        model.scale.setScalar(scale);
        this.scene.add(model);
      },
      undefined,
      (err) => console.error('Failed to load moon GLB:', err)
    );
  }

  /**
   * Load ShinyPath_01.glb at center. Optional singleBuggyUrl loads buggy after path (scaled 1/10 of white dome).
   */
  loadShinyPath(glbUrl: string, opts?: { singleBuggyUrl?: string }): void {
    this.gltfLoader.load(
      glbUrl,
      (gltf) => {
        if (this.disposed) return;
        const model = gltf.scene;
        model.position.set(0, 0, 0);
        // Plane parallel to viewport; dome tops face camera (+Z). White dome = parking garage in lower left.
        model.rotation.x = -Math.PI / 2;
        model.rotation.y = Math.PI;
        model.rotation.z = Math.PI;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z, 0.001);
        const scale = 2 / maxDim;
        model.scale.setScalar(scale);
        this.scene.add(model);
        model.updateMatrixWorld(true);
        const mapBox = new THREE.Box3().setFromObject(model);
        this.mapBounds = { minX: mapBox.min.x, maxX: mapBox.max.x, minY: mapBox.min.y, maxY: mapBox.max.y };
        // White dome = smallest very-light mesh (parking garage dome); avoid large flat ground/pathway by requiring dome-like proportions (similar X/Y/Z extent)
        let whiteDomeMesh: THREE.Mesh | null = null;
        let bestScore = Infinity;
        const center = new THREE.Vector3();
        const sizeVec = new THREE.Vector3();
        model.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            const mat = Array.isArray(child.material) ? child.material[0] : child.material;
            if (mat && 'color' in mat && mat.color) {
              const c = (mat as THREE.MeshStandardMaterial).color;
              const L = 0.299 * c.r + 0.587 * c.g + 0.114 * c.b;
              const meshBox = new THREE.Box3().setFromObject(child);
              meshBox.getSize(sizeVec);
              const maxSize = Math.max(sizeVec.x, sizeVec.y, sizeVec.z);
              const minSize = Math.min(sizeVec.x, sizeVec.y, sizeVec.z);
              const isDomeLike = minSize > maxSize * 0.3;
              if (L > 0.75 && isDomeLike && maxSize < bestScore) {
                whiteDomeMesh = child;
                bestScore = maxSize;
              }
            }
          }
        });
        if (whiteDomeMesh === null) {
          bestScore = Infinity;
          model.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material) {
              const mat = Array.isArray(child.material) ? child.material[0] : child.material;
              if (mat && 'color' in mat && mat.color) {
                const c = (mat as THREE.MeshStandardMaterial).color;
                const L = 0.299 * c.r + 0.587 * c.g + 0.114 * c.b;
                const meshBox = new THREE.Box3().setFromObject(child);
                meshBox.getSize(sizeVec);
                const maxSize = Math.max(sizeVec.x, sizeVec.y, sizeVec.z);
                if (L > 0.7 && maxSize < bestScore) {
                  whiteDomeMesh = child;
                  bestScore = maxSize;
                }
              }
            }
          });
        }
        let whiteDomeSurface: { centerX: number; centerY: number; topZ: number; groundZ: number } | undefined;
        if (whiteDomeMesh) {
          const domeBox = new THREE.Box3().setFromObject(whiteDomeMesh);
          const domeSize = domeBox.getSize(new THREE.Vector3());
          this.whiteDomeSize = Math.max(domeSize.x, domeSize.y, domeSize.z);
          whiteDomeSurface = {
            centerX: (domeBox.min.x + domeBox.max.x) / 2,
            centerY: (domeBox.min.y + domeBox.max.y) / 2,
            topZ: domeBox.max.z,
            groundZ: domeBox.min.z, // where dome meets ground (blue flat surface)
          };
          // White dome: parking garage; top at (centerX, centerY, topZ), base at groundZ (no red sphere marker)
        }
        this.destinations = [];
        const addDomeDestination = (mesh: THREE.Mesh, box: THREE.Box3, domeRadius: number) => {
          box.getCenter(center);
          this.destinations.push({ x: center.x, y: center.y, domeRadius });
          const sphereGeom = new THREE.SphereGeometry(Math.max(domeRadius * 0.15, 0.02), 16, 12);
          const sphereMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
          const sphere = new THREE.Mesh(sphereGeom, sphereMat);
          sphere.position.set(center.x, center.y, box.max.z + 0.02);
          this.scene.add(sphere);
          this.debugDomeSpheres.push(sphere);
        };
        model.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            const mat = Array.isArray(child.material) ? child.material[0] : child.material;
            const meshBox = new THREE.Box3().setFromObject(child);
            meshBox.getSize(sizeVec);
            const maxSize = Math.max(sizeVec.x, sizeVec.y, sizeVec.z);
            const minSize = Math.min(sizeVec.x, sizeVec.y, sizeVec.z);
            const isDomeLike = minSize > maxSize * 0.3;
            if (!isDomeLike) return;
            if (child === whiteDomeMesh) return;
            let isGreen = false;
            if (mat && 'color' in mat && mat.color) {
              const c = (mat as THREE.MeshStandardMaterial).color;
              const greenness = c.g - (c.r + c.b) / 2;
              isGreen = greenness > 0.15;
            }
            const name = (child.name || '').toLowerCase();
            if (!isGreen && (name.includes('green') || name.includes('dome'))) isGreen = true;
            if (isGreen) {
              const domeRadius = maxSize / 2;
              addDomeDestination(child, meshBox, domeRadius);
            }
          }
        });
        if (this.destinations.length < 5) {
          this.destinations = [];
          this.debugDomeSpheres.forEach((s) => {
            this.scene.remove(s);
            s.geometry.dispose();
            (s.material as THREE.Material).dispose();
          });
          this.debugDomeSpheres.length = 0;
          model.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material && child !== whiteDomeMesh) {
              const meshBox = new THREE.Box3().setFromObject(child);
              meshBox.getSize(sizeVec);
              const maxSize = Math.max(sizeVec.x, sizeVec.y, sizeVec.z);
              const minSize = Math.min(sizeVec.x, sizeVec.y, sizeVec.z);
              const isDomeLike = minSize > maxSize * 0.3;
              if (!isDomeLike) return;
              const mat = Array.isArray(child.material) ? child.material[0] : child.material;
              let isWhite = false;
              if (mat && 'color' in mat && mat.color) {
                const c = (mat as THREE.MeshStandardMaterial).color;
                const L = 0.299 * c.r + 0.587 * c.g + 0.114 * c.b;
                if (L > 0.7) isWhite = true;
              }
              if (!isWhite) {
                const domeRadius = maxSize / 2;
                addDomeDestination(child, meshBox, domeRadius);
              }
            }
          });
        }
        console.log('[Scene] Green dome destinations found:', this.destinations.length, '(expected 5). Positions:', this.destinations.map((d) => ({ x: d.x.toFixed(3), y: d.y.toFixed(3), r: d.domeRadius.toFixed(3) })));
        if (opts?.singleBuggyUrl) this.loadSingleBuggy(opts.singleBuggyUrl, this.whiteDomeSize ?? undefined, whiteDomeSurface);
      },
      undefined,
      (err) => console.error('Failed to load ShinyPath GLB:', err)
    );
  }

  /**
   * Load SingleBuggy_02.glb at base of white dome where it meets the ground; wheels on blue flat surface. Scale ~3/10 of white dome.
   */
  loadSingleBuggy(
    glbUrl: string,
    whiteDomeSize?: number,
    whiteDomeSurface?: { centerX: number; centerY: number; topZ: number; groundZ: number }
  ): void {
    this.gltfLoader.load(
      glbUrl,
      (gltf) => {
        if (this.disposed) return;
        const model = gltf.scene;
        // Original orientation: wheels on ground, front pointing away from white dome base. Only rotation during route is around Z (map normal toward viewport).
        model.rotation.x = -Math.PI / 2;
        model.rotation.y = Math.PI;
        model.rotation.z = Math.PI;
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z, 0.001);
        if (whiteDomeSize != null && whiteDomeSize > 0) {
          model.scale.setScalar(((whiteDomeSize / 10) * 3) / maxDim); // ~3x previous size (3/10 of dome)
        }
        if (whiteDomeSurface) {
          model.position.set(whiteDomeSurface.centerX + 0.12, whiteDomeSurface.centerY, 0);
        } else {
          model.position.set(0.5, -0.4, 0);
        }
        this.scene.add(model);
        model.updateMatrixWorld(true);
        const worldBox = new THREE.Box3().setFromObject(model);
        if (whiteDomeSurface) {
          const wheelContactZ = whiteDomeSurface.groundZ - worldBox.min.z;
          model.position.z = wheelContactZ + 0.005; // nudge up so wheels sit on surface without sinking
        } else {
          model.position.z -= worldBox.min.z;
        }
        model.updateMatrixWorld(true);
        this.buggyModel = model;
        this.buggyInitialQuat.copy(model.quaternion);
        this.buggyStartPosition.copy(model.position);
        // Forward = back-to-front (capsule to batteries): use model's +X in world
        this.buggyForward.set(1, 0, 0).applyQuaternion(model.quaternion);
        this.buggyForward.z = 0;
        if (this.buggyForward.lengthSq() < 1e-6) this.buggyForward.set(1, 0, 0);
        this.buggyForward.normalize();
        const worldSize = worldBox.getSize(new THREE.Vector3());
        this.buggyLength = Math.max(worldSize.x, worldSize.y, worldSize.z);
      },
      undefined,
      (err) => console.error('Failed to load SingleBuggy_02 GLB:', err)
    );
  }

  /** Ease-in ease-out (smoothstep): 0 at 0, 1 at 1, smooth start and end. */
  private static easeInOut(t: number): number {
    return t * t * (3 - 2 * t);
  }

  private getMouseWorldOnMap(out: THREE.Vector3): boolean {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    this.raycaster.ray.intersectPlane(this.mapPlane, out);
    return true;
  }

  private onPointerMove(event: PointerEvent): void {
    if (!this.routeMode || this.disposed) return;
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    if (!this.buggySelected) return;
    this.getMouseWorldOnMap(this.mapPlaneIntersect);
    this.lastMouseWorldOnMap.copy(this.mapPlaneIntersect);
  }

  private onContextMenu(event: PointerEvent): void {
    if (this.routeMode) event.preventDefault();
  }

  private onPointerUp(event: PointerEvent): void {
    if (!this.routeMode || this.disposed || event.button !== 2) return;
    if (!this.routeRightDown) return;
    this.routeRightDown = false;
    const target = this.controls?.target;
    if (!target) return;
    const dx = target.x - this.routeRightDownTarget.x;
    const dy = target.y - this.routeRightDownTarget.y;
    const panned = dx * dx + dy * dy > Scene.ROUTE_PAN_EPSILON * Scene.ROUTE_PAN_EPSILON;
    if (!panned) this.setRouteMode(false);
  }

  private hitDestination(x: number, y: number): boolean {
    if (this.buggyLength <= 0) return false;
    for (const d of this.destinations) {
      const radius = d.domeRadius + this.buggyLength;
      const dx = x - d.x, dy = y - d.y;
      if (dx * dx + dy * dy <= radius * radius) return true;
    }
    return false;
  }

  private onPointerDown(event: PointerEvent): void {
    if (this.disposed) return;
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    if (this.routeMode) {
      if (event.button === 2) {
        this.routeRightDown = true;
        if (this.controls?.target) this.routeRightDownTarget.copy(this.controls.target);
        return;
      }
      this.getMouseWorldOnMap(this.mapPlaneIntersect);
      const wx = this.mapPlaneIntersect.x, wy = this.mapPlaneIntersect.y;
      if (this.hitDestination(wx, wy)) {
        this.setRouteMode(false);
        return;
      }
      const hitBuggy = this.buggyModel && this.raycaster.intersectObject(this.buggyModel, true).length > 0;
      const hitBuggyCircle = this.buggyCircle && this.raycaster.intersectObject(this.buggyCircle, false).length > 0;
      if (hitBuggy || hitBuggyCircle) {
        this.buggySelected = true;
        if (this.buggyModel) {
          this.lastMouseWorldOnMap.set(this.buggyModel.position.x, this.buggyModel.position.y, this.surfaceZ);
        }
        if (this.buggyCircle && this.buggyCircle.material instanceof THREE.MeshBasicMaterial) {
          this.buggyCircle.material.color.setHex(0xffd700);
        }
        if (this.dynamicLine) this.dynamicLine.visible = true;
        return;
      }
      if (this.buggySelected) {
        this.routeWaypoints.push({ x: wx, y: wy });
        const circleGeom = new THREE.CircleGeometry(this.buggyLength * 0.5, 24);
        const circleMat = new THREE.MeshBasicMaterial({ color: 0xffd700, depthWrite: false, transparent: true, opacity: 0.5 });
        const wpMesh = new THREE.Mesh(circleGeom, circleMat);
        wpMesh.position.set(wx, wy, this.surfaceZ);
        this.scene.add(wpMesh);
        this.waypointMeshes.push(wpMesh);
        if (this.routeWaypoints.length === 1 && !this.routeMoveDuration) {
          this.startRouteMoveToNext();
        }
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

  private startRouteMoveToNext(): void {
    if (!this.buggyModel || this.routeWaypoints.length === 0) return;
    this.routeMoveStart.copy(this.buggyModel.position);
    const wp = this.routeWaypoints[0];
    this.routeMoveEnd.set(wp.x, wp.y, this.buggyModel.position.z);
    const dist = this.routeMoveStart.distanceTo(this.routeMoveEnd);
    this.routeMoveDuration = dist / (this.buggyLength * this.routeMoveSpeed);
    this.routeMoveElapsed = 0;
  }

  /**
   * Load chomp_04.gltf (and referenced .bin), add it to the left of the cube, and start its animation.
   */
  loadChompAndPlay(gltfUrl: string): void {
    console.log('[Chomp] loadChompAndPlay called, url=', gltfUrl, 'chompLoaded=', this.chompLoaded, 'disposed=', this.disposed);
    if (this.chompLoaded || this.disposed) {
      console.log('[Chomp] loadChompAndPlay early return (already loaded or disposed)');
      return;
    }
    this.chompLoaded = true;
    console.log('[Chomp] Load started (GLTFLoader.load)');
    this.gltfLoader.load(
      gltfUrl,
      (gltf) => {
        console.log('[Chomp] Load completed successfully', 'animations=', gltf.animations?.length ?? 0, 'scene children=', gltf.scene?.children?.length ?? 0);
        if (this.disposed) {
          console.log('[Chomp] Load callback skipped (disposed)');
          return;
        }
        const model = gltf.scene;
        model.position.set(-2, 0, 0);
        // Scale to be visible next to the unit cube (1x1x1)
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z, 0.001);
        const scale = 1 / maxDim;
        model.scale.setScalar(scale);
        this.scene.add(model);
        console.log('[Chomp] Model added to scene at (-2,0,0), scale=', scale);

        if (gltf.animations.length > 0) {
          const clip = gltf.animations.reduce(
            (best, c) => (c.duration > best.duration ? c : best),
            gltf.animations[0]
          );
          console.log('[Chomp] Creating mixer and action, clip name=', clip.name, 'duration=', clip.duration, '(chose longest of', gltf.animations.length, 'clips)');
          this.chompMixer = new THREE.AnimationMixer(model);
          this.chompClipAction = this.chompMixer.clipAction(clip);
          this.chompClipAction.setLoop(THREE.LoopRepeat, Infinity);
          this.chompClipAction.clampWhenFinished = false;
          this.chompClipAction.paused = false;
          this.chompClipAction.reset();
          this.chompClipAction.play();
          this.chompPlaying = true;
          console.log('[Chomp] Play started (action.play() called, chompPlaying=true)');
        } else {
          console.warn('[Chomp] chomp_04.gltf has no animation clips.');
        }
      },
      (progress) => {
        if (progress.lengthComputable) {
          console.log('[Chomp] Load progress', Math.round((100 * progress.loaded) / progress.total) + '%');
        } else {
          console.log('[Chomp] Load progress', progress.loaded, 'bytes');
        }
      },
      (err) => {
        console.error('[Chomp] Load failed:', err);
      }
    );
  }

  /**
   * Toggle play/pause of the buggy forward/back animation. First press starts, subsequent presses toggle.
   */
  toggleBuggyAnimation(): void {
    this.buggyAnimationPlaying = !this.buggyAnimationPlaying;
  }

  /**
   * Toggle play/pause of the chomp animation. No-op if not loaded yet.
   */
  toggleChompAnimation(): void {
    console.log('[Chomp] toggleChompAnimation called, chompClipAction=', !!this.chompClipAction, 'chompPlaying (before)=', this.chompPlaying);
    if (!this.chompClipAction) {
      console.log('[Chomp] toggleChompAnimation no-op (no clip action yet)');
      return;
    }
    this.chompPlaying = !this.chompPlaying;
    this.chompClipAction.paused = !this.chompPlaying;
    console.log('[Chomp] Toggle applied: chompPlaying=', this.chompPlaying, 'action.paused=', this.chompClipAction.paused);
  }

  /**
   * Enter or exit Route mode. When entering: green circle under buggy, destination circles. When exiting: remove route visuals, clear waypoints.
   */
  setRouteMode(active: boolean): void {
    if (this.routeMode === active) return;
    this.routeMode = active;
    this.onRouteModeChange?.(active);
    if (active) {
      this.buggySelected = false;
      this.routeWaypoints.length = 0;
      this.routeRightDown = false;
      this.createRouteVisuals();
      this.canvas.addEventListener('pointermove', this.boundOnPointerMove);
      this.canvas.addEventListener('pointerup', this.boundOnPointerUp);
      window.addEventListener('pointerup', this.boundOnPointerUp);
      this.canvas.addEventListener('contextmenu', this.boundOnContextMenu);
    } else {
      this.canvas.removeEventListener('pointermove', this.boundOnPointerMove);
      this.canvas.removeEventListener('pointerup', this.boundOnPointerUp);
      window.removeEventListener('pointerup', this.boundOnPointerUp);
      this.canvas.removeEventListener('contextmenu', this.boundOnContextMenu);
      this.removeRouteVisuals();
      this.buggySelected = false;
      this.routeWaypoints.length = 0;
      this.routeMoveDuration = 0;
    }
  }

  private createRouteVisuals(): void {
    if (!this.buggyModel || this.buggyLength <= 0) return;
    this.surfaceZ = 0.001;
    const circleGeom = new THREE.CircleGeometry(this.buggyLength, 32);
    const circleMat = new THREE.MeshBasicMaterial({ color: 0x00ff00, depthWrite: false, transparent: true, opacity: 0.5 });
    this.buggyCircle = new THREE.Mesh(circleGeom, circleMat);
    // CircleGeometry lies in XY plane by default; keep it parallel to the map (no rotation)
    this.updateBuggyCirclePosition();
    this.scene.add(this.buggyCircle);
    const lineGeom = new THREE.BufferGeometry();
    const linePositions = new Float32Array(Scene.MAX_ROUTE_LINE_POINTS * 3);
    lineGeom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeom.setDrawRange(0, 0);
    this.dynamicLine = new THREE.Line(lineGeom, new THREE.LineBasicMaterial({ color: 0xffd700 }));
    this.dynamicLine.visible = false;
    this.scene.add(this.dynamicLine);
    const destZ = this.surfaceZ + 0.004;
    for (const d of this.destinations) {
      const radius = d.domeRadius + this.buggyLength;
      const geom = new THREE.CircleGeometry(radius, 32);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x00aa00,
        depthWrite: false,
        depthTest: false,
        transparent: true,
        opacity: 0.5,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(d.x, d.y, destZ);
      mesh.renderOrder = 1;
      this.scene.add(mesh);
      this.destinationCircles.push(mesh);
    }
  }

  private removeRouteVisuals(): void {
    if (this.buggyCircle) {
      this.scene.remove(this.buggyCircle);
      this.buggyCircle.geometry.dispose();
      (this.buggyCircle.material as THREE.Material).dispose();
      this.buggyCircle = null;
    }
    for (const m of this.waypointMeshes) {
      this.scene.remove(m);
      m.geometry.dispose();
      (m.material as THREE.Material).dispose();
    }
    this.waypointMeshes.length = 0;
    if (this.dynamicLine) {
      this.scene.remove(this.dynamicLine);
      this.dynamicLine.geometry.dispose();
      (this.dynamicLine.material as THREE.Material).dispose();
      this.dynamicLine = null;
    }
    for (const m of this.destinationCircles) {
      this.scene.remove(m);
      m.geometry.dispose();
      (m.material as THREE.Material).dispose();
    }
    this.destinationCircles.length = 0;
  }

  private updateBuggyCirclePosition(): void {
    if (!this.buggyCircle || !this.buggyModel) return;
    this.buggyCircle.position.set(this.buggyModel.position.x, this.buggyModel.position.y, this.surfaceZ);
  }

  /**
   * Update the route polyline: buggy position -> waypoints -> (mouse if buggySelected).
   * Called every frame so the line from buggy to current target and between waypoints is continuous.
   */
  private updateDynamicRouteLine(): void {
    if (!this.dynamicLine || !this.buggyModel) return;
    const pos = this.dynamicLine.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    let i = 0;
    const bx = this.buggyModel.position.x, by = this.buggyModel.position.y;
    arr[i * 3] = bx;
    arr[i * 3 + 1] = by;
    arr[i * 3 + 2] = this.surfaceZ;
    i++;
    for (const wp of this.routeWaypoints) {
      if (i >= Scene.MAX_ROUTE_LINE_POINTS) break;
      arr[i * 3] = wp.x;
      arr[i * 3 + 1] = wp.y;
      arr[i * 3 + 2] = this.surfaceZ;
      i++;
    }
    if (this.buggySelected && i < Scene.MAX_ROUTE_LINE_POINTS) {
      arr[i * 3] = this.lastMouseWorldOnMap.x;
      arr[i * 3 + 1] = this.lastMouseWorldOnMap.y;
      arr[i * 3 + 2] = this.surfaceZ;
      i++;
    }
    pos.needsUpdate = true;
    this.dynamicLine.geometry.setDrawRange(0, Math.max(0, i));
  }

  /**
   * Set fixed zoom level (no wheel zoom). High = full map, Medium = 1/4 map, Low = 1/16 map.
   * Does not exit or affect Route mode.
   */
  setZoomLevel(level: 'high' | 'medium' | 'low'): void {
    this.zoomLevel = level;
    const dist = this.zoomDistances[level];
    const target = this.controls?.target;
    if (target) this.camera.position.set(target.x, target.y, dist);
  }

  start(): void {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.target.set(0, 0, 0);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = false;
    this.controls.enableRotate = false;
    this.controls.enablePan = true;

    this.resizeDispose = setupResize(
      this.canvas,
      this.renderer,
      this.camera
    );
    // Force initial size so we don't render at 0x0 before ResizeObserver fires
    const w = this.canvas.clientWidth || 1;
    const h = this.canvas.clientHeight || 1;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    this.canvas.addEventListener('pointerdown', this.boundOnPointerDown);
    const loop = () => {
      if (this.disposed) return;
      this.rafId = requestAnimationFrame(loop);
      const delta = this.clock.getDelta();
      const t = this.clock.getElapsedTime();
      this.controls?.update();
      const dist = this.zoomDistances[this.zoomLevel];
      if (this.controls) {
        const target = this.controls.target;
        if (this.mapBounds) {
          const halfFov = (this.camera.fov * Math.PI) / 360;
          const halfHeight = dist * Math.tan(halfFov);
          const halfWidth = halfHeight * (this.camera.aspect || 1);
          const { minX, maxX, minY, maxY } = this.mapBounds;
          let txMin = minX + halfWidth;
          let txMax = maxX - halfWidth;
          let tyMin = minY + halfHeight;
          let tyMax = maxY - halfHeight;
          if (txMin > txMax) txMin = txMax = (minX + maxX) / 2;
          if (tyMin > tyMax) tyMin = tyMax = (minY + maxY) / 2;
          target.x = Math.max(txMin, Math.min(txMax, target.x));
          target.y = Math.max(tyMin, Math.min(tyMax, target.y));
          target.z = 0;
        }
        this.camera.position.set(target.x, target.y, dist);
      }
      this.cubeMesh.rotation.x = t * 0.2;
      this.cubeMesh.rotation.y = t * 0.3;
      if (this.chompMixer) {
        if (!this.chompMixerLoggedOnce) {
          console.log('[Chomp] First mixer.update(delta) in render loop, delta=', delta);
          this.chompMixerLoggedOnce = true;
        }
        this.chompMixer.update(delta);
      }
      const routeMoving = this.routeMode && this.routeWaypoints.length > 0 && this.routeMoveDuration > 0;
      if (this.buggyModel && this.buggyLength > 0 && this.buggyAnimationPlaying && !routeMoving) {
        this.buggyAnimationTime += delta;
        const cycleSec = 12; // 6s forward + 6s back (half of previous speed)
        const t = this.buggyAnimationTime % cycleSec;
        const totalDist = 20 * this.buggyLength;
        const phaseSec = cycleSec / 2;
        if (t < phaseSec) {
          const progress = t / phaseSec;
          const eased = Scene.easeInOut(progress);
          const offset = totalDist * eased;
          this.buggyModel.position.copy(this.buggyStartPosition).addScaledVector(this.buggyForward, offset);
        } else {
          const progress = (t - phaseSec) / phaseSec;
          const eased = Scene.easeInOut(progress);
          const offset = totalDist * eased;
          this.buggyModel.position.copy(this.buggyStartPosition).addScaledVector(this.buggyForward, totalDist - offset);
        }
      }
      if (this.routeMode && this.buggyModel && this.routeMoveDuration > 0) {
        this.routeMoveElapsed += delta;
        const t = Math.min(1, this.routeMoveElapsed / this.routeMoveDuration);
        const eased = Scene.easeInOut(t);
        this.buggyModel.position.lerpVectors(this.routeMoveStart, this.routeMoveEnd, eased);
        const dx = this.routeMoveEnd.x - this.buggyModel.position.x;
        const dy = this.routeMoveEnd.y - this.buggyModel.position.y;
        if (dx * dx + dy * dy > 1e-10) {
          const targetAngle = Math.atan2(dy, dx);
          const initialForwardAngle = Math.atan2(this.buggyForward.y, this.buggyForward.x);
          const angle = targetAngle - initialForwardAngle;
          this.buggyZRotQuat.setFromAxisAngle(this.worldZAxis, angle);
          this.buggyModel.quaternion.copy(this.buggyInitialQuat).premultiply(this.buggyZRotQuat);
        }
        this.updateBuggyCirclePosition();
        if (t >= 1) {
          this.routeWaypoints.shift();
          const firstMesh = this.waypointMeshes.shift();
          if (firstMesh) {
            this.scene.remove(firstMesh);
            firstMesh.geometry.dispose();
            (firstMesh.material as THREE.Material).dispose();
          }
          this.routeMoveDuration = 0;
          if (this.routeWaypoints.length > 0) this.startRouteMoveToNext();
        }
      } else if (this.routeMode) {
        this.updateBuggyCirclePosition();
      }
      if (this.routeMode && this.dynamicLine && (this.buggySelected || this.routeWaypoints.length > 0)) {
        this.updateDynamicRouteLine();
      }
      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }

  dispose(): void {
    this.disposed = true;
    this.canvas.removeEventListener('pointerdown', this.boundOnPointerDown);
    if (this.routeMode) {
      this.canvas.removeEventListener('pointermove', this.boundOnPointerMove);
      this.canvas.removeEventListener('pointerup', this.boundOnPointerUp);
      window.removeEventListener('pointerup', this.boundOnPointerUp);
      this.canvas.removeEventListener('contextmenu', this.boundOnContextMenu);
      this.removeRouteVisuals();
    }
    if (this.rafId != null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
    this.controls?.dispose();
    this.controls = null;
    this.resizeDispose?.();
    for (const sphere of this.debugDomeSpheres) {
      this.scene.remove(sphere);
      sphere.geometry.dispose();
      (sphere.material as THREE.Material).dispose();
    }
    this.debugDomeSpheres.length = 0;
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
