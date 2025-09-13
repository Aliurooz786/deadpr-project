package com.deadpr.backend.service;

import com.deadpr.backend.dto.admin.CreatePackageRequestDto;
import com.deadpr.backend.dto.admin.CreateTrainerRequestDto;
import com.deadpr.backend.model.Booking;
import com.deadpr.backend.model.TrainingPackage;
import com.deadpr.backend.model.User;

import java.util.List;
import java.util.Map; // Naya import

public interface AdminService {
    User createTrainer(CreateTrainerRequestDto request);
    TrainingPackage createPackage(CreatePackageRequestDto request);
    Map<String, Long> getDashboardStats();
    List<User> getRecentClients();
    List<Booking> getRecentBookings();
}
