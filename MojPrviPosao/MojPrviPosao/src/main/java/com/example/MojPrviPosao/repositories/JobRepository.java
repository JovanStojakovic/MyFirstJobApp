package com.example.MojPrviPosao.repositories;

import com.example.MojPrviPosao.model.Company;
import com.example.MojPrviPosao.model.Job;
import com.example.MojPrviPosao.model.JobType;
import com.example.MojPrviPosao.model.Status;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findAllByCompany(Company company);

    List<Job> findAll();

    List<Job> findByName(String name, Sort sort);
    List<Job> findByJobType(JobType jobType, Sort sort);
    List<Job> findByNameAndJobType(String name, JobType jobType, Sort sort);
    List<Job> findAllByStatus(Status status);

}
