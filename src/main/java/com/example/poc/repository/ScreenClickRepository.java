package com.example.poc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.poc.entity.ScreenClick;

public interface ScreenClickRepository extends JpaRepository<ScreenClick, Long> {
}
