package com.deadpr.backend.repository;

import com.deadpr.backend.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookingRepository extends MongoRepository<Booking, String> {

    List<Booking> findByClientId(String clientId);
    List<Booking> findByTrainerId(String trainerId);
    List<Booking> findByTrainer_User_Id(String userId);
}