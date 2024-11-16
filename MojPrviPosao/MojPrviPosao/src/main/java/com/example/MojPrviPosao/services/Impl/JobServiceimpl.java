package com.example.MojPrviPosao.services.Impl;

import com.example.MojPrviPosao.Izuzetak.NotFoundException;
import com.example.MojPrviPosao.dto.JobDTO;
import com.example.MojPrviPosao.model.*;
import com.example.MojPrviPosao.repositories.CompanyRepository;
import com.example.MojPrviPosao.repositories.JobRepository;
import com.example.MojPrviPosao.repositories.UserRepository;
import com.example.MojPrviPosao.services.JobService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobServiceimpl implements JobService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private JobRepository jobRepository;

    @Override
    public JobDTO save(Long companyId, JobDTO jobDTO) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String trenutnoUlogovanUsername = auth.getName();

        // Pronalazimo trenutno ulogovanog korisnika
        User trenutnoUlogovaniKorisnik = userRepository.findByUsername(trenutnoUlogovanUsername)
                .orElseThrow(() -> new NotFoundException("Trenutno ulogovani korisnik nije pronađen"));

        // Pronalazimo kompaniju kojoj želimo da dodamo posao (prethodno je prosleđen ID kompanije putem putanje)
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new NotFoundException("Kompanija nije pronađena"));

        // Proveravamo da li je trenutno ulogovani korisnik vlasnik kompanije
        if (!company.getUser().getUsername().equals(trenutnoUlogovanUsername)) {
            throw new NotFoundException("Nemate dozvolu za dodavanje posla u ovu kompaniju");
        }

        // Mapiranje iz JobDTO u Job
        Job job = modelMapper.map(jobDTO, Job.class);

        // Dodajemo trenutno ulogovanog korisnika kao kreatora posla
        job.setUser(trenutnoUlogovaniKorisnik);
        job.setCreationDate(LocalDate.now());
        job.setCompany(company);

        // Postavljanje statusa na osnovu aktivnog datuma
        if (job.getActiveDate().isBefore(LocalDate.now())) {
            job.setStatus(Status.NEAKTIVAN);
        } else {
            job.setStatus(Status.AKTIVAN);
        }

        // Čuvamo posao u bazi
        Job savedJob = jobRepository.save(job);

        // Mapiramo sačuvani posao nazad u JobDTO i vraćamo
        return modelMapper.map(savedJob, JobDTO.class);
    }


    @Override
    public JobDTO update(long id, JobDTO jobDTO) {
        // Proveravamo da li je korisnik ulogovan
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String trenutnoUlogovanUsername = auth.getName();

        // Pronalazimo trenutno ulogovanog korisnika
        User trenutnoUlogovaniKorisnik = userRepository.findByUsername(trenutnoUlogovanUsername)
                .orElseThrow(() -> new NotFoundException("Trenutno ulogovani korisnik nije pronađen"));

        // Pronalazimo job koju želimo da ažuriramo na osnovu prosleđenog id-ja
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Posao nije pronađena"));

        // Proveravamo da li je trenutno ulogovani korisnik autor posta
        if (job.getUser().getId() != trenutnoUlogovaniKorisnik.getId()) {
            throw new NotFoundException("Nemate dozvolu za ažuriranje ove kompanije");
        }

        // Postavljamo nove informacije na postojeću kompaniju
        job.setName(jobDTO.getName());
        job.setPlata(jobDTO.getPlata());
        job.setActiveDate(jobDTO.getActiveDate());

        // Čuvamo izmenjen posao u bazi podataka
        Job saveJob = jobRepository.save(job);

        // Mapiranje
        return modelMapper.map(saveJob, JobDTO.class);
    }
    @Override
    public void deleteById(long id) {
        // Proveravamo da li je korisnik ulogovan
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String trenutnoUlogovanUsername = auth.getName();

        // Pronalazimo trenutno ulogovanog korisnika
        User trenutnoUlogovaniKorisnik = userRepository.findByUsername(trenutnoUlogovanUsername)
                .orElseThrow(() -> new NotFoundException("Trenutno ulogovani korisnik nije pronađen"));

        // Pronalazimo posao koju želimo da obrišemo
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Posao nije pronađena"));

        // Proveravamo da li je trenutno ulogovani korisnik autor posta
        if (job.getUser().getId() != trenutnoUlogovaniKorisnik.getId() && !trenutnoUlogovanUsername.equals("jovan")) {
            throw new NotFoundException("Nemate dozvolu za ažuriranje ove kompanije");
        }

        // Brišemo red iz tabele `job`
        jobRepository.deleteById(id);
    }

    @Override
    public List<JobDTO> getAllJobsByCompanyId(Long companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new NotFoundException("Kompanija nije pronađena"));

        // Pronalazimo sve poslove za datu kompaniju
        List<Job> jobs = jobRepository.findAllByCompany(company);

        // Mapiramo listu poslova u listu JobDTO objekata
        return jobs.stream()
                .map(job -> modelMapper.map(job, JobDTO.class))
                .collect(Collectors.toList());
    }
    @Override
    public List<JobDTO> getAllActiveJobs() {
        // Pronalazimo sve poslove sa statusom AKTIVAN
        List<Job> activeJobs = jobRepository.findAllByStatus(Status.AKTIVAN);

        // Mapiramo listu poslova u listu JobDTO objekata
        return activeJobs.stream()
                .map(job -> modelMapper.map(job, JobDTO.class))
                .collect(Collectors.toList());
    }



    @Override
    public List<JobDTO> getAllJobsFilteredAndSorted(String sortBy, String name, JobType jobType) {
        List<Job> jobs;

        // Ako je ime posla navedeno
        if (name != null && jobType != null) {
            jobs = jobRepository.findByNameAndJobType(name, jobType, getSort(sortBy));
        } else if (name != null) {
            jobs = jobRepository.findByName(name, getSort(sortBy));
        } else if (jobType != null) {
            jobs = jobRepository.findByJobType(jobType, getSort(sortBy));
        } else {
            jobs = jobRepository.findAll(getSort(sortBy));
        }

        // Mapiramo listu poslova u listu JobDTO objekata
        return jobs.stream()
                .map(job -> modelMapper.map(job, JobDTO.class))
                .collect(Collectors.toList());
    }

    // Pomoćna metoda za kreiranje Sort objekta na osnovu zadatog sortBy parametra
    private Sort getSort(String sortBy) {
        if (sortBy != null && !sortBy.isEmpty()) {
            if (sortBy.equals("plata")) {
                return Sort.by(sortBy).descending(); // Sortiranje po plati opadajuće
            } else if (sortBy.equals("creationDate")) {
                return Sort.by(sortBy).descending(); // Sortiranje po datumu kreiranja opadajuće
            } else {
                return Sort.by(sortBy);
            }
        } else {
            // Ako sortBy parametar nije naveden, vraćamo sortiranje po ID-u u rastućem redosledu kao podrazumevani kriterijum
            return Sort.by("id").ascending();
        }
    }

    @Override
    public JobDTO getJobById(long id) {
        Job job = jobRepository.findById(id).orElseGet(null);
        JobDTO jobDTO = modelMapper.map(job, JobDTO.class);
        return jobDTO;
    }

}
