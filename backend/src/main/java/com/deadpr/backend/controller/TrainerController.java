package com.deadpr.backend.controller;

import com.deadpr.backend.model.Booking;
import com.deadpr.backend.service.TrainerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/trainer")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    @GetMapping("/my-clients")
    @PreAuthorize("hasRole('TRAINER')")
    public ResponseEntity<List<Booking>> getMyClients(Authentication authentication) {
        String trainerEmail = authentication.getName();
        List<Booking> clients = trainerService.getMyClients(trainerEmail);
        return ResponseEntity.ok(clients);
    }
}