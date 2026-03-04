import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import {
  Scene,
  type SelectedObjectInfo,
  type CameraInfo,
  type CameraParams,
  type HoverInfo,
  type RoutingApi,
} from './three/Scene';
import { BatteryRack } from './BatteryRack';
import {
  PAD_CONFIG,
  getDrainableFacilityBatteries,
} from './padConfig';

const API_BASE = '';

const MIN_WINDOW_WIDTH = 1157;
const MIN_WINDOW_HEIGHT = 587;
const CARDS_COLUMN_WIDTH = 316;
const TEXT_PANEL_WIDTH = 278;
const LOCATION_COOLDOWN_MS = 10 * 60 * 1000;

const FACILITY_DISPLAY_NAMES: Record<string, string> = {
  GreenHouse1: 'Green House 1',
  GreenHouse2: 'Green House 2',
  IceMine1: 'Ice Mine 1',
  IceMine2: 'Ice Mine 2',
  ChargingStation: 'Charging Station',
};

const LOCATION_DESCRIPTIONS: Array<{ key: string; match: (label: string) => boolean; text: string }> = [
  {
    key: 'greenhouse',
    match: (l) => /green\s*house/i.test(l),
    text: 'The Green House is a pressurized horticultural module that grows food crops and oxygen-producing plants under artificial lighting. It requires a continuous supply of charged batteries to maintain its climate control systems and grow lights. Without power, temperatures drop rapidly and crops fail within hours.',
  },
  {
    key: 'icemine1',
    match: (l) => /ice\s*mine\s*1/i.test(l) || /IceMine1/i.test(l),
    text: 'Ice Mine 1 is the primary water ice extraction facility on the eastern side of the base. Its deep bore drills penetrate several meters into the permanently shadowed regolith to reach ice deposits. The melt and electrolysis systems run continuously, supplying the base with drinking water and propellant feedstock.',
  },
  {
    key: 'icemine2',
    match: (l) => /ice\s*mine\s*2/i.test(l) || /IceMine2/i.test(l),
    text: 'Ice Mine 2 is the secondary ice extraction facility on the western approach. It was brought online to meet increasing demand as the base expanded. Its shallower deposits require more lateral drilling but produce a consistent yield. Keeping its battery racks charged is critical to maintaining overall base water reserves.',
  },
  {
    key: 'vehiclebay',
    match: (l) => /vehicle\s*bay/i.test(l),
    text: 'The Vehicle Bay is the maintenance and storage facility for all surface transport vehicles, including the bugs. Technicians here perform inspections, replace worn parts, and prepare vehicles for their next mission. It is the hub of all surface operations and the last stop before a bug heads out on a run.',
  },
  {
    key: 'chargingstation',
    match: (l) => /charging\s*station/i.test(l),
    text: 'The Charging Station charges drained batteries that are transferred to it. Just bring drained batteries to it with a bug and they will be quickly charged, so you can return them to an empty slot at a location that needs them.',
  },
  {
    key: 'regolith',
    match: (l) => /^regolith$/i.test(l),
    text: "WARNING: Regolith is loose, abrasive lunar surface material. Driving on it will significantly reduce your bug's speed and accelerate wheel wear. Prolonged exposure to regolith terrain can degrade traction systems and shorten vehicle service intervals. Stick to paved surfaces wherever possible.",
  },
  {
    key: 'shinyblue',
    match: (l) => /shiny\s*blue/i.test(l),
    text: 'ShinyBlue is an advanced surface treatment technology that bonds a smooth, electrostatically charged layer to the lunar ground, repelling fine dust particles and eliminating surface drag. Bug vehicles travelling on ShinyBlue surfaces achieve maximum speed and experience virtually zero wheel wear. All primary transit corridors are paved with ShinyBlue.',
  },
  {
    key: 'rimwall',
    match: (l) => /rim\s*wall/i.test(l),
    text: 'DANGER: The Rim Wall is the sheer inner face of the crater that surrounds this base. It cannot be crossed except through one of the three designated tunnels cut into the rock. Attempting to route a bug through the wall at any other point will cause the route to fail. Always plan your paths through a tunnel when crossing the perimeter.',
  },
];

type CrewId = 'bowman' | 'poole' | 'kimball' | 'hal';

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
  const routingApiRef = useRef<RoutingApi | null>(null);
  /** Bugs reserved by THIS page's session (we send the clear messages for these). */
  const myRoutingBugsRef = useRef<Set<string>>(new Set());
  const [hoverInfo, setHoverInfo] = useState<HoverInfo>(null);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const simulationStartTimeRef = useRef<number>(0);
  /** Which crew member THIS page has successfully registered as (null = none). */
  const [myCrewId, setMyCrewId] = useState<CrewId | null>(null);
  /** Ref kept in sync with myCrewId so async ping-timeout callbacks read fresh value. */
  const myCrewIdRef = useRef<CrewId | null>(null);
  myCrewIdRef.current = myCrewId;
  /** Set of crew IDs that currently have an active session (from server broadcasts). */
  const [activeCrewIds, setActiveCrewIds] = useState<Set<CrewId>>(new Set());
  /** Client-side ping timeout: fires if no ping arrives within 15 seconds. */
  const pingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Ref to always-fresh WS message handler (updated each render to avoid stale closures). */
  const wsMessageHandlerRef = useRef<(data: string) => void>(() => {});
  const [messageText, setMessageText] = useState('');
  const typewriterQueueRef = useRef('Welcome to the Artemis Virtual Training Academy. You have been selected to train with this simulation to become familiar with the Lunar output operations.\n\nTo begin, select an astronaut by clicking their image button on the left panel. The simulation will start automatically once at least one crew member is logged in.');
  const typewriterIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const textScrollRef = useRef<HTMLDivElement>(null);

  const enqueueMessage = useCallback((text: string) => {
    typewriterQueueRef.current += text;
  }, []);

  useEffect(() => {
    // 170 words/minute ≈ 1020 chars/minute = 1 char every 59ms
    typewriterIntervalRef.current = setInterval(() => {
      if (typewriterQueueRef.current.length === 0) return;
      const chunk = typewriterQueueRef.current.slice(0, 1);
      typewriterQueueRef.current = typewriterQueueRef.current.slice(1);
      setMessageText((prev) => prev + chunk);
    }, 59);
    return () => {
      if (typewriterIntervalRef.current) clearInterval(typewriterIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (textScrollRef.current) {
      textScrollRef.current.scrollTop = textScrollRef.current.scrollHeight;
    }
  }, [messageText]);

  const [manualOn, setManualOn] = useState(false);
  const [missions, setMissions] = useState<Record<CrewId, number>>({ bowman: 0, poole: 0, kimball: 0, hal: 0 });
  const [cellsDelivered, setCellsDelivered] = useState<Record<CrewId, number>>({ bowman: 0, poole: 0, kimball: 0, hal: 0 });
  const [windowSize, setWindowSize] = useState(() =>
    typeof window !== 'undefined' ? { width: window.innerWidth, height: window.innerHeight } : { width: 0, height: 0 }
  );
  const [showSizeWarning, setShowSizeWarning] = useState(() =>
    typeof window !== 'undefined' &&
    (window.innerWidth < MIN_WINDOW_WIDTH || window.innerHeight < MIN_WINDOW_HEIGHT)
  );
  const wasBelowMinRef = useRef(
    typeof window !== 'undefined' &&
      (window.innerWidth < MIN_WINDOW_WIDTH || window.innerHeight < MIN_WINDOW_HEIGHT)
  );
  const relayoutTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setWindowSize({ width: w, height: h });
      if (w >= MIN_WINDOW_WIDTH && h >= MIN_WINDOW_HEIGHT) {
        setShowSizeWarning(false);
      } else {
        setShowSizeWarning(true);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const below = windowSize.width < MIN_WINDOW_WIDTH || windowSize.height < MIN_WINDOW_HEIGHT;
    if (below) {
      wasBelowMinRef.current = true;
      if (relayoutTimeoutRef.current !== null && typeof window !== 'undefined') {
        window.clearTimeout(relayoutTimeoutRef.current);
        relayoutTimeoutRef.current = null;
      }
      return;
    }
    if (!wasBelowMinRef.current || typeof window === 'undefined') return;
    if (relayoutTimeoutRef.current !== null) window.clearTimeout(relayoutTimeoutRef.current);
    relayoutTimeoutRef.current = window.setTimeout(() => {
      window.location.reload();
    }, 500);
    return () => {
      if (relayoutTimeoutRef.current !== null && typeof window !== 'undefined') {
        window.clearTimeout(relayoutTimeoutRef.current);
        relayoutTimeoutRef.current = null;
      }
    };
  }, [windowSize.width, windowSize.height]);
  useEffect(() => {
    if (typeof window !== 'undefined') window.resizeTo(MIN_WINDOW_WIDTH, MIN_WINDOW_HEIGHT);
  }, []);

  const VALID_CREW_IDS = ['bowman', 'poole', 'kimball', 'hal'] as const;
  const CREW_LABELS: Record<CrewId, string> = { bowman: 'Bowman', poole: 'Poole', kimball: 'Kimball', hal: 'HAL 9000' };

  /** Resets (or starts) the 15-second client-side ping watchdog for this page's crew. */
  const resetPingTimer = useCallback((crewId: CrewId) => {
    if (pingTimerRef.current) clearTimeout(pingTimerRef.current);
    pingTimerRef.current = setTimeout(() => {
      // No ping received in 15 s — server must be gone or connection lost.
      const id = myCrewIdRef.current;
      setMyCrewId(null);
      setActiveCrewIds((prev) => { const n = new Set(prev); if (id) n.delete(id); return n; });
      if (id) enqueueMessage(`\n\nWARNING: Lost server connection. ${CREW_LABELS[id]} is now No Signal.`);
    }, 15_000);
  }, [enqueueMessage]); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep wsMessageHandlerRef.current fresh on every render so it always closes over current state.
  useEffect(() => {
    wsMessageHandlerRef.current = (data: string) => {
      try {
        const msg = JSON.parse(data) as Record<string, unknown>;
        const type = msg.type as string;

        if (type === 'crew_register_response') {
          const cid = msg.crewId as CrewId;
          if (msg.status === 'ok') {
            setMyCrewId(cid);
            setActiveCrewIds((prev) => new Set([...prev, cid]));
            resetPingTimer(cid);
            enqueueMessage(`\n\n${CREW_LABELS[cid] ?? cid} logged in. Simulation will begin shortly.`);
            // Auto-start simulation on first crew login
            setSimulationRunning((r) => { if (!r) simulationStartTimeRef.current = Date.now(); return true; });
          } else if (msg.status === 'already_taken') {
            enqueueMessage('\n\nWARNING: Someone is already logged in as that user. Try a different astronaut.');
          }

        } else if (type === 'crew_ping') {
          const cid = msg.crewId as CrewId;
          // Only handle ping meant for this page's crew.
          if (cid === myCrewIdRef.current) {
            resetPingTimer(cid);
            wsRef.current?.send(JSON.stringify({ type: 'crew_ping_ack', guid: msg.guid, crewId: cid }));
          }

        } else if (type === 'crew_status_broadcast') {
          const active = new Set<CrewId>(
            (msg.active as string[]).filter((id): id is CrewId => (VALID_CREW_IDS as readonly string[]).includes(id))
          );
          setActiveCrewIds(active);

        } else if (type === 'crew_logged_out') {
          const cid = msg.crewId as CrewId;
          if (cid === myCrewIdRef.current) {
            if (pingTimerRef.current) clearTimeout(pingTimerRef.current);
            setMyCrewId(null);
            enqueueMessage(`\n\nWARNING: ${CREW_LABELS[cid] ?? cid} session timed out and has been logged out.`);
          }

        // ── Bug routing ──────────────────────────────────────────────────────
        } else if (type === 'RoutingRequestGranted') {
          const bugN   = msg.bugN as string;
          const guid   = msg.guid as string;
          const crewId = msg.crewId as string;
          if (guid === guidRef.current) myRoutingBugsRef.current.add(bugN);
          routingApiRef.current?.receiveRoutingGranted(bugN, crewId, guid);

        } else if (type === 'AlreadyReserved') {
          const bugN = msg.bugN as string;
          enqueueMessage(`\n\nWARNING: ${bugN} is already being routed.`);

        } else if (type === 'RoutingLimitExceeded') {
          enqueueMessage('\n\nWARNING: A single user can only route (2) bugs at once.');

        } else if (type === 'ResponseToPlaceWaypoint') {
          routingApiRef.current?.receiveWaypoint(
            msg.bugN as string,
            Number(msg.x), Number(msg.y), Number(msg.z),
            msg.terminal === true || msg.terminal === 'true',
            msg.crewId as string,
          );

        } else if (type === 'ResponseToClearWaypoint') {
          routingApiRef.current?.receiveClearWaypoint(msg.bugN as string);

        } else if (type === 'ResponseToClearTerminalWaypoint') {
          const bugN = msg.bugN as string;
          myRoutingBugsRef.current.delete(bugN);
          routingApiRef.current?.receiveClearTerminalWaypoint(bugN);

        } else if (type === 'BugReservationReleased') {
          const bugN = msg.bugN as string;
          myRoutingBugsRef.current.delete(bugN);
          const rx = msg.x != null ? Number(msg.x) : undefined;
          const rz = msg.z != null ? Number(msg.z) : undefined;
          routingApiRef.current?.receiveBugReleased(bugN, rx, rz);

        } else if (type === 'RouteStateSync') {
          // Full route-state snapshot sent to this client when it first connects.
          const waypoints = (msg.waypoints as Array<{ x: number; y: number; z: number; terminal: boolean }>) ?? [];
          const syncGuid = msg.guid as string;
          if (syncGuid === guidRef.current) myRoutingBugsRef.current.add(msg.bugN as string);
          routingApiRef.current?.receiveRouteStateSync(
            msg.bugN    as string,
            Number(msg.currentX),
            Number(msg.currentY),
            Number(msg.currentZ),
            msg.crewId  as string,
            syncGuid,
            waypoints,
          );
        }
      } catch {
        // not JSON — ignore
      }
    };
  }); // no deps — always fresh

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

  const locationLastShownRef = useRef<Map<string, number>>(new Map());
  const isRoutingRef = useRef(false);

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
        onRoutingChange: (isRouting) => { isRoutingRef.current = isRouting; },
        onRimWallBlock: () => {
          enqueueMessage('\n\nWARNING: You cannot create a route across the Rim Wall unless it is through a tunnel.');
        },
        onBugReserveRequest: (bugN, x, y, z) => {
          const ws = wsRef.current;
          if (!ws || ws.readyState !== WebSocket.OPEN) return;
          ws.send(JSON.stringify({ type: 'ReserveBug', guid: guidRef.current, crewId: myCrewIdRef.current ?? 'observer', bugN, x, y, z }));
        },
        onWaypointPlaceRequest: (bugN, x, y, z, terminal) => {
          const ws = wsRef.current;
          if (!ws || ws.readyState !== WebSocket.OPEN) return;
          ws.send(JSON.stringify({ type: 'RequestToPlaceWaypoint', guid: guidRef.current, crewId: myCrewIdRef.current ?? 'observer', bugN, x, y, z, terminal }));
        },
        onWaypointCleared: (bugN, terminal) => {
          const ws = wsRef.current;
          if (!ws || ws.readyState !== WebSocket.OPEN) return;
          if (terminal) {
            ws.send(JSON.stringify({ type: 'RequestToClearTerminalWaypoint', guid: guidRef.current, bugN }));
          } else {
            ws.send(JSON.stringify({ type: 'RequestToClearWaypoint', guid: guidRef.current, bugN }));
          }
        },
        onRouteCancelled: (bugN, x, y, z) => {
          const ws = wsRef.current;
          if (!ws || ws.readyState !== WebSocket.OPEN) return;
          ws.send(JSON.stringify({ type: 'CancelBugRoute', guid: guidRef.current, bugN, x, y, z }));
          myRoutingBugsRef.current.delete(bugN);
        },
        pageGuid: guidRef.current,
        routingApiRef,
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
      ws.onmessage = (e) => wsMessageHandlerRef.current(e.data as string);
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

  const drainableFacilities = useMemo(() => getDrainableFacilityBatteries(), []);
  const BATTERY_DRAIN_SEC = 30;
  const DRAINED_THRESHOLD = 1;

  const failedFacilitiesRef = useRef<Set<string>>(new Set());
  const gameOverShownRef = useRef(false);
  const userBatteryFillTimesRef = useRef<Map<string, number>>(new Map());
  const simulationRafRef = useRef<number>(0);
  useEffect(() => {
    if (!simulationRunning || !batteryApiRef.current) return;
    simulationStartTimeRef.current = Date.now();
    const tick = () => {
      if (!batteryApiRef.current) return;
      const now = Date.now();
      const elapsed = (now - simulationStartTimeRef.current) / 1000;
      const api = batteryApiRef.current;

      for (const { facilityId, batteryIds } of drainableFacilities) {
        // Once failed, stays failed until Restart
        if (failedFacilitiesRef.current.has(facilityId)) {
          api.setFacilityFailed(facilityId, true);
          continue;
        }

        const currentIndex = Math.floor(elapsed / BATTERY_DRAIN_SEC);
        const chargeCurrent =
          currentIndex < batteryIds.length
            ? Math.max(0, 100 * (1 - (elapsed % BATTERY_DRAIN_SEC) / BATTERY_DRAIN_SEC))
            : 0;

        for (let i = 0; i < batteryIds.length; i++) {
          const id = batteryIds[i];
          const current = api.getBatteryCharge(id);
          if (current !== undefined && current < 0) {
            // Battery is an empty slot — remove stale fill-time tracking
            userBatteryFillTimesRef.current.delete(id);
            continue;
          }
          if (api.isBatteryUserFilled(id)) {
            // User-transferred battery: drain independently based on when it was placed
            if (!userBatteryFillTimesRef.current.has(id)) {
              userBatteryFillTimesRef.current.set(id, now);
            }
            const age = (now - userBatteryFillTimesRef.current.get(id)!) / 1000;
            const c = Math.max(0, 100 * (1 - age / BATTERY_DRAIN_SEC));
            api.setBatteryCharge(id, c);
            continue;
          }
          const c = i < currentIndex ? 0 : i === currentIndex ? chargeCurrent : 100;
          api.setBatteryCharge(id, c);
        }

        // Skip failure checks for the first 5 seconds — batteries are still initializing
        if (elapsed < 5) continue;

        // Only check failure once batteries have actually been created
        const anyExists = batteryIds.some((id) => api.getBatteryCharge(id) !== undefined);
        if (!anyExists) continue;

        // Failure based on actual battery state, not time
        const anyCharged = batteryIds.some((id) => {
          const charge = api.getBatteryCharge(id);
          if (charge === undefined || charge < 0) return false;
          return charge > DRAINED_THRESHOLD;
        });

        if (!anyCharged) {
          failedFacilitiesRef.current.add(facilityId);
          api.setFacilityFailed(facilityId, true);
          const displayName = FACILITY_DISPLAY_NAMES[facilityId] ?? facilityId;
          enqueueMessage(`\n\nDANGER: You have just lost ${displayName} because of zero batteries available. This facility cannot be restored until the simulation is restarted.`);
        }
      }

      // Check if all drainable facilities are now failed
      if (!gameOverShownRef.current &&
          drainableFacilities.every(({ facilityId }) => failedFacilitiesRef.current.has(facilityId))) {
        gameOverShownRef.current = true;
        enqueueMessage('\n\nDANGER: You have lost food, air, and water facilities. This ends the simulation. Press Restart to begin again.');
      }

      simulationRafRef.current = requestAnimationFrame(tick);
    };
    simulationRafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(simulationRafRef.current);
  }, [simulationRunning, drainableFacilities, enqueueMessage]);

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
      {showSizeWarning && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 4000,
          }}
        >
          <div
            style={{
              background: '#2a2a2a',
              border: '1px solid #555',
              borderRadius: 8,
              padding: 24,
              maxWidth: 400,
              color: '#eee',
              fontFamily: 'Courier, monospace',
              fontSize: 14,
              boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
            }}
          >
            <p style={{ margin: '0 0 16px' }}>
              This program looks better with a window size of at least {MIN_WINDOW_WIDTH}×{MIN_WINDOW_HEIGHT} pixels.
            </p>
            <p style={{ margin: '0 0 20px' }}>
              Use the button below to open this app in a new window at {MIN_WINDOW_WIDTH}×{MIN_WINDOW_HEIGHT}. You can then close this tab. If you resize this window to at least that size, the display will update automatically.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => {
                  window.open(
                    window.location.href,
                    '_blank',
                    `width=${MIN_WINDOW_WIDTH},height=${MIN_WINDOW_HEIGHT},resizable=yes,scrollbars=yes`
                  );
                }}
                style={{
                  padding: '8px 16px',
                  fontSize: 13,
                  cursor: 'pointer',
                  background: '#444',
                  color: '#eee',
                  border: '1px solid #555',
                  borderRadius: 4,
                }}
              >
                Open in New Window ({MIN_WINDOW_WIDTH}×{MIN_WINDOW_HEIGHT})
              </button>
              <button
                type="button"
                onClick={() => setShowSizeWarning(false)}
                style={{
                  padding: '8px 16px',
                  fontSize: 13,
                  cursor: 'pointer',
                  background: '#444',
                  color: '#eee',
                  border: '1px solid #555',
                  borderRadius: 4,
                }}
              >
                OK (use this window)
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          background: '#000',
        }}
      >
        <div
          style={{
            width: CARDS_COLUMN_WIDTH,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            padding: 12,
            color: '#fff',
            textShadow: '0 0 4px #000',
            fontSize: 14,
            fontFamily: 'Courier, monospace',
            boxSizing: 'border-box',
            background: '#000',
            overflow: 'visible',
            minHeight: 0,
          }}
        >
          {placementFacilityOn && (
            <button
              type="button"
              onClick={() => {
                if (activeCrewIds.size === 0) return;
                simulationStartTimeRef.current = Date.now();
                setSimulationRunning(true);
              }}
              disabled={simulationRunning || activeCrewIds.size === 0}
              title={activeCrewIds.size === 0 ? 'At least one astronaut must be logged in to start the simulation' : undefined}
              style={{
                padding: '4px 10px',
                fontSize: 12,
                borderRadius: 4,
                border: '1px solid #555',
                background: simulationRunning ? '#333' : activeCrewIds.size === 0 ? '#222' : '#444',
                color: activeCrewIds.size === 0 ? '#666' : '#eee',
                cursor: simulationRunning || activeCrewIds.size === 0 ? 'default' : 'pointer',
              }}
            >
              {simulationRunning ? 'Simulation running…' : activeCrewIds.size === 0 ? 'Awaiting crew login…' : 'Start simulation'}
            </button>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {(
        [
          { id: 'bowman' as CrewId, src: '/models/RedHelmetBR.png', alt: 'Bowman', label: 'Bowman' },
          { id: 'poole' as CrewId, src: '/models/YellowHelmetBR.png', alt: 'Poole', label: 'Poole' },
          { id: 'kimball' as CrewId, src: '/models/BlueHelmetBR.png', alt: 'Kimball', label: 'Kimball' },
          { id: 'hal' as CrewId, src: '/models/EyeShot.png', alt: 'HAL 9000', label: 'HAL 9000' },
        ] as const
      ).map(({ id, src, alt, label }) => {
        const connected = activeCrewIds.has(id);
        const selected = myCrewId === id;
        return (
          <div
            key={id}
            style={{
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid #555',
              borderRadius: 6,
              padding: 8,
              width: '100%',
              minWidth: CARDS_COLUMN_WIDTH - 24,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              gap: 12,
              alignItems: 'flex-start',
              fontFamily: 'Courier, monospace',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => {
                  const ws = wsRef.current;
                  if (!ws || ws.readyState !== WebSocket.OPEN) {
                    enqueueMessage('\n\nWARNING: Not connected to server. Please wait and try again.');
                    return;
                  }
                  ws.send(JSON.stringify({ type: 'crew_register', guid: guidRef.current, crewId: id }));
                }}
                style={{
                  padding: 4,
                  borderRadius: 4,
                  border: '1px solid #888',
                  background: selected ? '#666' : '#222',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={src}
                  alt={alt}
                  style={{ width: 64, height: 64, display: 'block' }}
                />
              </button>
              <span
                style={{
                  marginTop: 4,
                  fontSize: 11,
                  color: connected ? '#0f0' : '#c00',
                  fontWeight: connected ? 600 : 400,
                }}
              >
                {connected ? '● Connected' : '○ No Signal'}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{label}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap' }}>Number of Missions:</span>
                <input
                  type="text"
                  readOnly
                  value={missions[id]}
                  style={{
                    width: 36,
                    flexShrink: 0,
                    padding: '2px 4px',
                    fontSize: 12,
                    background: '#222',
                    color: '#eee',
                    border: '1px solid #444',
                    borderRadius: 2,
                    textAlign: 'right',
                    fontFamily: 'Courier, monospace',
                  }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                <span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap' }}>Most Cells Delivered:</span>
                <input
                  type="text"
                  readOnly
                  value={cellsDelivered[id]}
                  style={{
                    width: 36,
                    flexShrink: 0,
                    padding: '2px 4px',
                    fontSize: 12,
                    background: '#222',
                    color: '#eee',
                    border: '1px solid #444',
                    borderRadius: 2,
                    textAlign: 'right',
                    fontFamily: 'Courier, monospace',
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
          </div>
          <div
            style={{
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid #555',
              borderRadius: 6,
              padding: 8,
              boxSizing: 'border-box',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
              {(['high', 'med', 'low'] as const).map((level) => {
                const label = level === 'high' ? 'High' : level === 'med' ? 'Medium' : 'Low';
                const onClick =
                  level === 'high'
                    ? () => { setZoomLevel('high'); applyZoom(1); }
                    : level === 'med'
                    ? () => { setZoomLevel('med'); applyZoom(1 / 2); }
                    : () => { setZoomLevel('low'); applyZoom(1 / 4); };
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
              <button
                type="button"
                onClick={() => setManualOn((v) => !v)}
                style={{
                  padding: '4px 10px',
                  fontSize: 12,
                  borderRadius: 4,
                  border: '1px solid #555',
                  background: manualOn ? '#666' : '#444',
                  color: '#eee',
                  cursor: 'pointer',
                }}
              >
                Manual
              </button>
            </div>
          </div>
          <div
            style={{
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid #555',
              borderRadius: 6,
              padding: 8,
              boxSizing: 'border-box',
              width: '100%',
            }}
          >
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCommandSubmit()}
              placeholder="Command (e.g. PF=on)"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '6px 10px',
                fontSize: 13,
                background: '#222',
                color: '#eee',
                border: '1px solid #444',
                borderRadius: 4,
              }}
            />
          </div>
        </div>
        <div
          style={{
            flex: '1 1 0',
            minWidth: 0,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 0,
          }}
          onClick={() => {
            if (isRoutingRef.current) return;
            if (!hoverInfo?.label) return;
            const normalized = hoverInfo.label.split('\n')[0].trim();
            const entry = LOCATION_DESCRIPTIONS.find((d) => d.match(normalized));
            if (!entry) return;
            const clickNow = Date.now();
            const lastShown = locationLastShownRef.current.get(entry.key) ?? 0;
            if (clickNow - lastShown < LOCATION_COOLDOWN_MS) return;
            locationLastShownRef.current.set(entry.key, clickNow);
            enqueueMessage('\n\n' + entry.text);
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              minHeight: 0,
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
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
          ref={(el) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const canvasRight = window.innerWidth - TEXT_PANEL_WIDTH;
            if (rect.right > canvasRight) {
              el.style.left = `${hoverInfo.screenX - rect.width - 12}px`;
            }
            if (rect.bottom > window.innerHeight) {
              el.style.top = `${hoverInfo.screenY - rect.height - 12}px`;
            }
          }}
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
            whiteSpace: 'pre-line',
          }}
        >
          {hoverInfo.label}
        </div>
      )}
      </div>
        <div
          style={{
            flex: '0 0 auto',
            width: TEXT_PANEL_WIDTH,
            position: 'relative',
            zIndex: 1,
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            padding: 12,
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid #555',
              borderRadius: 6,
              overflow: 'hidden',
              background: '#000',
            }}
          >
            <div
              ref={textScrollRef}
              className="terminal-scroll"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: 12,
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontFamily: 'Courier, monospace',
                color: '#00ff00',
                fontSize: 12,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {messageText.split(/(WARNING|DANGER)/g).map((part, i) =>
                part === 'WARNING' ? (
                  <span key={i} style={{ color: '#ff8c00' }}>{part}</span>
                ) : part === 'DANGER' ? (
                  <span key={i} style={{ color: '#ff2020' }}>{part}</span>
                ) : (
                  part
                )
              )}
            </div>
            <div style={{ padding: 8, borderTop: '1px solid #555', display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  typewriterQueueRef.current = '\nDisplay cleared. System ready.';
                  setMessageText('');
                }}
                style={{
                  padding: '6px 12px',
                  fontSize: 12,
                  cursor: 'pointer',
                  background: '#444',
                  color: '#eee',
                  border: '1px solid #555',
                  borderRadius: 4,
                  fontFamily: 'Courier, monospace',
                }}
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!batteryApiRef.current) return;
                  batteryApiRef.current.resetSimulation();
                  failedFacilitiesRef.current.clear();
                  gameOverShownRef.current = false;
                  userBatteryFillTimesRef.current.clear();
                  simulationStartTimeRef.current = Date.now();
                  typewriterQueueRef.current = '\nSimulation restarted. All systems nominal.';
                  setMessageText('');
                }}
                style={{
                  padding: '6px 12px',
                  fontSize: 12,
                  cursor: 'pointer',
                  border: '1px solid #555',
                  borderRadius: 4,
                  background: '#444',
                  color: '#eee',
                  fontFamily: 'Courier, monospace',
                }}
              >
                Restart
              </button>
              <button
                type="button"
                onClick={openH2Console}
                title="Open H2 console (JDBC URL: jdbc:h2:file:./data/pocdb, User: sa, Password: empty)"
                style={{
                  padding: '6px 12px',
                  fontSize: 12,
                  cursor: 'pointer',
                  border: '1px solid #555',
                  borderRadius: 4,
                  background: '#444',
                  color: '#eee',
                  fontFamily: 'Courier, monospace',
                }}
              >
                DB
              </button>
            </div>
          </div>
        </div>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 88, flexShrink: 0 }}>Screen</span>
            <span style={{ flex: 1 }}>{windowSize.width} × {windowSize.height}</span>
          </div>
        </div>
      )}
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
    </>
  );
}

export default App;
