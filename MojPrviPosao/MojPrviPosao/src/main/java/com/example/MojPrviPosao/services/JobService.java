package com.example.MojPrviPosao.services;

import com.example.MojPrviPosao.dto.JobDTO;
import com.example.MojPrviPosao.model.JobType;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface JobService {
    JobDTO save(Long companyId, JobDTO jobDTO);

    JobDTO update(long id, JobDTO jobDTO);

    void deleteById(long id);

    List<JobDTO> getAllJobsByCompanyId(Long companyId);

    List<JobDTO> getAllJobsFilteredAndSorted(String sortBy,String name, JobType jobType);
    JobDTO getJobById(long id);
    List<JobDTO> getAllActiveJobs();
}
