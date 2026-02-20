import { useRef, useEffect, useState, useCallback } from 'react';
import { Scene } from './three/Scene';

const API_BASE = '';

const shinyPathGlbUrl = new URL('./models/ShinyPath_01.glb', import.meta.url).href;
const singleBuggyGlbUrl = new URL('./models/SingleBuggy_02.glb', import.meta.url).href;

function generateGuid(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const guidRef = useRef<string>(generateGuid());
  const [wsStatus, setWsStatus] = useState<'closed' | 'open'>('closed');
  const [routeMode, setRouteMode] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  const onColorChange = useCallback((currentColor: string, nextColor: string) => {
    const ws = wsRef.current;
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: 'click',
          guid: guidRef.current,
          currentColor,
          nextColor,
        })
      );
    }
  }, []);

  const onRouteModeChange = useCallback((active: boolean) => setRouteMode(active), []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const scene = new Scene(canvasRef.current, onColorChange, onRouteModeChange);
    sceneRef.current = scene;
    scene.start();
    // Defer model loads so first frame renders and UI stays responsive (GLB parse can block)
    const loadId = requestAnimationFrame(() => {
      sceneRef.current?.loadShinyPath(shinyPathGlbUrl, { singleBuggyUrl: singleBuggyGlbUrl });
    });
    return () => {
      cancelAnimationFrame(loadId);
      sceneRef.current = null;
      scene.dispose();
    };
  }, [onColorChange, onRouteModeChange]);

  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}${API_BASE}/ws`;
    let retryDelay = 1000;
    let retryTimeoutId: ReturnType<typeof setTimeout> | null = null;
    let mounted = true;

    const connect = () => {
      if (!mounted) return;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;
      ws.onopen = () => {
        retryDelay = 1000;
        setWsStatus('open');
      };
      ws.onclose = () => {
        wsRef.current = null;
        setWsStatus('closed');
        if (mounted) {
          retryTimeoutId = setTimeout(connect, retryDelay);
          retryDelay = Math.min(retryDelay * 2, 8000);
        }
      };
      ws.onerror = () => { /* close will follow */ };
      ws.onmessage = (e) => console.log('WS:', e.data);
    };

    const initialDelayId = setTimeout(connect, 400);
    return () => {
      mounted = false;
      clearTimeout(initialDelayId);
      if (retryTimeoutId) clearTimeout(retryTimeoutId);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, []);

  const openH2Console = () => {
    window.open(`${window.location.origin}${API_BASE}/h2-console`, '_blank');
  };

  const zoomButtonStyle: React.CSSProperties = {
    padding: '6px 12px',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    border: '1px solid #444',
    borderRadius: 6,
    background: '#2a2a2a',
    color: '#eee',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
  };

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: '#fff',
          textShadow: '0 0 4px #000',
          fontSize: 14,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: wsStatus === 'open' ? '#0c0' : '#c00',
            flexShrink: 0,
          }}
          title={`WebSocket: ${wsStatus}`}
        />
        <span>WebSocket: {wsStatus}</span>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 44,
          left: 12,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <button
          type="button"
          onClick={() => sceneRef.current?.setZoomLevel('high')}
          title="High altitude – full map in viewport"
          style={zoomButtonStyle}
        >
          High
        </button>
        <button
          type="button"
          onClick={() => sceneRef.current?.setZoomLevel('medium')}
          title="Medium – one quarter of map"
          style={zoomButtonStyle}
        >
          Medium
        </button>
        <button
          type="button"
          onClick={() => sceneRef.current?.setZoomLevel('low')}
          title="Low – one sixteenth of map"
          style={zoomButtonStyle}
        >
          Low
        </button>
        <button
          type="button"
          onClick={() => sceneRef.current?.setRouteMode(!routeMode)}
          title="Route mode: click buggy, then place waypoints; right-click to set final waypoint or destination, or press Route again to exit"
          style={{
            ...zoomButtonStyle,
            background: routeMode ? '#b8860b' : zoomButtonStyle.background,
          }}
        >
          Route
        </button>
      </div>
      <button
        type="button"
        onClick={() => sceneRef.current?.toggleBuggyAnimation()}
        title="Toggle buggy animation (play / pause)"
        style={{
          position: 'absolute',
          bottom: 52,
          right: 16,
          zIndex: 10,
          padding: '8px 14px',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          border: '1px solid #444',
          borderRadius: 6,
          background: '#2a2a2a',
          color: '#eee',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        Animate
      </button>
      <button
        type="button"
        onClick={openH2Console}
        title="Open H2 console (JDBC URL: jdbc:h2:file:./data/pocdb, User: sa, Password: empty)"
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          zIndex: 10,
          padding: '8px 14px',
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          border: '1px solid #444',
          borderRadius: 6,
          background: '#2a2a2a',
          color: '#eee',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        DB
      </button>
    </>
  );
}

export default App;
