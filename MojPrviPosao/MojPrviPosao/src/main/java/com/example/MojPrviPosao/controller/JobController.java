package com.example.MojPrviPosao.controller;

import com.example.MojPrviPosao.dto.ApplicationDTO;
import com.example.MojPrviPosao.dto.CompanyDTO;
import com.example.MojPrviPosao.dto.JobDTO;
import com.example.MojPrviPosao.model.JobType;
import com.example.MojPrviPosao.services.CompanyService;
import com.example.MojPrviPosao.services.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/job")
public class JobController {
    @Autowired
    private JobService jobService;
    @Autowired
    private CompanyService companyService;

    @PostMapping("/company/{id}")
    public ResponseEntity<JobDTO> addJob(@PathVariable Long id, @RequestBody JobDTO jobDTO) {
        JobDTO savedJobDTO = jobService.save(id, jobDTO);
        return new ResponseEntity<>(savedJobDTO, HttpStatus.CREATED);
    }
    @PutMapping("{id}")
    public ResponseEntity<JobDTO> updateJobById(@PathVariable long id, @RequestBody JobDTO jobDTO) {
        JobDTO updateJobDTO = jobService.update(id, jobDTO);
        return new ResponseEntity<>(updateJobDTO, HttpStatus.OK);
    }
    @DeleteMapping("{id}")
    public ResponseEntity deleteByIdJob (@PathVariable long id){
        jobService.deleteById(id);
        return new ResponseEntity(HttpStatus.OK);
    }
    @GetMapping("/company/{id}")
    public ResponseEntity<List<JobDTO>> getAllJobsByCompanyId(@PathVariable Long id) {
        List<JobDTO> jobDTOList = jobService.getAllJobsByCompanyId(id);
        return new ResponseEntity<>(jobDTOList, HttpStatus.OK);
    }

    @GetMapping("/active")
    public ResponseEntity<List<JobDTO>> getAllActiveJobs() {
        List<JobDTO> activeJobDTOList = jobService.getAllActiveJobs();
        return new ResponseEntity<>(activeJobDTOList, HttpStatus.OK);
    }
    @GetMapping("/all")
    public ResponseEntity<List<JobDTO>> getAllJobsFilteredAndSorted(
            @RequestParam(value = "sortBy", required = false) String sortBy,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "jobType", required = false) JobType jobType) {

        List<JobDTO> allJobsList = jobService.getAllJobsFilteredAndSorted(sortBy, name, jobType);

        return new ResponseEntity<>(allJobsList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobDTO> getJobById(@PathVariable long id) {
        JobDTO jobById = jobService.getJobById(id);
        return new ResponseEntity<>(jobById, HttpStatus.OK);
    }

}
