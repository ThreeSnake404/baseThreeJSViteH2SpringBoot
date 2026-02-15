import * as THREE from 'three';
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
    this.camera.position.set(0, 0, 5);
    this.clock = new THREE.Clock();

    const ambient = new THREE.AmbientLight(0x404040);
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(2, 4, 3);
    this.scene.add(ambient, directional);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: CUBE_COLORS[0].hex,
    });
    this.cubeMesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.cubeMesh);

    this.boundOnPointerDown = this.onPointerDown.bind(this);
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

  start(): void {
    this.resizeDispose = setupResize(
      this.canvas,
      this.renderer,
      this.camera
    );
    this.canvas.addEventListener('pointerdown', this.boundOnPointerDown);
    const loop = () => {
      if (this.disposed) return;
      this.rafId = requestAnimationFrame(loop);
      const t = this.clock.getElapsedTime();
      this.cubeMesh.rotation.x = t * 0.2;
      this.cubeMesh.rotation.y = t * 0.3;
      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }

  dispose(): void {
    this.disposed = true;
    this.canvas.removeEventListener('pointerdown', this.boundOnPointerDown);
    if (this.rafId != null) cancelAnimationFrame(this.rafId);
    this.rafId = null;
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
