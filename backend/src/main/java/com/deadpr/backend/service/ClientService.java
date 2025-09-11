package com.deadpr.backend.service;

import com.deadpr.backend.dto.client.CreateBookingRequestDto;
import com.deadpr.backend.model.Booking;

public interface ClientService {
    Booking bookPackage(CreateBookingRequestDto request, String clientEmail);
}