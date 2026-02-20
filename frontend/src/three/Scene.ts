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
  private buggyLength = 0;
  private buggyAnimationPlaying = false;
  private buggyAnimationTime = 0;
  /** Map (ShinyPath) bounds in world XY for pan clamping. Set when path loads. */
  private mapBounds: { minX: number; maxX: number; minY: number; maxY: number } | null = null;
  /** Fixed zoom levels: High = full map, Medium = 1/4 map, Low = 1/16 map. No wheel zoom. */
  private zoomLevel: 'high' | 'medium' | 'low' = 'high';
  private readonly zoomDistances = { high: 2.2, medium: 2.2 / 2, low: 2.2 / 4 };

  constructor(canvas: HTMLCanvasElement, onColorChange?: OnColorChange) {
    this.canvas = canvas;
    this.onColorChange = onColorChange;
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
          const topmost = new THREE.Vector3(whiteDomeSurface.centerX, whiteDomeSurface.centerY, whiteDomeSurface.topZ);
          const sphereGeom = new THREE.SphereGeometry(0.03, 16, 12);
          const sphereMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
          const redSphere = new THREE.Mesh(sphereGeom, sphereMat);
          redSphere.position.copy(topmost);
          this.scene.add(redSphere);
        }
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
        this.buggyStartPosition.copy(model.position);
        // Forward = back-to-front (capsule to batteries): use model's +X in world, not +Z (which was "to the right of forward")
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

  private onPointerDown(event: PointerEvent): void {
    if (this.disposed) return;
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);
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
   * Set fixed zoom level (no wheel zoom). High = full map, Medium = 1/4 map, Low = 1/16 map.
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
      if (this.buggyModel && this.buggyLength > 0 && this.buggyAnimationPlaying) {
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
      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }

  dispose(): void {
    this.disposed = true;
    this.canvas.removeEventListener('pointerdown', this.boundOnPointerDown);
    if (this.rafId != null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
    this.controls?.dispose();
    this.controls = null;
    this.resizeDispose?.();
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
