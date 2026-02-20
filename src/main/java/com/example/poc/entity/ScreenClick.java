package com.example.poc.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "screen_click")
public class ScreenClick {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String guid;

    @Column(name = "client_x", nullable = false)
    private Double clientX;

    @Column(name = "client_y", nullable = false)
    private Double clientY;

    @Column(name = "event_date", nullable = false)
    private Instant eventDate = Instant.now();

    public ScreenClick() {}

    public ScreenClick(String guid, double clientX, double clientY) {
        this.guid = guid;
        this.clientX = clientX;
        this.clientY = clientY;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getGuid() { return guid; }
    public void setGuid(String guid) { this.guid = guid; }
    public Double getClientX() { return clientX; }
    public void setClientX(Double clientX) { this.clientX = clientX; }
    public Double getClientY() { return clientY; }
    public void setClientY(Double clientY) { this.clientY = clientY; }
    public Instant getEventDate() { return eventDate; }
    public void setEventDate(Instant eventDate) { this.eventDate = eventDate; }
}
