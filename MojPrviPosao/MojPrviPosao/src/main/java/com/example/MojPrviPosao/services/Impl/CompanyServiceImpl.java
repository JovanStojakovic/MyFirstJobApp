package com.example.MojPrviPosao.services.Impl;

import com.example.MojPrviPosao.Izuzetak.NotFoundException;
import com.example.MojPrviPosao.dto.CompanyDTO;
import com.example.MojPrviPosao.dto.JobDTO;
import com.example.MojPrviPosao.model.Company;
import com.example.MojPrviPosao.model.Job;
import com.example.MojPrviPosao.model.JobType;
import com.example.MojPrviPosao.model.User;
import com.example.MojPrviPosao.repositories.CompanyRepository;
import com.example.MojPrviPosao.repositories.UserRepository;
import com.example.MojPrviPosao.services.CompanyService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CompanyServiceImpl implements CompanyService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CompanyDTO save(CompanyDTO companyDTO) {
        //proveravamo da li je korisnik ulogovan
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        // Izvlacimo trenutno ulogovanog korisnika
        String trenutnoUlogovan = auth.getName();
        // Pronalazimo korisnika iz baze podataka prema trenutnom korisničkom imenu
        User user = userRepository.findByUsername(trenutnoUlogovan)
                .orElseThrow(() -> new NotFoundException("Korisnik nije pronađen"));

        Company company = modelMapper.map(companyDTO, Company.class);
        company.setCreationDate(LocalDate.now());
        company.setUser(user);
        Company saveCompany = companyRepository.save(company);
        CompanyDTO saveCompanyDTO = modelMapper.map(saveCompany, CompanyDTO.class);
        return saveCompanyDTO;

    }
    @Override
    public CompanyDTO update(long id, CompanyDTO companyDTO) {
        // Proveravamo da li je korisnik ulogovan
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String trenutnoUlogovanUsername = auth.getName();
        // Pronalazimo trenutno ulogovanog korisnika
        User trenutnoUlogovaniKorisnik = userRepository.findByUsername(trenutnoUlogovanUsername)
                .orElseThrow(() -> new NotFoundException("Trenutno ulogovani korisnik nije pronađen"));
        // Pronalazimo kompaniju koju želimo da ažuriramo na osnovu prosleđenog id-ja
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Kompanija nije pronađena"));
        // Proveravamo da li je trenutno ulogovani korisnik vlasnik kompanije
        if (company.getUser().getId() != trenutnoUlogovaniKorisnik.getId()) {
            throw new NotFoundException("Nemate dozvolu za ažuriranje ove kompanije");
        }
        // Postavljamo nove informacije na postojeću kompaniju
        company.setName(companyDTO.getName());
        // Čuvamo izmenjenu kompaniju u bazi podataka
        Company saveCompany = companyRepository.save(company);
        // Mapiranje rezultata na CompanyDTO i vraćanje
        return modelMapper.map(saveCompany, CompanyDTO.class);
    }


    @Override
    public void deleteById(long id) {
        // Proveravamo da li je korisnik ulogovan
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String trenutnoUlogovanUsername = auth.getName();

        // Pronalazimo trenutno ulogovanog korisnika
        User trenutnoUlogovaniKorisnik = userRepository.findByUsername(trenutnoUlogovanUsername)
                .orElseThrow(() -> new NotFoundException("Trenutno ulogovani korisnik nije pronađen"));

        // Pronalazimo kompaniju koju želimo da obrišemo
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Kompanija nije pronađena"));

        // Proveravamo da li je trenutno ulogovani korisnik vlasnik kompanije ili je korisnik "jovan"
        if (company.getUser().getId() != trenutnoUlogovaniKorisnik.getId() && !trenutnoUlogovanUsername.equals("jovan")) {
            throw new NotFoundException("Nemate dozvolu za brisanje ove kompanije");
        }

        // Brišemo red iz tabele `company`
        companyRepository.deleteById(id);
    }



    public List<CompanyDTO> getCompanyByUser(Long userId) {
        // Pronalazimo sve kompanije koje pripadaju korisniku sa datim Id
        List<Company> companies = companyRepository.findAllByUserId(userId);
        // Mapiramo listu kompanija u listu DTO objekata
        return companies.stream()
                .map(company -> modelMapper.map(company, CompanyDTO.class))
                .collect(Collectors.toList());
    }
    @Override
    public List<CompanyDTO> getAllCompaniesFiltered(String companyName, String place) {
        List<Company> companies;

        // Filtriranje na osnovu imena kompanije i mesta
        if (companyName != null && place != null) {
            companies = companyRepository.findByNameAndPlace(companyName, place);
        } else if (companyName != null) {
            companies = companyRepository.findByName(companyName);
        } else if (place != null) {
            companies = companyRepository.findByPlace(place);
        } else {
            companies = companyRepository.findAll();
        }

        return companies.stream()
                .map(company -> modelMapper.map(company, CompanyDTO.class))
                .collect(Collectors.toList());
    }
    @Override
    public CompanyDTO getCompanyById(long id) {
        Company company = companyRepository.findById(id).orElseGet(null);
        CompanyDTO companyDTO = modelMapper.map(company, CompanyDTO.class);
        return companyDTO;
    }
}
