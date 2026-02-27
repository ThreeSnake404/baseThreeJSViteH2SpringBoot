import { useRef, useEffect, useState, useCallback } from 'react';
import { Scene, type SelectedObjectInfo } from './three/Scene';

const API_BASE = '';

const radToDeg = (rad: number): number => (rad * 180) / Math.PI;
const degToRad = (deg: number): number => (deg * Math.PI) / 180;

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
  const [inputRx, setInputRx] = useState('0');
  const [inputRy, setInputRy] = useState('0');
  const [inputRz, setInputRz] = useState('0');
  const [inputScale, setInputScale] = useState('1');
  const [inputFocused, setInputFocused] = useState<string | null>(null);
  const pfEnabledRef = useRef(false);
  const setPositionRef = useRef<((x: number, y: number, z: number) => void) | null>(null);
  const setRotationRef = useRef<((rx: number, ry: number, rz: number) => void) | null>(null);
  const setScaleRef = useRef<((sx: number, sy: number, sz: number) => void) | null>(null);
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
        setInputRx(radToDeg(selectedObjectInfo.rx).toFixed(2));
        setInputRy(radToDeg(selectedObjectInfo.ry).toFixed(2));
        setInputRz(radToDeg(selectedObjectInfo.rz).toFixed(2));
        const s = (selectedObjectInfo.sx + selectedObjectInfo.sy + selectedObjectInfo.sz) / 3;
        setInputScale(s.toFixed(2));
      } else {
        setInputX('0');
        setInputY('0');
        setInputZ('0');
        setInputRx('0');
        setInputRy('0');
        setInputRz('0');
        setInputScale('1');
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
        setRotationRef,
        setScaleRef,
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

  const handleRotationSubmit = () => {
    const rx = parseFloat(inputRx);
    const ry = parseFloat(inputRy);
    const rz = parseFloat(inputRz);
    if (Number.isFinite(rx) && Number.isFinite(ry) && Number.isFinite(rz)) {
      setRotationRef.current?.(degToRad(rx), degToRad(ry), degToRad(rz));
    }
    setInputFocused(null);
  };

  const handleScaleSubmit = () => {
    const s = parseFloat(inputScale);
    if (Number.isFinite(s)) {
      setScaleRef.current?.(s, s, s);
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
            flexDirection: 'column',
            gap: 6,
            color: '#fff',
            textShadow: '0 0 4px #000',
            fontSize: 12,
            fontFamily: 'monospace',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 120, flexShrink: 0 }}>Scale:</span>
            <label htmlFor="pf-sx">x=</label>
            <input
              id="pf-sx"
              type="text"
              value={inputScale}
              onChange={(e) => setInputScale(e.target.value)}
              onFocus={() => setInputFocused('scale')}
              onBlur={() => setInputFocused(null)}
              onKeyDown={(e) => e.key === 'Enter' && handleScaleSubmit()}
              style={inputStyle}
            />
            <label htmlFor="pf-sy">y=</label>
            <input
              id="pf-sy"
              type="text"
              value={inputScale}
              onChange={(e) => setInputScale(e.target.value)}
              onFocus={() => setInputFocused('scale')}
              onBlur={() => setInputFocused(null)}
              onKeyDown={(e) => e.key === 'Enter' && handleScaleSubmit()}
              style={inputStyle}
            />
            <label htmlFor="pf-sz">z=</label>
            <input
              id="pf-sz"
              type="text"
              value={inputScale}
              onChange={(e) => setInputScale(e.target.value)}
              onFocus={() => setInputFocused('scale')}
              onBlur={() => setInputFocused(null)}
              onKeyDown={(e) => e.key === 'Enter' && handleScaleSubmit()}
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 120, flexShrink: 0 }}>Rotation:</span>
            <label htmlFor="pf-rx">x=</label>
            <input
              id="pf-rx"
              type="text"
              value={inputRx}
              onChange={(e) => setInputRx(e.target.value)}
              onFocus={() => setInputFocused('rx')}
              onBlur={() => setInputFocused(null)}
              onKeyDown={(e) => e.key === 'Enter' && handleRotationSubmit()}
              style={inputStyle}
            />
            <label htmlFor="pf-ry">y=</label>
            <input
              id="pf-ry"
              type="text"
              value={inputRy}
              onChange={(e) => setInputRy(e.target.value)}
              onFocus={() => setInputFocused('ry')}
              onBlur={() => setInputFocused(null)}
              onKeyDown={(e) => e.key === 'Enter' && handleRotationSubmit()}
              style={inputStyle}
            />
            <label htmlFor="pf-rz">z=</label>
            <input
              id="pf-rz"
              type="text"
              value={inputRz}
              onChange={(e) => setInputRz(e.target.value)}
              onFocus={() => setInputFocused('rz')}
              onBlur={() => setInputFocused(null)}
              onKeyDown={(e) => e.key === 'Enter' && handleRotationSubmit()}
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span id="pf-id" style={{ width: 120, flexShrink: 0 }}>
              Selected Object id= {selectedObjectInfo ? selectedObjectInfo.id : 'none'}
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
