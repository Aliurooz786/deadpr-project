package com.deadpr.backend.service.impl;

import com.deadpr.backend.dto.admin.CreatePackageRequestDto;
import com.deadpr.backend.dto.admin.CreateTrainerRequestDto;
import com.deadpr.backend.model.Role;
import com.deadpr.backend.model.Trainer;
import com.deadpr.backend.model.TrainingPackage;
import com.deadpr.backend.model.User;
import com.deadpr.backend.repository.TrainerRepository;
import com.deadpr.backend.repository.TrainingPackageRepository;
import com.deadpr.backend.repository.UserRepository;
import com.deadpr.backend.service.AdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AdminServiceImpl implements AdminService {

    private static final Logger log = LoggerFactory.getLogger(AdminServiceImpl.class);

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private TrainingPackageRepository trainingPackageRepository;

    @Override
    public User createTrainer(CreateTrainerRequestDto request) {
        log.info("Admin is attempting to create a new trainer with email: {}", request.getEmail());

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            log.warn("Trainer creation failed: Email already in use - {}", request.getEmail());
            throw new IllegalStateException("Email already in use.");
        }


        User userAccount = new User();
        userAccount.setName(request.getName());
        userAccount.setEmail(request.getEmail());
        userAccount.setPhoneNumber(request.getPhoneNumber());
        userAccount.setPassword(passwordEncoder.encode(request.getPassword()));
        userAccount.setRole(Role.ROLE_TRAINER);
        userAccount.setCreatedAt(LocalDateTime.now());
        User savedUser = userRepository.save(userAccount);

        // Step 2: Create the Trainer profile with professional details
        Trainer trainerProfile = new Trainer();
        trainerProfile.setDescription(request.getDescription());
        trainerProfile.setSpecializations(request.getSpecializations());
        // Link the profile to the user account
        trainerProfile.setUser(savedUser);
        trainerRepository.save(trainerProfile);

        log.info("Trainer account and profile created successfully for user ID: {}", savedUser.getId());

        return savedUser;
    }

    @Override
    public TrainingPackage createPackage(CreatePackageRequestDto request) { // <-- UPDATED
        log.info("Admin is attempting to create a new package named: {}", request.getName());

        Trainer trainer = trainerRepository.findById(request.getTrainerId())
                .orElseThrow(() -> {
                    log.error("Package creation failed: Trainer not found with ID: {}", request.getTrainerId());
                    return new RuntimeException("Trainer not found with ID: " + request.getTrainerId());
                });

        TrainingPackage newPackage = new TrainingPackage(); // <-- UPDATED
        newPackage.setName(request.getName());
        newPackage.setDescription(request.getDescription());
        newPackage.setPrice(request.getPrice());
        newPackage.setDurationInDays(request.getDurationInDays());
        newPackage.setTrainer(trainer);

        TrainingPackage savedPackage = trainingPackageRepository.save(newPackage); // <-- UPDATED
        log.info("Package created successfully with ID: {}", savedPackage.getId());

        return savedPackage;
    }
}