package com.example.poc.web;

import com.example.poc.entity.CrewLogin;
import com.example.poc.repository.CrewLoginRepository;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/crew-logins")
@CrossOrigin(origins = "*")
public class CrewLoginController {

    private static final int ACTIVE_MINUTES = 30;

    private final CrewLoginRepository crewLoginRepository;

    public CrewLoginController(CrewLoginRepository crewLoginRepository) {
        this.crewLoginRepository = crewLoginRepository;
    }

    @GetMapping
    public List<String> listActive() {
        Instant since = Instant.now().minusSeconds(ACTIVE_MINUTES * 60L);
        return crewLoginRepository.findDistinctCrewIdsLoggedInSince(since);
    }

    @PostMapping
    public CrewLogin recordLogin(@RequestBody RecordLoginRequest request) {
        CrewLogin login = new CrewLogin(request.getCrewId());
        return crewLoginRepository.save(login);
    }

    public static class RecordLoginRequest {
        private String crewId;

        public String getCrewId() { return crewId; }
        public void setCrewId(String crewId) { this.crewId = crewId; }
    }
}
