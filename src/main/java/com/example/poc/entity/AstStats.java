package com.example.poc.entity;

import jakarta.persistence.*;

/**
 * Cumulative performance statistics for a single AST crew member, reset each simulation run.
 */
@Entity
@Table(name = "ast_stats")
public class AstStats {

    @Id
    @Column(name = "crew_id", length = 20, nullable = false)
    private String crewId;

    @Column(name = "routes_completed", nullable = false)
    private int routesCompleted = 0;

    @Column(name = "batteries_delivered", nullable = false)
    private int batteriesDelivered = 0;

    /** Total distance (world units) the AST's bugs traveled over Regolith terrain. */
    @Column(name = "regolith_distance", nullable = false)
    private double regolithDistance = 0.0;

    /** Total distance (world units) the AST's bugs traveled over ShinyBlue terrain. */
    @Column(name = "shiny_blue_distance", nullable = false)
    private double shinyBlueDistance = 0.0;

    public AstStats() {}

    public AstStats(String crewId) {
        this.crewId = crewId;
    }

    public String getCrewId()                      { return crewId; }
    public void   setCrewId(String v)              { this.crewId = v; }

    public int    getRoutesCompleted()             { return routesCompleted; }
    public void   setRoutesCompleted(int v)        { this.routesCompleted = v; }

    public int    getBatteriesDelivered()          { return batteriesDelivered; }
    public void   setBatteriesDelivered(int v)     { this.batteriesDelivered = v; }

    public double getRegolithDistance()            { return regolithDistance; }
    public void   setRegolithDistance(double v)    { this.regolithDistance = v; }

    public double getShinyBlueDistance()           { return shinyBlueDistance; }
    public void   setShinyBlueDistance(double v)   { this.shinyBlueDistance = v; }
}
