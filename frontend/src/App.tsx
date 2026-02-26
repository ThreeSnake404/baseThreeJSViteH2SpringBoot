import { useRef, useEffect, useState, useCallback } from 'react';
import { Scene, type SelectedObjectInfo } from './three/Scene';

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
  const [placementFacilityOn, setPlacementFacilityOn] = useState(false); // PF=off by default
  const [selectedObjectInfo, setSelectedObjectInfo] = useState<SelectedObjectInfo>(null);
  const [commandInput, setCommandInput] = useState('');
  const [inputX, setInputX] = useState('0');
  const [inputY, setInputY] = useState('0');
  const [inputZ, setInputZ] = useState('0');
  const [inputFocused, setInputFocused] = useState<string | null>(null);
  const pfEnabledRef = useRef(false);
  const setPositionRef = useRef<((x: number, y: number, z: number) => void) | null>(null);
  pfEnabledRef.current = placementFacilityOn;

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

  const onSelectionChange = useCallback((info: SelectedObjectInfo) => {
    setSelectedObjectInfo(info);
  }, []);

  useEffect(() => {
    if (!inputFocused) {
      if (selectedObjectInfo) {
        setInputX(selectedObjectInfo.x.toString());
        setInputY(selectedObjectInfo.y.toString());
        setInputZ(selectedObjectInfo.z.toString());
      } else {
        setInputX('0');
        setInputY('0');
        setInputZ('0');
      }
    }
  }, [selectedObjectInfo, inputFocused]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const scene = new Scene(
      canvasRef.current,
      onColorChange,
      '/models/AxisHelper_01.glb',
      '/models/ReferenceVehicle_01.glb',
      {
        getPFEnabled: () => pfEnabledRef.current,
        onSelectionChange,
        setPositionRef,
      }
    );
    scene.start();
    return () => scene.dispose();
  }, [onColorChange, onSelectionChange]);

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

  const handleCommandSubmit = () => {
    const cmd = commandInput.trim().toUpperCase();
    if (cmd === 'PF=ON') setPlacementFacilityOn(true);
    else if (cmd === 'PF=OFF') setPlacementFacilityOn(false);
    setCommandInput('');
  };

  const handlePositionSubmit = () => {
    const x = parseFloat(inputX);
    const y = parseFloat(inputY);
    const z = parseFloat(inputZ);
    if (Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z)) {
      setPositionRef.current?.(x, y, z);
    }
    setInputFocused(null);
  };

  const inputStyle: React.CSSProperties = {
    width: 56,
    padding: '4px 6px',
    fontSize: 12,
    background: 'rgba(0,0,0,0.7)',
    color: '#eee',
    border: '1px solid #555',
    borderRadius: 4,
    fontFamily: 'monospace',
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
        {placementFacilityOn && ' | Placement Facility ON'}
      </div>
      <input
        type="text"
        value={commandInput}
        onChange={(e) => setCommandInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleCommandSubmit()}
        placeholder="Command (e.g. PF=on)"
        style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          padding: '6px 10px',
          fontSize: 13,
          width: 200,
          background: 'rgba(0,0,0,0.7)',
          color: '#eee',
          border: '1px solid #555',
          borderRadius: 4,
        }}
      />
      {placementFacilityOn && (
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            right: 72,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: '#fff',
            textShadow: '0 0 4px #000',
            fontSize: 12,
            fontFamily: 'monospace',
          }}
        >
          <label htmlFor="pf-id">Selected Object id=</label>
          <span id="pf-id" style={{ marginRight: 4 }}>
            {selectedObjectInfo ? selectedObjectInfo.id : 'none'}
          </span>
          <label htmlFor="pf-x">x=</label>
          <input
            id="pf-x"
            type="text"
            value={inputX}
            onChange={(e) => setInputX(e.target.value)}
            onFocus={() => setInputFocused('x')}
            onBlur={() => setInputFocused(null)}
            onKeyDown={(e) => e.key === 'Enter' && handlePositionSubmit()}
            style={inputStyle}
          />
          <label htmlFor="pf-y">y=</label>
          <input
            id="pf-y"
            type="text"
            value={inputY}
            onChange={(e) => setInputY(e.target.value)}
            onFocus={() => setInputFocused('y')}
            onBlur={() => setInputFocused(null)}
            onKeyDown={(e) => e.key === 'Enter' && handlePositionSubmit()}
            style={inputStyle}
          />
          <label htmlFor="pf-z">z=</label>
          <input
            id="pf-z"
            type="text"
            value={inputZ}
            onChange={(e) => setInputZ(e.target.value)}
            onFocus={() => setInputFocused('z')}
            onBlur={() => setInputFocused(null)}
            onKeyDown={(e) => e.key === 'Enter' && handlePositionSubmit()}
            style={inputStyle}
          />
        </div>
      )}
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
