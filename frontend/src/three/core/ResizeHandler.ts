import * as THREE from 'three';

export function setupResize(
  canvas: HTMLCanvasElement,
  renderer: THREE.WebGLRenderer,
  getCamera: () => THREE.PerspectiveCamera | THREE.OrthographicCamera,
  onResize?: () => void
): () => void {
  const observer = new ResizeObserver(() => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    const camera = getCamera();
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    } else {
      const aspect = w / h;
      const halfH = (camera.top - camera.bottom) / 2;
      const halfW = halfH * aspect;
      camera.left = -halfW;
      camera.right = halfW;
      camera.top = halfH;
      camera.bottom = -halfH;
      camera.updateProjectionMatrix();
    }
    onResize?.();
  });
  observer.observe(canvas);
  return () => observer.disconnect();
}
