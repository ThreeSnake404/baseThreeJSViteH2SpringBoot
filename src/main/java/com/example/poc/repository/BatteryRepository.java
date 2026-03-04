package com.example.poc.repository;

import com.example.poc.entity.Battery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BatteryRepository extends JpaRepository<Battery, String> {

    /** All batteries at a specific rack or bug location. */
    List<Battery> findByLocationId(String locationId);

    /** All batteries with a given location type (e.g., all ON_BUG batteries). */
    List<Battery> findByLocationType(String locationType);

    /** All batteries at a specific location type AND location id. */
    List<Battery> findByLocationTypeAndLocationId(String locationType, String locationId);
}
