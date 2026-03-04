package com.example.poc.repository;

import com.example.poc.entity.BugInRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BugInRouteRepository extends JpaRepository<BugInRoute, String> {

    /** Find an active (not yet released) reservation for the given bug. */
    @Query("SELECT b FROM BugInRoute b WHERE b.bugN = :bugN AND b.releasedTime IS NULL")
    Optional<BugInRoute> findActiveByBugN(String bugN);
}
