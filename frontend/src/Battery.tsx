import { useEffect, useRef, useState } from 'react';
import type { BatteryApi } from './three/Scene';

export type BatteryProps = {
  id: string;
  /** When provided, charge is controlled by parent; otherwise use initialCharge and internal state. */
  charge?: number;
  initialCharge?: number;
  apiRef: React.RefObject<BatteryApi | null>;
  position?: [number, number, number];
};

/**
 * Single battery: 10 stacked planes in the 3D scene with independent charge state.
 * Charge 0–100: filled from bottom (green); empty (red) blinks every 3s when 0.
 */
export function Battery({ id, charge: controlledCharge, initialCharge = 100, apiRef, position }: BatteryProps) {
  const [internalCharge, setInternalCharge] = useState(() =>
    Math.max(0, Math.min(100, initialCharge))
  );
  const createdRef = useRef(false);
  const charge = controlledCharge !== undefined ? controlledCharge : internalCharge;

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const tryCreate = () => {
      if (cancelled) return;
      const api = apiRef.current;
      if (!api) {
        timeoutId = setTimeout(tryCreate, 50);
        return;
      }
      api.createBattery(id, position);
      createdRef.current = true;
      api.setBatteryCharge(id, charge);
    };
    tryCreate();
    return () => {
      cancelled = true;
      if (timeoutId != null) clearTimeout(timeoutId);
      if (createdRef.current) {
        apiRef.current?.removeBattery(id);
        createdRef.current = false;
      }
    };
  }, [id, apiRef, position?.[0], position?.[1], position?.[2]]);

  useEffect(() => {
    if (!createdRef.current) return;
    apiRef.current?.setBatteryCharge(id, charge);
  }, [id, charge, apiRef]);

  return null;
}
