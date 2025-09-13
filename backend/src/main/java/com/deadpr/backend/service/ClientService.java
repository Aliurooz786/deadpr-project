package com.deadpr.backend.service;

import com.deadpr.backend.dto.client.CreateBookingRequestDto;
import com.deadpr.backend.model.Booking;

import java.util.List;

public interface ClientService {
    Booking bookPackage(CreateBookingRequestDto request, String clientEmail);
    List<Booking> getMyBookings(String clientEmail);
}