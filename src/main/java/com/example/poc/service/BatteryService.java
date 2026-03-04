package com.example.poc.service;

import com.example.poc.entity.Battery;
import com.example.poc.repository.BatteryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

/**
 * Server-authoritative battery lifecycle management.
 *
 * <p>Sequential drain model per facility: batteries drain one at a time in slot order.
 * Battery N (0-indexed) in a facility starts draining DRAIN_RATE_SEC * N seconds after simStart.
 * This gives ~120 s total facility life (4 batteries × 30 s each).
 *
 * <p>On each 1-second tick (called by RawWebSocketHandler), callers use
 * {@link #getLocationBatteries} to build {@code LocationBatteryUpdate} messages and
 * {@link #getFailedFacilities} / {@link #isGameOver} to check failure state.
 */
@Service
public class BatteryService {

    // ── Constants ──────────────────────────────────────────────────────────────

    public static final double DRAIN_RATE_SEC  = 30.0;   // seconds for one battery to fully drain
    public static final double CHARGE_RATE_SEC = 10.0;   // seconds for one battery to fully charge
    public static final double DRAINED_THRESHOLD = 1.0;  // charge ≤ this → considered drained
    public static final int    MAX_BUG_BATTERIES = 9;    // maximum batteries a bug can carry
    public static final double DOCK_THRESHOLD    = 1.5;  // world-units; terminal waypoint proximity to rack

    /** Rack IDs per facility, in drain order within the facility. */
    public static final Map<String, String[]> FACILITY_RACKS = Map.of(
        "GreenHouse1",     new String[]{"GreenHouse1Hrack",      "GreenHouse1Vrack"},
        "GreenHouse2",     new String[]{"GreenHouse2Hrack",      "GreenHouse2Vrack"},
        "IceMine1",        new String[]{"IceMine1Hrack",         "IceMine1Vrack"},
        "IceMine2",        new String[]{"IceMine2Hrack",         "IceMine2Vrack"},
        "ChargingStation", new String[]{"ChargingStationHrack1", "ChargingStationHrack2"}
    );

    /** Facilities that consume batteries (not ChargingStation). */
    public static final String[] DRAINABLE_FACILITIES = {"GreenHouse1", "GreenHouse2", "IceMine1", "IceMine2"};

    /** All rack X/Z positions (matching padConfig.ts PAD_CONFIG, y-coord ignored for proximity). */
    private static final String[] PAD_IDS = {
        "ChargingStationHrack1", "ChargingStationHrack2",
        "GreenHouse1Hrack", "GreenHouse1Vrack",
        "GreenHouse2Hrack", "GreenHouse2Vrack",
        "IceMine1Hrack",    "IceMine1Vrack",
        "IceMine2Hrack",    "IceMine2Vrack",
    };
    private static final double[][] PAD_XZ = {
        { 9.056, -6.632}, { 9.056, -3.745},
        { 8.955,  7.272}, { 7.295,  8.932},
        {-8.073, -6.436}, {-6.413, -8.096},
        { 1.892, -3.338}, { 4.231, -0.960},
        { 0.949, -0.276}, {-0.492,  0.986},
    };

    /** Maps rackId → facilityId. */
    private static final Map<String, String> RACK_TO_FACILITY;
    static {
        Map<String, String> m = new HashMap<>();
        for (Map.Entry<String, String[]> e : FACILITY_RACKS.entrySet())
            for (String rackId : e.getValue())
                m.put(rackId, e.getKey());
        RACK_TO_FACILITY = Map.copyOf(m);
    }

    // ── State ──────────────────────────────────────────────────────────────────

    private final BatteryRepository batteryRepository;

    /** Volatile so the scheduled tick sees it without synchronization overhead. */
    private volatile Instant simulationStartTime = null;

    private final Set<String> failedFacilities = Collections.synchronizedSet(new HashSet<>());
    private volatile boolean  gameOver          = false;

    public BatteryService(BatteryRepository batteryRepository) {
        this.batteryRepository = batteryRepository;
    }

    // ── Simulation lifecycle ──────────────────────────────────────────────────

    /**
     * Creates all batteries in the DB with staggered drain offsets.
     * Safe to call even when the DB already has batteries (they are deleted first).
     */
    @Transactional
    public synchronized void initializeSimulation(Instant simStart) {
        this.simulationStartTime = simStart;
        this.failedFacilities.clear();
        this.gameOver = false;
        batteryRepository.deleteAll();

        // Drainable facilities: staggered drain per facility (independent across facilities)
        for (String facilityId : DRAINABLE_FACILITIES) {
            String[] rackIds = FACILITY_RACKS.get(facilityId);
            int seqIndex = 0; // reset per facility
            for (String rackId : rackIds) {
                for (int slot = 1; slot <= 4; slot++) {
                    Battery b = new Battery(UUID.randomUUID().toString(), "FACILITY_RACK", rackId, slot);
                    // Stagger: battery at seq position i starts draining i * 30 s after simStart
                    b.setDrainStartedAt(simStart.plusSeconds((long)(seqIndex * DRAIN_RATE_SEC)));
                    seqIndex++;
                    batteryRepository.save(b);
                }
            }
        }

        // ChargingStation: start with all batteries fully charged (staticCharge=100, no charging needed)
        for (String rackId : FACILITY_RACKS.get("ChargingStation")) {
            for (int slot = 1; slot <= 4; slot++) {
                Battery b = new Battery(UUID.randomUUID().toString(), "CHARGING_STATION", rackId, slot);
                b.setStaticCharge(100.0);
                batteryRepository.save(b);
            }
        }
    }

    /** Re-initializes batteries from now. Resets failure/game-over state. */
    @Transactional
    public synchronized void resetSimulation() {
        initializeSimulation(Instant.now());
    }

    // ── Charge calculation ────────────────────────────────────────────────────

    /** Compute the current charge (0–100) for a single battery at the given instant. */
    public double computeCharge(Battery b, Instant now) {
        return switch (b.getLocationType()) {
            case "FACILITY_RACK" -> {
                if (b.getDrainStartedAt() == null) yield 100.0;
                double elapsedSec = Duration.between(b.getDrainStartedAt(), now).toMillis() / 1000.0;
                yield Math.max(0.0, 100.0 - elapsedSec * (100.0 / DRAIN_RATE_SEC));
            }
            case "CHARGING_STATION" -> {
                if (b.getChargeStartedAt() != null) {
                    double elapsedSec = Duration.between(b.getChargeStartedAt(), now).toMillis() / 1000.0;
                    yield Math.min(100.0, elapsedSec * (100.0 / CHARGE_RATE_SEC));
                }
                yield b.getStaticCharge() != null ? b.getStaticCharge() : 100.0;
            }
            case "ON_BUG" -> b.getStaticCharge() != null ? b.getStaticCharge() : 0.0;
            default       -> 0.0;
        };
    }

    // ── Location state queries ────────────────────────────────────────────────

    /**
     * Returns the current battery state for every slot (1–4) in a rack.
     * Slots not occupied by any battery have charge=-1 (empty slot).
     */
    public List<SlotInfo> getRackSlots(String rackId, Instant now) {
        List<Battery> batteries = batteryRepository.findByLocationId(rackId);
        // Build a slot map from 1..4
        Map<Integer, Double> slotMap = new HashMap<>();
        for (Battery b : batteries) {
            slotMap.put(b.getSlotIndex(), computeCharge(b, now));
        }
        List<SlotInfo> slots = new ArrayList<>(4);
        for (int i = 1; i <= 4; i++) {
            slots.add(new SlotInfo(i, slotMap.getOrDefault(i, -1.0)));
        }
        return slots;
    }

    /**
     * For a facility, returns a list of rack infos (rackId + slot charges).
     * Empty slots are represented with charge=-1.
     */
    public List<RackInfo> getFacilityState(String facilityId, Instant now) {
        String[] rackIds = FACILITY_RACKS.get(facilityId);
        if (rackIds == null) return List.of();
        List<RackInfo> result = new ArrayList<>();
        for (String rackId : rackIds) {
            result.add(new RackInfo(rackId, getRackSlots(rackId, now)));
        }
        return result;
    }

    /** Counts charged and drained batteries on a bug. */
    public BugInventory getBugInventory(String bugN, Instant now) {
        List<Battery> batteries = batteryRepository.findByLocationTypeAndLocationId("ON_BUG", bugN);
        int charged = 0, drained = 0;
        for (Battery b : batteries) {
            double charge = computeCharge(b, now);
            if (charge > DRAINED_THRESHOLD) charged++;
            else drained++;
        }
        return new BugInventory(charged, drained);
    }

    /** Returns all rack infos for every facility (drainable + charging station). */
    public Map<String, List<RackInfo>> getAllFacilitiesState(Instant now) {
        Map<String, List<RackInfo>> result = new LinkedHashMap<>();
        for (String fid : FACILITY_RACKS.keySet()) {
            result.put(fid, getFacilityState(fid, now));
        }
        return result;
    }

    // ── Failure / game-over tracking ──────────────────────────────────────────

    /**
     * Checks each drainable facility for total failure (all slots drained or empty).
     * Newly failed facilities are added to the internal set and returned.
     * Already-failed facilities are NOT returned again.
     */
    public List<String> detectNewFailures(Instant now) {
        List<String> newlyFailed = new ArrayList<>();
        for (String facilityId : DRAINABLE_FACILITIES) {
            if (failedFacilities.contains(facilityId)) continue;

            String[] rackIds = FACILITY_RACKS.get(facilityId);
            boolean anyCharged = false;
            boolean anyBattery = false;
            for (String rackId : rackIds) {
                List<Battery> bats = batteryRepository.findByLocationId(rackId);
                for (Battery b : bats) {
                    anyBattery = true;
                    if (computeCharge(b, now) > DRAINED_THRESHOLD) {
                        anyCharged = true;
                        break;
                    }
                }
                if (anyCharged) break;
            }
            // Only mark as failed if there are batteries and none are charged
            if (anyBattery && !anyCharged) {
                failedFacilities.add(facilityId);
                newlyFailed.add(facilityId);
            }
        }
        return newlyFailed;
    }

    /** Returns true if all drainable facilities have failed and game-over was not yet flagged. */
    public boolean checkGameOver() {
        if (gameOver) return false;
        for (String fid : DRAINABLE_FACILITIES) {
            if (!failedFacilities.contains(fid)) return false;
        }
        gameOver = true;
        return true;
    }

    public Set<String> getFailedFacilities() { return Collections.unmodifiableSet(failedFacilities); }
    public boolean     isGameOver()           { return gameOver; }
    public boolean     isSimulationStarted()  { return simulationStartTime != null; }
    public Instant     getSimulationStartTime(){ return simulationStartTime; }

    // ── Battery transfer (terminal waypoint docking) ──────────────────────────

    /**
     * Returns the nearest rack ID for a given (x, z) world position, or null if none
     * is within DOCK_THRESHOLD.
     */
    public String findNearestRack(double x, double z) {
        String nearest = null;
        double minDist = DOCK_THRESHOLD;
        for (int i = 0; i < PAD_IDS.length; i++) {
            double dx = PAD_XZ[i][0] - x;
            double dz = PAD_XZ[i][1] - z;
            double d  = Math.sqrt(dx * dx + dz * dz);
            if (d < minDist) { minDist = d; nearest = PAD_IDS[i]; }
        }
        return nearest;
    }

    /**
     * Performs the battery transfer between a bug and the nearest rack.
     * <ul>
     *   <li>Facility rack: take drained batteries from rack → bug; place charged batteries from bug → rack.</li>
     *   <li>Charging station: take fully-charged batteries from CS → bug; place drained batteries from bug → CS.</li>
     * </ul>
     *
     * @return transfer results (updated bug inventory and affected rack IDs)
     */
    @Transactional
    public synchronized TransferResult performTransfer(String bugN, String rackId, Instant now) {
        String facilityId = RACK_TO_FACILITY.get(rackId);
        if (facilityId == null) return new TransferResult(List.of(), new BugInventory(0, 0), 0);

        boolean isCS = "ChargingStation".equals(facilityId);

        List<Battery> bugBatteries = batteryRepository.findByLocationTypeAndLocationId("ON_BUG", bugN);
        List<Battery> rackBatteries = batteryRepository.findByLocationId(rackId);

        // Occupied slots in the rack
        Set<Integer> occupiedRackSlots = rackBatteries.stream()
            .map(Battery::getSlotIndex)
            .collect(Collectors.toCollection(HashSet::new));

        // Find empty rack slots (1–4 not in occupied)
        List<Integer> emptyRackSlots = new ArrayList<>();
        for (int i = 1; i <= 4; i++) {
            if (!occupiedRackSlots.contains(i)) emptyRackSlots.add(i);
        }

        // Occupied bug slots
        Set<Integer> occupiedBugSlots = bugBatteries.stream()
            .map(Battery::getSlotIndex)
            .collect(Collectors.toCollection(HashSet::new));

        Set<String> affectedRacks = new HashSet<>();
        affectedRacks.add(rackId);
        int batteriesDeliveredToFacility = 0;

        if (isCS) {
            // Step 1 (CS): CS → Bug — take fully-charged batteries from the CS rack first.
            //   This frees CS slots so drained batteries from the bug can be deposited next.
            List<Battery> csCharged = rackBatteries.stream()
                .filter(b -> computeCharge(b, now) >= 100.0 - DRAINED_THRESHOLD)
                .collect(Collectors.toList());
            for (Battery b : csCharged) {
                if (occupiedBugSlots.size() >= MAX_BUG_BATTERIES) break;
                int oldSlot = b.getSlotIndex();
                int newBugSlot = nextBugSlot(occupiedBugSlots);
                b.setLocationType("ON_BUG");
                b.setLocationId(bugN);
                b.setSlotIndex(newBugSlot);
                b.setStaticCharge(100.0);
                b.setDrainStartedAt(null);
                b.setChargeStartedAt(null);
                batteryRepository.save(b);
                occupiedBugSlots.add(newBugSlot);
                occupiedRackSlots.remove(oldSlot); // slot is now free in the CS rack
            }

            // Step 2 (CS): Bug → CS — deposit drained bug batteries into now-available CS slots.
            List<Integer> availableCS = new ArrayList<>();
            for (int i = 1; i <= 4; i++) {
                if (!occupiedRackSlots.contains(i)) availableCS.add(i);
            }
            Iterator<Integer> csSlotIt = availableCS.iterator();
            for (Battery b : new ArrayList<>(bugBatteries)) {
                if (!csSlotIt.hasNext()) break;
                if (!"ON_BUG".equals(b.getLocationType())) continue; // skip already-moved batteries
                double charge = computeCharge(b, now);
                if (charge <= DRAINED_THRESHOLD) {
                    int oldBugSlot = b.getSlotIndex();
                    int csSlot = csSlotIt.next();
                    b.setLocationType("CHARGING_STATION");
                    b.setLocationId(rackId);
                    b.setSlotIndex(csSlot);
                    b.setStaticCharge(null);
                    b.setDrainStartedAt(null);
                    b.setChargeStartedAt(now); // begin charging immediately
                    batteryRepository.save(b);
                    occupiedBugSlots.remove(oldBugSlot);
                    occupiedRackSlots.add(csSlot);
                }
            }
        } else {
            // Facility rack (drainable)
            // Step 1 (Facility): Rack → Bug — pick up ALL drained batteries from the facility first.
            //   This frees rack slots so the bug's full batteries can be deposited next.
            for (String fRackId : FACILITY_RACKS.get(facilityId)) {
                List<Battery> fRackBatteries = batteryRepository.findByLocationId(fRackId);
                for (Battery b : new ArrayList<>(fRackBatteries)) {
                    if (occupiedBugSlots.size() >= MAX_BUG_BATTERIES) break;
                    double charge = computeCharge(b, now);
                    if (charge <= DRAINED_THRESHOLD) {
                        int oldRackSlot = b.getSlotIndex();
                        int newBugSlot = nextBugSlot(occupiedBugSlots);
                        b.setLocationType("ON_BUG");
                        b.setLocationId(bugN);
                        b.setSlotIndex(newBugSlot);
                        b.setStaticCharge(charge);
                        b.setDrainStartedAt(null);
                        b.setChargeStartedAt(null);
                        batteryRepository.save(b);
                        occupiedBugSlots.add(newBugSlot);
                        affectedRacks.add(fRackId);
                        // Track freed slots in the target rack for step 2
                        if (fRackId.equals(rackId)) {
                            occupiedRackSlots.remove(oldRackSlot);
                        }
                    }
                }
            }

            // Step 2 (Facility): Bug → Rack — deposit the bug's fully-charged batteries
            //   into slots freed by step 1 plus any pre-existing empty slots.
            List<Integer> availableRackSlots = new ArrayList<>();
            for (int i = 1; i <= 4; i++) {
                if (!occupiedRackSlots.contains(i)) availableRackSlots.add(i);
            }
            Iterator<Integer> rackSlotIt = availableRackSlots.iterator();
            for (Battery b : new ArrayList<>(bugBatteries)) {
                if (!rackSlotIt.hasNext()) break;
                if (!"ON_BUG".equals(b.getLocationType())) continue; // skip already-moved batteries
                double charge = computeCharge(b, now);
                if (charge >= 100.0 - DRAINED_THRESHOLD) {
                    int oldBugSlot = b.getSlotIndex();
                    int rackSlot = rackSlotIt.next();
                    b.setLocationType("FACILITY_RACK");
                    b.setLocationId(rackId);
                    b.setSlotIndex(rackSlot);
                    b.setStaticCharge(null);
                    b.setDrainStartedAt(now); // user-filled: start draining now
                    b.setChargeStartedAt(null);
                    batteryRepository.save(b);
                    occupiedBugSlots.remove(oldBugSlot);
                    occupiedRackSlots.add(rackSlot);
                    batteriesDeliveredToFacility++;
                }
            }
            affectedRacks.add(rackId);
        }

        BugInventory inv = getBugInventory(bugN, now);
        return new TransferResult(new ArrayList<>(affectedRacks), inv, batteriesDeliveredToFacility);
    }

    private int nextBugSlot(Set<Integer> occupied) {
        for (int i = 1; i <= MAX_BUG_BATTERIES; i++) {
            if (!occupied.contains(i)) return i;
        }
        return MAX_BUG_BATTERIES; // fallback
    }

    // ── Data transfer objects ─────────────────────────────────────────────────

    public record SlotInfo(int slot, double charge) {}
    public record RackInfo(String rackId, List<SlotInfo> slots) {}
    public record BugInventory(int charged, int drained) {}
    public record TransferResult(List<String> affectedRackIds, BugInventory bugInventory, int batteriesDeliveredToFacility) {}
}
