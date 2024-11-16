package com.example.MojPrviPosao.services;

import com.example.MojPrviPosao.dto.CompanyDTO;
import com.example.MojPrviPosao.dto.JobDTO;

import java.util.List;

public interface CompanyService {
    CompanyDTO save(CompanyDTO companyDTO);

    CompanyDTO update(long id, CompanyDTO companyDTO);

    void deleteById(long id);
    List<CompanyDTO> getCompanyByUser(Long userId);
    List<CompanyDTO> getAllCompaniesFiltered(String companyName, String place);
    CompanyDTO getCompanyById(long id);
}
