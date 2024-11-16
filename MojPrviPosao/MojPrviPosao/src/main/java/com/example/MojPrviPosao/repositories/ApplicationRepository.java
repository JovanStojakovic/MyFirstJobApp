package com.example.MojPrviPosao.repositories;

import com.example.MojPrviPosao.model.Application;
import com.example.MojPrviPosao.model.Company;
import com.example.MojPrviPosao.model.Job;
import com.example.MojPrviPosao.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUserAndJobAndCreationDateAfter(User user, Job job, LocalDate creationDate);
    List<Application> findAllByJob(Job job);
    List<Application> findAllByUserId(Long userId);

}
