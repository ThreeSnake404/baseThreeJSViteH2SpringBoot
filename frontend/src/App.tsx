import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import {
  Scene,
  type SelectedObjectInfo,
  type CameraInfo,
  type CameraParams,
  type HoverInfo,
} from './three/Scene';
import { BatteryRack } from './BatteryRack';
import {
  PAD_CONFIG,
  getAllBatteriesInOrder,
} from './padConfig';

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
  const [camPosX, setCamPosX] = useState('0');
  const [camPosY, setCamPosY] = useState('0');
  const [camPosZ, setCamPosZ] = useState('5');
  const [camTgtX, setCamTgtX] = useState('0');
  const [camTgtY, setCamTgtY] = useState('0');
  const [camTgtZ, setCamTgtZ] = useState('0');
  const [camProjection, setCamProjection] = useState<'Perspective' | 'Orthographic'>('Perspective');
  const [camFov, setCamFov] = useState('50');
  const [camNear, setCamNear] = useState('0.1');
  const [camFar, setCamFar] = useState('1000');
  const cameraInputFocusedRef = useRef(false);
  const initialCameraDistanceRef = useRef<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<'high' | 'med' | 'low'>('high');
  const pfEnabledRef = useRef(false);
  const setPositionRef = useRef<((x: number, y: number, z: number) => void) | null>(null);
  const setRotationRef = useRef<((rx: number, ry: number, rz: number) => void) | null>(null);
  const setScaleRef = useRef<((sx: number, sy: number, sz: number) => void) | null>(null);
  const setCameraRef = useRef<((params: CameraParams) => void) | null>(null);
  const batteryApiRef = useRef<import('./three/Scene').BatteryApi | null>(null);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo>(null);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const simulationStartTimeRef = useRef<number>(0);
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

  const onCameraChange = useCallback((info: CameraInfo) => {
    if (cameraInputFocusedRef.current) return;
    setCamPosX(info.position.x.toFixed(3));
    setCamPosY(info.position.y.toFixed(3));
    setCamPosZ(info.position.z.toFixed(3));
    setCamTgtX(info.target.x.toFixed(3));
    setCamTgtY(info.target.y.toFixed(3));
    setCamTgtZ(info.target.z.toFixed(3));
    setCamProjection(info.projection);
    setCamFov(info.fov.toFixed(2));
    setCamNear(info.near.toString());
    setCamFar(info.far.toString());
    const dx = info.position.x - info.target.x;
    const dy = info.position.y - info.target.y;
    const dz = info.position.z - info.target.z;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (!initialCameraDistanceRef.current && dist > 0) {
      initialCameraDistanceRef.current = dist;
    }
  }, []);

  const onHoverInfoChange = useCallback((info: HoverInfo) => {
    setHoverInfo(info);
  }, []);

  const applyZoom = (multiplier: number) => {
    const base = initialCameraDistanceRef.current;
    if (!base || !setCameraRef.current) return;
    const px = parseFloat(camPosX);
    const py = parseFloat(camPosY);
    const pz = parseFloat(camPosZ);
    const tx = parseFloat(camTgtX);
    const ty = parseFloat(camTgtY);
    const tz = parseFloat(camTgtZ);
    if (
      !Number.isFinite(px) ||
      !Number.isFinite(py) ||
      !Number.isFinite(pz) ||
      !Number.isFinite(tx) ||
      !Number.isFinite(ty) ||
      !Number.isFinite(tz)
    ) {
      return;
    }
    const dx = px - tx;
    const dy = py - ty;
    const dz = pz - tz;
    const len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
    const newDist = base * multiplier;
    const scale = newDist / len;
    const nx = tx + dx * scale;
    const ny = ty + dy * scale;
    const nz = tz + dz * scale;
    setCameraRef.current?.({
      position: [nx, ny, nz],
      target: [tx, ty, tz],
    });
    batteryApiRef.current?.refreshBatteryMaterials?.();
  };

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
        onCameraChange,
        onHoverInfoChange,
        setPositionRef,
        setRotationRef,
        setScaleRef,
        setCameraRef,
        batteryApiRef,
      }
    );
    scene.start();
    return () => scene.dispose();
  }, [onColorChange, onSelectionChange, onCameraChange, onHoverInfoChange]);

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

  const handleCameraSubmit = () => {
    cameraInputFocusedRef.current = false;
    const px = parseFloat(camPosX);
    const py = parseFloat(camPosY);
    const pz = parseFloat(camPosZ);
    const tx = parseFloat(camTgtX);
    const ty = parseFloat(camTgtY);
    const tz = parseFloat(camTgtZ);
    const fov = parseFloat(camFov);
    const near = parseFloat(camNear);
    const far = parseFloat(camFar);
    const params: CameraParams = {};
    if (Number.isFinite(px) && Number.isFinite(py) && Number.isFinite(pz)) params.position = [px, py, pz];
    if (Number.isFinite(tx) && Number.isFinite(ty) && Number.isFinite(tz)) params.target = [tx, ty, tz];
    if (Number.isFinite(fov)) params.fov = fov;
    if (Number.isFinite(near)) params.near = near;
    if (Number.isFinite(far)) params.far = far;
    params.projection = camProjection;
    setCameraRef.current?.(params);
  };

  const allBatteriesInOrder = useMemo(() => getAllBatteriesInOrder(), []);
  const BATTERY_DRAIN_SEC = 30;

  // On load: fully charge all batteries, then fully drain GreenHouse2Hrack. Re-run for a few seconds so we catch racks created asynchronously (so 0% and blink apply).
  useEffect(() => {
    const apply = () => {
      const api = batteryApiRef.current;
      if (!api) return;
      for (const pad of PAD_CONFIG) {
        const rackId = `battery-rack-${pad.id}`;
        for (let i = 1; i <= 4; i++) api.setBatteryCharge(`${rackId}-battery-${i}`, 100);
      }
      for (let i = 1; i <= 4; i++) api.setBatteryCharge(`battery-rack-GreenHouse2Hrack-battery-${i}`, 0);
    };
    apply();
    const t = setInterval(apply, 200);
    const stop = setTimeout(() => clearInterval(t), 3000);
    return () => { clearInterval(t); clearTimeout(stop); };
  }, []);

  const simulationRafRef = useRef<number>(0);
  useEffect(() => {
    if (!simulationRunning || !batteryApiRef.current) return;
    simulationStartTimeRef.current = Date.now();
    let lastIndex = -1;
    const tick = () => {
      if (!batteryApiRef.current) return;
      const elapsed = (Date.now() - simulationStartTimeRef.current) / 1000;
      const currentIndex = Math.floor(elapsed / BATTERY_DRAIN_SEC);
      const chargeCurrent =
        currentIndex < allBatteriesInOrder.length
          ? Math.max(0, 100 * (1 - (elapsed % BATTERY_DRAIN_SEC) / BATTERY_DRAIN_SEC))
          : 0;
      for (let i = 0; i < allBatteriesInOrder.length; i++) {
        const c = i < currentIndex ? 0 : i === currentIndex ? chargeCurrent : 100;
        batteryApiRef.current.setBatteryCharge(allBatteriesInOrder[i].batteryId, c);
      }
      if (currentIndex > lastIndex && lastIndex >= 0 && lastIndex < allBatteriesInOrder.length) {
        const { facilityId } = allBatteriesInOrder[lastIndex];
        const nextFacility =
          currentIndex < allBatteriesInOrder.length
            ? allBatteriesInOrder[currentIndex].facilityId
            : null;
        if (nextFacility !== facilityId) {
          batteryApiRef.current.setFacilityFailed(facilityId, true);
        }
      }
      lastIndex = currentIndex;
      if (currentIndex < allBatteriesInOrder.length) {
        simulationRafRef.current = requestAnimationFrame(tick);
      }
    };
    simulationRafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(simulationRafRef.current);
  }, [simulationRunning, allBatteriesInOrder]);

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
      {/* Racks on each pad (hrack/vrack by pad orientation). Batteries represent power per location. */}
      {PAD_CONFIG.map((pad) => (
        <BatteryRack
          key={pad.id}
          id={pad.id}
          apiRef={batteryApiRef}
          position={pad.position}
          orientation={pad.orientation}
          initialCharges={pad.initialCharges}
        />
      ))}
      {hoverInfo && (
        <div
          style={{
            position: 'fixed',
            left: hoverInfo.screenX + 12,
            top: hoverInfo.screenY + 12,
            background: 'rgba(0,0,0,0.85)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: 4,
            fontSize: 11,
            fontFamily: 'monospace',
            pointerEvents: 'none',
            zIndex: 2000,
          }}
        >
          {hoverInfo.label}
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {(['high', 'med', 'low'] as const).map((level) => {
          const label = level === 'high' ? 'High' : level === 'med' ? 'Med' : 'Low';
          const onClick =
            level === 'high'
              ? () => {
                  setZoomLevel('high');
                  applyZoom(1);
                }
              : level === 'med'
              ? () => {
                  setZoomLevel('med');
                  applyZoom(1 / 2);
                }
              : () => {
                  setZoomLevel('low');
                  applyZoom(1 / 4);
                };
          const active = zoomLevel === level;
          return (
            <button
              key={level}
              type="button"
              onClick={onClick}
              style={{
                padding: '4px 10px',
                fontSize: 12,
                borderRadius: 4,
                border: '1px solid #555',
                background: active ? '#666' : '#444',
                color: '#eee',
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          );
        })}
        {placementFacilityOn && (
          <button
            type="button"
            onClick={() => setSimulationRunning(true)}
            disabled={simulationRunning}
            style={{
              padding: '4px 10px',
              fontSize: 12,
              borderRadius: 4,
              border: '1px solid #555',
              background: simulationRunning ? '#333' : '#444',
              color: '#eee',
              cursor: simulationRunning ? 'default' : 'pointer',
              marginTop: 4,
            }}
          >
            {simulationRunning ? 'Simulation running…' : 'Start simulation'}
          </button>
        )}
        <button
          type="button"
          style={{
            padding: '4px 10px',
            fontSize: 12,
            borderRadius: 4,
            border: '1px solid #555',
            background: '#444',
            color: '#eee',
            cursor: 'pointer',
          }}
        >
          Route
        </button>
        <button
          type="button"
          style={{
            padding: '4px 10px',
            fontSize: 12,
            borderRadius: 4,
            border: '1px solid #555',
            background: '#444',
            color: '#eee',
            cursor: 'pointer',
          }}
        >
          Manual
        </button>
      </div>
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
      {placementFacilityOn && (
        <div
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            color: '#fff',
            textShadow: '0 0 4px #000',
            fontSize: 12,
            fontFamily: 'monospace',
            background: 'rgba(0,0,0,0.7)',
            padding: 10,
            borderRadius: 6,
            border: '1px solid #555',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 88, flexShrink: 0 }}>Position:</span>
            <label htmlFor="cam-px">x=</label>
            <input id="cam-px" type="text" value={camPosX} onChange={(e) => setCamPosX(e.target.value)} onFocus={() => { cameraInputFocusedRef.current = true; }} onBlur={() => { cameraInputFocusedRef.current = false; handleCameraSubmit(); }} onKeyDown={(e) => e.key === 'Enter' && handleCameraSubmit()} style={inputStyle} />
            <label htmlFor="cam-py">y=</label>
            <input id="cam-py" type="text" value={camPosY} onChange={(e) => setCamPosY(e.target.value)} onFocus={() => { cameraInputFocusedRef.current = true; }} onBlur={() => { cameraInputFocusedRef.current = false; handleCameraSubmit(); }} onKeyDown={(e) => e.key === 'Enter' && handleCameraSubmit()} style={inputStyle} />
            <label htmlFor="cam-pz">z=</label>
            <input id="cam-pz" type="text" value={camPosZ} onChange={(e) => setCamPosZ(e.target.value)} onFocus={() => { cameraInputFocusedRef.current = true; }} onBlur={() => { cameraInputFocusedRef.current = false; handleCameraSubmit(); }} onKeyDown={(e) => e.key === 'Enter' && handleCameraSubmit()} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 88, flexShrink: 0 }}>Orientation:</span>
            <label htmlFor="cam-tx">x=</label>
            <input id="cam-tx" type="text" value={camTgtX} onChange={(e) => setCamTgtX(e.target.value)} onFocus={() => { cameraInputFocusedRef.current = true; }} onBlur={() => { cameraInputFocusedRef.current = false; handleCameraSubmit(); }} onKeyDown={(e) => e.key === 'Enter' && handleCameraSubmit()} style={inputStyle} />
            <label htmlFor="cam-ty">y=</label>
            <input id="cam-ty" type="text" value={camTgtY} onChange={(e) => setCamTgtY(e.target.value)} onFocus={() => { cameraInputFocusedRef.current = true; }} onBlur={() => { cameraInputFocusedRef.current = false; handleCameraSubmit(); }} onKeyDown={(e) => e.key === 'Enter' && handleCameraSubmit()} style={inputStyle} />
            <label htmlFor="cam-tz">z=</label>
            <input id="cam-tz" type="text" value={camTgtZ} onChange={(e) => setCamTgtZ(e.target.value)} onFocus={() => { cameraInputFocusedRef.current = true; }} onBlur={() => { cameraInputFocusedRef.current = false; handleCameraSubmit(); }} onKeyDown={(e) => e.key === 'Enter' && handleCameraSubmit()} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 88, flexShrink: 0 }}>Perspective:</span>
            <select value={camProjection} onChange={(e) => { setCamProjection(e.target.value as 'Perspective' | 'Orthographic'); setCameraRef.current?.({ projection: e.target.value as 'Perspective' | 'Orthographic' }); }} style={{ ...inputStyle, width: 120 }} onFocus={() => { cameraInputFocusedRef.current = true; }} onBlur={() => { cameraInputFocusedRef.current = false; }}>
              <option value="Perspective">Perspective</option>
              <option value="Orthographic">Orthographic</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 88, flexShrink: 0 }}>fov</span>
            <input type="text" value={camFov} onChange={(e) => setCamFov(e.target.value)} onFocus={() => { cameraInputFocusedRef.current = true; }} onBlur={() => { cameraInputFocusedRef.current = false; handleCameraSubmit(); }} onKeyDown={(e) => e.key === 'Enter' && handleCameraSubmit()} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 88, flexShrink: 0 }}>Near</span>
            <input type="text" value={camNear} onChange={(e) => setCamNear(e.target.value)} onFocus={() => { cameraInputFocusedRef.current = true; }} onBlur={() => { cameraInputFocusedRef.current = false; handleCameraSubmit(); }} onKeyDown={(e) => e.key === 'Enter' && handleCameraSubmit()} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 88, flexShrink: 0 }}>Far</span>
            <input type="text" value={camFar} onChange={(e) => setCamFar(e.target.value)} onFocus={() => { cameraInputFocusedRef.current = true; }} onBlur={() => { cameraInputFocusedRef.current = false; handleCameraSubmit(); }} onKeyDown={(e) => e.key === 'Enter' && handleCameraSubmit()} style={inputStyle} />
          </div>
        </div>
      )}
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
