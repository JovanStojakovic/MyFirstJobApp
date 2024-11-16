package com.example.MojPrviPosao.services.Impl;

import com.example.MojPrviPosao.Izuzetak.NotFoundException;
import com.example.MojPrviPosao.dto.ApplicationDTO;
import com.example.MojPrviPosao.dto.CompanyDTO;
import com.example.MojPrviPosao.model.Application;
import com.example.MojPrviPosao.model.Company;
import com.example.MojPrviPosao.model.Job;
import com.example.MojPrviPosao.model.User;
import com.example.MojPrviPosao.repositories.ApplicationRepository;
import com.example.MojPrviPosao.repositories.JobRepository;
import com.example.MojPrviPosao.repositories.UserRepository;
import com.example.MojPrviPosao.services.ApplicationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ApplicationRepository applicationRepository;

    @Override
    public ApplicationDTO saveApplication(Long jobId, ApplicationDTO applicationDTO) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String trenutnoUlogovanUsername = auth.getName();
        User trenutnoUlogovaniKorisnik = userRepository.findByUsername(trenutnoUlogovanUsername)
                .orElseThrow(() -> new NotFoundException("Trenutno ulogovani korisnik nije pronađen"));

        // Pronalazimo posao na osnovu jobId
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new NotFoundException("Posao nije pronađen"));

        // Proveravamo da li je trenutno ulogovani korisnik autor posla
        if (job.getUser().getUsername().equals(trenutnoUlogovanUsername)) {
            throw new NotFoundException("Prijava ne može biti kreirana od strane autora posla");
        }

        // Proveravamo da li je korisnik već aplicirao u poslednjih 2 dana
        List<Application> existingApplications = applicationRepository.findByUserAndJobAndCreationDateAfter(trenutnoUlogovaniKorisnik, job, LocalDate.now().minusDays(2));
        if (!existingApplications.isEmpty()) {
            throw new IllegalStateException("Već ste poslali prijavu za ovaj posao u proteklih 2 dana");
        }

        Application application = modelMapper.map(applicationDTO, Application.class);
        application.setUser(trenutnoUlogovaniKorisnik);
        application.setJob(job);
        application.setCompany(job.getCompany());
        application.setCreationDate(LocalDate.now());

        // Validacija PDF sadržaja
        String pdfContent = applicationDTO.getPdfContent();
        if (pdfContent == null || pdfContent.isEmpty() || !isValidBase64(pdfContent)) {
            throw new IllegalArgumentException("Neispravan PDF sadržaj.");
        }
        application.setPdfContent(pdfContent);

        Application savedApplication = applicationRepository.save(application);
        return modelMapper.map(savedApplication, ApplicationDTO.class);
    }

    // Metoda za validaciju Base64
    private boolean isValidBase64(String base64) {
        try {
            Base64.getDecoder().decode(base64);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    @Override
    public List<ApplicationDTO> getAllApplicationByJobId(Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String trenutnoUlogovanUsername = auth.getName();

        User trenutnoUlogovaniKorisnik = userRepository.findByUsername(trenutnoUlogovanUsername)
                .orElseThrow(() -> new NotFoundException("Trenutno ulogovani korisnik nije pronađen"));

        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Posao nije pronađen"));

        if (job.getUser().getId() != trenutnoUlogovaniKorisnik.getId()) {
            throw new NotFoundException("Nemate dozvolu za pristup ovim podacima");
        }

        List<Application> applications = applicationRepository.findAllByJob(job);

        return applications.stream()
                .map(application -> {
                    ApplicationDTO applicationDTO = modelMapper.map(application, ApplicationDTO.class);
                    //posto u bazi pdf file cuvam kao string, sada moram da ga vratim iz stringa u file i da prikazemkorisniku
                    // Dekodiranje PDF sadržaja i kreiranje fajla
                    byte[] pdfBytes = Base64.getDecoder().decode(application.getPdfContent());
                    File pdfFile = new File(application.getId() + "_application.pdf");

                    try (OutputStream os = new FileOutputStream(pdfFile)) {
                        os.write(pdfBytes);
                    } catch (IOException e) {
                        throw new RuntimeException("Greška prilikom kreiranja PDF fajla", e);
                    }

                    // Vraćamo putanju fajla nazad u DTO objektu
                    applicationDTO.setPdfContent(pdfFile.getAbsolutePath());
                    return applicationDTO;
                })
                .collect(Collectors.toList());
    }
    @Override
    public void deleteById(long id) {
        // Proveravamo da li je korisnik ulogovan
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String trenutnoUlogovanUsername = auth.getName();

        // Pronalazimo trenutno ulogovanog korisnika
        User trenutnoUlogovaniKorisnik = userRepository.findByUsername(trenutnoUlogovanUsername)
                .orElseThrow(() -> new NotFoundException("Trenutno ulogovani korisnik nije pronađen"));

        // Pronalazimo prijavu koju želimo da obrišemo
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Prijava nije pronađena"));

        // Proveravamo da li je trenutno ulogovani korisnik autor prijave
        if (application.getUser().getId() != trenutnoUlogovaniKorisnik.getId()) {
            throw new NotFoundException("Nemate dozvolu za ažuriranje ove kompanije");
        }

        // Brišemo red iz tabele `application`
        applicationRepository.deleteById(id);
    }

    public List<ApplicationDTO> getApplicationsByUser(Long userId) {
        List<Application> applications = applicationRepository.findAllByUserId(userId);

        return applications.stream()
                .map(application -> {
                    ApplicationDTO applicationDTO = modelMapper.map(application, ApplicationDTO.class);
                    applicationDTO.setJobName(application.getJob().getName());
                    applicationDTO.setCompanyName(application.getCompany().getName());
                    return applicationDTO;
                })
                .collect(Collectors.toList());
    }

}
