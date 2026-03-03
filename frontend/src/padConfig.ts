/**
 * Pad and facility config for battery racks (from ShinyPath_04.glb).
 * Each rack has a unique id: {Facility}Hrack or {Facility}Vrack.
 * Rack orientation matches pad: horizontal pad → hrack, vertical pad → vrack.
 * ChargingStation has two horizontal pads → ChargingStationHrack1, ChargingStationHrack2.
 * VehicleBay does not use batteries.
 * IceMine1 = dome with pad at (1.892, -3.338) / (4.231, -0.96) e.g. near bottom-right green sphere. IceMine2 = other dome.
 */

export type RackOrientation = 'hrack' | 'vrack';

export type PadConfig = {
  /** Unique id used as battery-rack-{id}; e.g. IceMine2Vrack, GreenHouse1Hrack. */
  id: string;
  position: [number, number, number];
  orientation: RackOrientation;
  /** Optional initial charge 0–100 per battery; default [100,100,100,100]. */
  initialCharges?: [number, number, number, number];
};

/** All racks with unique ids. Position and orientation per rack. */
export const PAD_CONFIG: PadConfig[] = [
  { id: 'ChargingStationHrack1', position: [9.056, 0.2, -6.632], orientation: 'hrack' },
  { id: 'ChargingStationHrack2', position: [9.056, 0.2, -3.745], orientation: 'hrack' },
  { id: 'GreenHouse1Hrack', position: [8.955, 0.2, 7.272], orientation: 'hrack' },
  { id: 'GreenHouse1Vrack', position: [7.295, 0.2, 8.932], orientation: 'vrack' },
  { id: 'GreenHouse2Hrack', position: [-8.073, 0.2, -6.436], orientation: 'hrack' },
  { id: 'GreenHouse2Vrack', position: [-6.413, 0.2, -8.096], orientation: 'vrack' },
  { id: 'IceMine1Hrack', position: [1.892, 0.2, -3.338], orientation: 'vrack' },
  { id: 'IceMine1Vrack', position: [4.231, 0.2, -0.96], orientation: 'hrack' },
  { id: 'IceMine2Hrack', position: [0.949, 0.2, -0.276], orientation: 'vrack' },
  { id: 'IceMine2Vrack', position: [-0.492, 0.2, 0.986], orientation: 'hrack' },
];

/** Facility id -> list of rack ids (order defines drain order for simulation). */
export const FACILITY_PADS: Record<string, string[]> = {
  ChargingStation: ['ChargingStationHrack1', 'ChargingStationHrack2'],
  GreenHouse1: ['GreenHouse1Hrack', 'GreenHouse1Vrack'],
  GreenHouse2: ['GreenHouse2Hrack', 'GreenHouse2Vrack'],
  IceMine1: ['IceMine1Hrack', 'IceMine1Vrack'],
  IceMine2: ['IceMine2Hrack', 'IceMine2Vrack'],
};

/** Facility id -> [x, y, z] for failure overlay (center of racks, y raised). */
export const FACILITY_CENTERS: Record<string, [number, number, number]> = (() => {
  const out: Record<string, [number, number, number]> = {};
  for (const [facilityId, rackIds] of Object.entries(FACILITY_PADS)) {
    const pads = rackIds.map((rid) => PAD_CONFIG.find((p) => p.id === rid)).filter(Boolean) as PadConfig[];
    if (pads.length === 0) continue;
    const x = pads.reduce((s, p) => s + p.position[0], 0) / pads.length;
    const y = 0.2;
    const z = pads.reduce((s, p) => s + p.position[2], 0) / pads.length;
    out[facilityId] = [x, y, z];
  }
  return out;
})();

/** Facility id -> radius (max distance from center to any rack). Used for failure sphere size. */
export const FACILITY_RADIUS: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  for (const [facilityId, rackIds] of Object.entries(FACILITY_PADS)) {
    const center = FACILITY_CENTERS[facilityId];
    if (!center) continue;
    let maxDist = 0;
    for (const rid of rackIds) {
      const pad = PAD_CONFIG.find((p) => p.id === rid);
      if (!pad) continue;
      const dx = pad.position[0] - center[0];
      const dz = pad.position[2] - center[2];
      const d = Math.sqrt(dx * dx + dz * dz);
      if (d > maxDist) maxDist = d;
    }
    out[facilityId] = Math.max(maxDist, 0.5);
  }
  return out;
})();

/** Uniform radius for all failure spheres (GreenHouse/IceMine) so they appear same size, centered over dome. */
export const FAILURE_SPHERE_UNIFORM_RADIUS = (() => {
  const drainable = ['GreenHouse1', 'GreenHouse2', 'IceMine1', 'IceMine2'];
  let maxR = 1;
  for (const fid of drainable) {
    const r = FACILITY_RADIUS[fid];
    if (r != null && r > maxR) maxR = r;
  }
  return maxR;
})();

/** All batteries in drain order: [facilityId, batteryId][]. Used for simulation. */
export function getAllBatteriesInOrder(): { facilityId: string; batteryId: string }[] {
  const order: { facilityId: string; batteryId: string }[] = [];
  const facilityOrder = Object.keys(FACILITY_PADS);
  for (const facilityId of facilityOrder) {
    const rackIds = FACILITY_PADS[facilityId] ?? [];
    for (const rackId of rackIds) {
      for (let i = 1; i <= 4; i++) {
        order.push({
          facilityId,
          batteryId: `battery-rack-${rackId}-battery-${i}`,
        });
      }
    }
  }
  return order;
}

/** Facilities that drain (excludes ChargingStation). Each facility has batteries in drain order. */
export function getDrainableFacilityBatteries(): { facilityId: string; batteryIds: string[] }[] {
  const out: { facilityId: string; batteryIds: string[] }[] = [];
  for (const [facilityId, rackIds] of Object.entries(FACILITY_PADS)) {
    if (facilityId === 'ChargingStation') continue;
    const batteryIds: string[] = [];
    for (const rackId of rackIds) {
      for (let i = 1; i <= 4; i++) {
        batteryIds.push(`battery-rack-${rackId}-battery-${i}`);
      }
    }
    out.push({ facilityId, batteryIds });
  }
  return out;
}
