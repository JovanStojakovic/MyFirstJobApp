package com.example.MojPrviPosao.services;

import com.example.MojPrviPosao.dto.UserDTO;
import com.example.MojPrviPosao.dto.RegistrationDTO;
import com.example.MojPrviPosao.model.User;

import java.util.List;

public interface UserService {
    //KorisnikDTO findByUsername(String username);

   // KorisnikDTO findByUsername(String username);

    UserDTO register(RegistrationDTO registrationDTO);
    UserDTO getCurrentUser();
    Long findUserIdByUsername(String username);
    List<UserDTO> findAllUsersIfJovan();
    UserDTO getUserByUsername(String username);
    public void suspendUser(String username);

}
