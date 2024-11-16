package com.example.MojPrviPosao.controller;

import com.example.MojPrviPosao.Izuzetak.NotFoundException;
import com.example.MojPrviPosao.dto.ApplicationDTO;
import com.example.MojPrviPosao.dto.CompanyDTO;
import com.example.MojPrviPosao.dto.JobDTO;
import com.example.MojPrviPosao.services.ApplicationService;
import com.example.MojPrviPosao.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/application")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;
    @Autowired
    private UserService userService;
    @PostMapping("/job/{id}")
    public ResponseEntity<ApplicationDTO> addApplication(@PathVariable Long id, @RequestBody ApplicationDTO applicationDTO) {
        ApplicationDTO savedApplicationDTO = applicationService.saveApplication(id, applicationDTO);
        return new ResponseEntity<>(savedApplicationDTO, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteByIdApplication (@PathVariable long id){
        applicationService.deleteById(id);
        return new ResponseEntity(HttpStatus.OK);
    }
    @GetMapping("/job/{id}")
    public ResponseEntity<List<ApplicationDTO>> getAllApplicationByJobId(@PathVariable Long id) {
        List<ApplicationDTO> applicationDTOList = applicationService.getAllApplicationByJobId(id);
        return new ResponseEntity<>(applicationDTOList, HttpStatus.OK);
    }
    @GetMapping("/user/{username}")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsByUsername(@PathVariable String username) {
        Long userId = userService.findUserIdByUsername(username);  // Dobijamo ID na osnovu korisničkog imena
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Korisnik nije pronađen
        }
        List<ApplicationDTO> applicationsDTOListDTO = applicationService.getApplicationsByUser(userId);
        return new ResponseEntity<>(applicationsDTOListDTO, HttpStatus.OK);
    }


}
