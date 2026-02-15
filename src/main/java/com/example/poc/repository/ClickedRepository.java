package com.example.poc.repository;

import com.example.poc.entity.Clicked;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClickedRepository extends JpaRepository<Clicked, Long> {
}
