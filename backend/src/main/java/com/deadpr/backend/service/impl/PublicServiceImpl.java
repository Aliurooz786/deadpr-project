package com.deadpr.backend.service.impl;

import com.deadpr.backend.model.Trainer;
import com.deadpr.backend.repository.TrainerRepository;
import com.deadpr.backend.service.PublicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublicServiceImpl implements PublicService {

    @Autowired
    private TrainerRepository trainerRepository;

    @Override
    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }

    @Override
    public Trainer getTrainerById(String trainerId) {
        return trainerRepository.findById(trainerId)
                .orElseThrow(() -> new RuntimeException("Trainer not found with ID: " + trainerId));
    }
}