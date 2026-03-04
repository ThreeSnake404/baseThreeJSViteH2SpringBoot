package com.example.poc.entity;

import jakarta.persistence.*;
import java.time.Instant;

/**
 * Server-authoritative battery state.
 *
 * location_type values:
 *   FACILITY_RACK    – draining; current charge = max(0, 100 - elapsed_sec * 100/30)
 *   CHARGING_STATION – charging when chargeStartedAt != null; otherwise staticCharge
 *   ON_BUG           – frozen at staticCharge while carried
 */
@Entity
@Table(name = "batteries")
public class Battery {

    @Id
    @Column(name = "id", length = 36, nullable = false)
    private String id;

    /** FACILITY_RACK | CHARGING_STATION | ON_BUG */
    @Column(name = "location_type", nullable = false, length = 20)
    private String locationType;

    /** Rack ID (e.g. "GreenHouse1Hrack"), CS rack ID, or bug ID (e.g. "bug1"). */
    @Column(name = "location_id", nullable = false, length = 64)
    private String locationId;

    /** Slot within the rack (1–4) or bug (1–9). */
    @Column(name = "slot_index", nullable = false)
    private int slotIndex;

    /** Frozen charge used for ON_BUG batteries and fully-charged CS batteries. */
    @Column(name = "static_charge")
    private Double staticCharge;

    /** For FACILITY_RACK: the Instant when drain started; determines current charge. */
    @Column(name = "drain_started_at")
    private Instant drainStartedAt;

    /** For CHARGING_STATION: set when a drained battery begins charging. Null = already full. */
    @Column(name = "charge_started_at")
    private Instant chargeStartedAt;

    public Battery() {}

    public Battery(String id, String locationType, String locationId, int slotIndex) {
        this.id           = id;
        this.locationType = locationType;
        this.locationId   = locationId;
        this.slotIndex    = slotIndex;
    }

    public String getId()                     { return id; }
    public void   setId(String id)            { this.id = id; }

    public String getLocationType()                    { return locationType; }
    public void   setLocationType(String locationType) { this.locationType = locationType; }

    public String getLocationId()                   { return locationId; }
    public void   setLocationId(String locationId)  { this.locationId = locationId; }

    public int  getSlotIndex()             { return slotIndex; }
    public void setSlotIndex(int slotIndex){ this.slotIndex = slotIndex; }

    public Double getStaticCharge()                    { return staticCharge; }
    public void   setStaticCharge(Double staticCharge) { this.staticCharge = staticCharge; }

    public Instant getDrainStartedAt()                      { return drainStartedAt; }
    public void    setDrainStartedAt(Instant drainStartedAt){ this.drainStartedAt = drainStartedAt; }

    public Instant getChargeStartedAt()                       { return chargeStartedAt; }
    public void    setChargeStartedAt(Instant chargeStartedAt){ this.chargeStartedAt = chargeStartedAt; }
}
