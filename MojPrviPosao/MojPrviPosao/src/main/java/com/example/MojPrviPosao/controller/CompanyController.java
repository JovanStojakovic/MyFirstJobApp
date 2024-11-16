package com.example.MojPrviPosao.controller;

import com.example.MojPrviPosao.dto.CompanyDTO;
import com.example.MojPrviPosao.dto.JobDTO;
import com.example.MojPrviPosao.model.JobType;
import com.example.MojPrviPosao.services.CompanyService;
import com.example.MojPrviPosao.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/company")
public class CompanyController {
    @Autowired
    private CompanyService companyService;
    @Autowired
    private UserService userService;
    @PostMapping
    public ResponseEntity<CompanyDTO> addCompany(@Valid @RequestBody CompanyDTO companyDTO){
        CompanyDTO saveCompanyDTO = companyService.save(companyDTO);
        return new ResponseEntity<>(saveCompanyDTO, HttpStatus.CREATED);
    }
    @PutMapping("{id}")
    public ResponseEntity<CompanyDTO> updateCompanyById(@PathVariable long id, @RequestBody CompanyDTO companyDTO) {
        CompanyDTO updateCompanyDTO = companyService.update(id, companyDTO);
        return new ResponseEntity<>(updateCompanyDTO, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteByIdCompany (@PathVariable long id){
        companyService.deleteById(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<List<CompanyDTO>> getCompanyByUsername(@PathVariable String username) {
        Long userId = userService.findUserIdByUsername(username);  // Dobijamo ID na osnovu korisničkog imena
        if (userId == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Korisnik nije pronađen
        }
        List<CompanyDTO> companyDTOListDTO = companyService.getCompanyByUser(userId);
        return new ResponseEntity<>(companyDTOListDTO, HttpStatus.OK);
    }

   @GetMapping("/all")
   public ResponseEntity<List<CompanyDTO>> getAllCompaniesFilteredAndSorted(
           @RequestParam(value = "name", required = false) String companyName,
           @RequestParam(value = "place", required = false) String place) {

       List<CompanyDTO> allCompanyList = companyService.getAllCompaniesFiltered(companyName, place);

       return new ResponseEntity<>(allCompanyList, HttpStatus.OK);
   }
    @GetMapping("/{id}")
    public ResponseEntity<CompanyDTO> getCompanyById(@PathVariable long id) {
        CompanyDTO companyById = companyService.getCompanyById(id);
        return new ResponseEntity<>(companyById, HttpStatus.OK);
    }


}
