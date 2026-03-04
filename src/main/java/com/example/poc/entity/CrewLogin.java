package com.example.poc.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "crew_login")
public class CrewLogin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "crew_id", nullable = false, length = 32)
    private String crewId;

    @Column(name = "logged_in_at", nullable = false)
    private Instant loggedInAt = Instant.now();

    public CrewLogin() {}

    public CrewLogin(String crewId) {
        this.crewId = crewId;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCrewId() { return crewId; }
    public void setCrewId(String crewId) { this.crewId = crewId; }
    public Instant getLoggedInAt() { return loggedInAt; }
    public void setLoggedInAt(Instant loggedInAt) { this.loggedInAt = loggedInAt; }
}
