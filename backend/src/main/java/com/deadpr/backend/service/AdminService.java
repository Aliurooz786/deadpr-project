package com.deadpr.backend.service;

import com.deadpr.backend.dto.admin.CreatePackageRequestDto;
import com.deadpr.backend.dto.admin.CreateTrainerRequestDto;
import com.deadpr.backend.model.TrainingPackage;
import com.deadpr.backend.model.User;

public interface AdminService {
    User createTrainer(CreateTrainerRequestDto request);
    TrainingPackage createPackage(CreatePackageRequestDto request);
}

