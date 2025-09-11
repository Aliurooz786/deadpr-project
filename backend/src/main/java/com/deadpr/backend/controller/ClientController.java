package com.deadpr.backend.controller;

import com.deadpr.backend.dto.client.CreateBookingRequestDto;
import com.deadpr.backend.model.Booking;
import com.deadpr.backend.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/client")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @PostMapping("/bookings")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Booking> bookPackage(@RequestBody CreateBookingRequestDto request, Authentication authentication) {
        String clientEmail = authentication.getName();
        Booking newBooking = clientService.bookPackage(request, clientEmail);
        return new ResponseEntity<>(newBooking, HttpStatus.CREATED);
    }
}