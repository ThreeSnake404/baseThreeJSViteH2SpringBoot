package com.example.poc.web;

import com.example.poc.repository.CrewLoginRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crew-logins")
@CrossOrigin(origins = "*")
public class CrewLoginController {

    private final CrewLoginRepository crewLoginRepository;

    public CrewLoginController(CrewLoginRepository crewLoginRepository) {
        this.crewLoginRepository = crewLoginRepository;
    }

    /** Returns the crew IDs that currently have an active (not logged-out) WebSocket session. */
    @GetMapping
    public List<String> listActive() {
        return crewLoginRepository.findActiveCrewIds();
    }
}
