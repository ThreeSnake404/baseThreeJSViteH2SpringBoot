import { useRef, useEffect, useState, useCallback } from 'react';
import { Scene } from './three/Scene';

const API_BASE = '';

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
  const guidRef = useRef<string>(generateGuid());
  const [wsStatus, setWsStatus] = useState<'closed' | 'open'>('closed');
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

  useEffect(() => {
    if (!canvasRef.current) return;
    const scene = new Scene(canvasRef.current, onColorChange);
    scene.start();
    return () => scene.dispose();
  }, [onColorChange]);

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

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          color: '#fff',
          textShadow: '0 0 4px #000',
          fontSize: 14,
        }}
      >
        WebSocket: {wsStatus}
      </div>
      <button
        type="button"
        onClick={openH2Console}
        title="Open H2 console (JDBC URL: jdbc:h2:file:./data/pocdb, User: sa, Password: empty)"
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
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
