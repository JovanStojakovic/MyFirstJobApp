package com.example.MojPrviPosao.services;

import com.example.MojPrviPosao.dto.ApplicationDTO;
import com.example.MojPrviPosao.dto.CompanyDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ApplicationService {
    ApplicationDTO saveApplication(Long jobId, ApplicationDTO applicationDTO);

    List<ApplicationDTO> getAllApplicationByJobId(Long id);

    void deleteById(long id);
    List<ApplicationDTO> getApplicationsByUser(Long userId);

}
