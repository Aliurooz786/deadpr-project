package com.deadpr.backend.service;

import com.deadpr.backend.model.Booking;
import java.util.List;

public interface TrainerService {
    List<Booking> getMyClients(String trainerEmail);
}