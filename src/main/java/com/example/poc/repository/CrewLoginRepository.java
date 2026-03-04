package com.example.poc.repository;

import com.example.poc.entity.CrewLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.List;

public interface CrewLoginRepository extends JpaRepository<CrewLogin, Long> {

    @Query("SELECT DISTINCT c.crewId FROM CrewLogin c WHERE c.loggedInAt >= :since ORDER BY c.crewId")
    List<String> findDistinctCrewIdsLoggedInSince(Instant since);
}
