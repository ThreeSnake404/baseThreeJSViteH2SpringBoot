package com.example.poc.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "bugs_in_route")
public class BugInRoute {

    /** GUID of the browser session that reserved this bug. */
    @Id
    @Column(name = "id", length = 36, nullable = false)
    private String id;

    /** AST (crew ID) that reserved this bug, e.g. "bowman". */
    @Column(name = "ast", nullable = false, length = 32)
    private String ast;

    @Column(name = "reserved_time", nullable = false)
    private Instant reservedTime = Instant.now();

    /** Which bug is reserved, e.g. "bug1", "bug2", "bug3", "bug4". */
    @Column(name = "bug_n", nullable = false, length = 16)
    private String bugN;

    /** Set when routing is complete or the reserving session disconnects. */
    @Column(name = "released_time")
    private Instant releasedTime;

    public BugInRoute() {}

    public BugInRoute(String id, String ast, String bugN) {
        this.id = id;
        this.ast = ast;
        this.bugN = bugN;
        this.reservedTime = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getAst() { return ast; }
    public void setAst(String ast) { this.ast = ast; }
    public Instant getReservedTime() { return reservedTime; }
    public void setReservedTime(Instant reservedTime) { this.reservedTime = reservedTime; }
    public String getBugN() { return bugN; }
    public void setBugN(String bugN) { this.bugN = bugN; }
    public Instant getReleasedTime() { return releasedTime; }
    public void setReleasedTime(Instant releasedTime) { this.releasedTime = releasedTime; }
}
