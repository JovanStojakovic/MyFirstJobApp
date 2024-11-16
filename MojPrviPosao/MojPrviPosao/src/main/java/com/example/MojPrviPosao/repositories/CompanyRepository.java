package com.example.MojPrviPosao.repositories;

import com.example.MojPrviPosao.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    List<Company> findAllByUserId(Long userId);

   // Company findByName(String companyName);
    List<Company> findByName(String name);
    List<Company> findByPlace(String place);
    List<Company> findByNameAndPlace(String name, String place);

}