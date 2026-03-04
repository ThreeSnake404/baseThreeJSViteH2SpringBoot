package com.example.poc.repository;

import com.example.poc.entity.CrewLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CrewLoginRepository extends JpaRepository<CrewLogin, String> {

    /** Find an active (not yet logged out) session for the given crew member. */
    @Query("SELECT c FROM CrewLogin c WHERE c.crewId = :crewId AND c.loggedOutAt IS NULL")
    Optional<CrewLogin> findActiveByCrewId(String crewId);

    /** Return crew IDs that currently have an active (not logged out) session. */
    @Query("SELECT DISTINCT c.crewId FROM CrewLogin c WHERE c.loggedOutAt IS NULL")
    List<String> findActiveCrewIds();
}
