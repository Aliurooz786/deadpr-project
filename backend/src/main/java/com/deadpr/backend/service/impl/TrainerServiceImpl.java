package com.deadpr.backend.service.impl;

import com.deadpr.backend.model.Booking;
import com.deadpr.backend.model.Trainer;
import com.deadpr.backend.model.User;
import com.deadpr.backend.repository.BookingRepository;
import com.deadpr.backend.repository.TrainerRepository;
import com.deadpr.backend.repository.UserRepository;
import com.deadpr.backend.service.TrainerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainerServiceImpl implements TrainerService {

    private static final Logger log = LoggerFactory.getLogger(TrainerServiceImpl.class);

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TrainerRepository trainerRepository;

    @Override
    public List<Booking> getMyClients(String trainerEmail) {
        log.info("Fetching clients for trainer with email: {}", trainerEmail);

        User trainerUser = userRepository.findByEmail(trainerEmail)
                .orElseThrow(() -> new RuntimeException("Trainer user not found with email: " + trainerEmail));

        Trainer trainerProfile = trainerRepository.findByUserId(trainerUser.getId())
                .orElseThrow(() -> new RuntimeException("Trainer profile not found for user ID: " + trainerUser.getId()));

        List<Booking> bookings = bookingRepository.findByTrainerId(trainerProfile.getId());

        log.info("Found {} clients for trainer {}", bookings.size(), trainerEmail);
        return bookings;
    }
}