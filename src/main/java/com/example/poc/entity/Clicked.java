package com.example.poc.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "clicked")
public class Clicked {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "current_color", nullable = false)
    private String currentColor;

    @Column(name = "next_color", nullable = false)
    private String nextColor;

    @Column(nullable = false)
    private String guid;

    @Column(name = "event_date", nullable = false)
    private Instant eventDate = Instant.now();

    public Clicked() {}

    public Clicked(String currentColor, String nextColor, String guid) {
        this.currentColor = currentColor;
        this.nextColor = nextColor;
        this.guid = guid;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCurrentColor() { return currentColor; }
    public void setCurrentColor(String currentColor) { this.currentColor = currentColor; }
    public String getNextColor() { return nextColor; }
    public void setNextColor(String nextColor) { this.nextColor = nextColor; }
    public String getGuid() { return guid; }
    public void setGuid(String guid) { this.guid = guid; }
    public Instant getEventDate() { return eventDate; }
    public void setEventDate(Instant eventDate) { this.eventDate = eventDate; }
}
