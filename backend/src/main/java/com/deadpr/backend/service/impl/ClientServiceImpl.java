package com.deadpr.backend.service.impl;

import com.deadpr.backend.dto.client.CreateBookingRequestDto;
import com.deadpr.backend.model.*;
import com.deadpr.backend.repository.BookingRepository;
import com.deadpr.backend.repository.TrainingPackageRepository;
import com.deadpr.backend.repository.UserRepository;
import com.deadpr.backend.service.ClientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ClientServiceImpl implements ClientService {

    private static final Logger log = LoggerFactory.getLogger(ClientServiceImpl.class);

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TrainingPackageRepository trainingPackageRepository;

    @Override
    public Booking bookPackage(CreateBookingRequestDto request, String clientEmail) {
        log.info("Client with email {} is attempting to book package {}", clientEmail, request.getPackageId());

        User client = userRepository.findByEmail(clientEmail)
                .orElseThrow(() -> new RuntimeException("Client not found with email: " + clientEmail));

        TrainingPackage trainingPackage = trainingPackageRepository.findById(request.getPackageId())
                .orElseThrow(() -> new RuntimeException("Package not found with ID: " + request.getPackageId()));

        Booking booking = new Booking();
        booking.setClient(client);
        booking.setTrainingPackage(trainingPackage);
        booking.setTrainer(trainingPackage.getTrainer());
        booking.setBookingDate(LocalDate.now());
        booking.setExpiryDate(LocalDate.now().plusDays(trainingPackage.getDurationInDays()));
        booking.setStatus(BookingStatus.ACTIVE);

        Booking savedBooking = bookingRepository.save(booking);
        log.info("Booking created successfully with ID {} for client {}", savedBooking.getId(), clientEmail);

        return savedBooking;
    }
}