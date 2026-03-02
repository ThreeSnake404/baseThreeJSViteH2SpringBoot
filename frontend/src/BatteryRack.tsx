import { useEffect, useRef } from 'react';
import type { BatteryApi } from './three/Scene';

export type BatteryRackProps = {
  /** Unique rack id (e.g. pad id). Rack id will be "battery-rack-{id}". */
  id: string;
  apiRef: React.RefObject<BatteryApi | null>;
  position?: [number, number, number];
  /** Initial charge 0–100 for each of the 4 batteries (left to right). */
  initialCharges?: [number, number, number, number];
  /** 'hrack' = horizontal rack, 'vrack' = vertical rack */
  orientation?: 'hrack' | 'vrack';
};

/**
 * Single rack: rounded-rectangle panel with emissive white border and four batteries
 * (battery-1 … battery-4). hrack = horizontal layout, vrack = vertical layout.
 */
export function BatteryRack({
  id,
  apiRef,
  position,
  initialCharges = [100, 100, 100, 100],
  orientation = 'hrack',
}: BatteryRackProps) {
  const rackId = `battery-rack-${id}`;
  const createdRef = useRef(false);

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
      api.createBatteryRack(rackId, position, [...initialCharges], orientation);
      createdRef.current = true;
    };
    tryCreate();
    return () => {
      cancelled = true;
      if (timeoutId != null) clearTimeout(timeoutId);
      if (createdRef.current) {
        apiRef.current?.removeBatteryRack(rackId);
        createdRef.current = false;
      }
    };
  }, [rackId, apiRef, position?.[0], position?.[1], position?.[2], orientation, id]);

  return null;
}
