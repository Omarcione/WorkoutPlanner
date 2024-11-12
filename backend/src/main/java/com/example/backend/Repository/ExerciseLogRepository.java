package com.example.backend.Repository;

import com.example.backend.Entity.ExerciseLog;
import com.example.backend.Entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ExerciseLogRepository extends CrudRepository<ExerciseLog, Long> {
    List<ExerciseLog> findByUser(User user);
}