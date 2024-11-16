package com.example.MojPrviPosao.services.Impl;

import com.example.MojPrviPosao.Izuzetak.NotFoundException;
import com.example.MojPrviPosao.dto.CompanyDTO;
import com.example.MojPrviPosao.dto.JobDTO;
import com.example.MojPrviPosao.dto.UserDTO;
import com.example.MojPrviPosao.dto.RegistrationDTO;
import com.example.MojPrviPosao.model.Company;
import com.example.MojPrviPosao.model.User;
import com.example.MojPrviPosao.repositories.UserRepository;
import com.example.MojPrviPosao.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDTO register(RegistrationDTO registrationDTO) {
        // Provera da li postoji korisnik sa istim korisničkim imenom
        if (userRepository.existsByUsername(registrationDTO.getUsername())) {
            throw new RuntimeException("Korisnik sa datim korisničkim imenom već postoji.");
        }

        // Mapiramo RegistrationDTO u User
        User user = modelMapper.map(registrationDTO, User.class);
        user.setRola("User");

        // Inicijalizacija polja suspended na false
        user.setSuspended(false); // Postavljanje suspended na false

        // Hesovanje lozinke
        user.setPassword(passwordEncoder.encode(registrationDTO.getPassword()));
        user.setRegistrationDate(LocalDate.now());

        // Čuvanje korisnika u bazi
        User saveUser = userRepository.save(user);

        // Mapiranje sačuvanog korisnika u UserDTO
        return modelMapper.map(saveUser, UserDTO.class);
    }



    public UserDTO getCurrentUser() {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String trenutnoUlogovanUsername = auth.getName();

            User ulogovanUser = userRepository.findByUsername(trenutnoUlogovanUsername)
                    .orElseThrow(() -> new NotFoundException("Trenutno ulogovani korisnik nije pronađen"));

            UserDTO userDTO = modelMapper.map(ulogovanUser, UserDTO.class);
            return userDTO;
        }
        public Long findUserIdByUsername(String username) {
            Optional<User> user = userRepository.findByUsername(username);
            return user != null ? user.get().getId() : null;
        }
    @Override
    public List<UserDTO> findAllUsersIfJovan() {
        // Proveravamo da li je korisnik ulogovan
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String trenutnoUlogovanUsername = auth.getName();

        // Proveravamo da li je ulogovani korisnik "jovan"
        if ("jovan".equals(trenutnoUlogovanUsername)) {
            // Vraćamo listu svih korisnika osim "jovan"
            return userRepository.findAll().stream()
                    .filter(user -> !user.getUsername().equals(trenutnoUlogovanUsername))
                    .map(user -> modelMapper.map(user, UserDTO.class)) // Mapiranje na DTO
                    .collect(Collectors.toList());

        } else {
            throw new SecurityException("Nemate dozvolu za pregled svih korisnika");
        }
    }
    @Override
    public UserDTO getUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user == null) {
            throw new EntityNotFoundException("User not found with username: " + username);
        }
        return modelMapper.map(user, UserDTO.class);
    }
    @Override
    public void suspendUser(String username) {
        // Proveravamo da li je korisnik ulogovan
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String trenutnoUlogovanUsername = auth.getName();

        // Pronađi korisnika koji treba biti suspendovan
        Optional<User> optionalUser = userRepository.findByUsername(username);
        User user = optionalUser.orElseThrow(() -> new RuntimeException("Korisnik " + username + " ne postoji."));

        // Suspenduj korisnika
        user.setSuspended(true);
        userRepository.save(user);
    }

}



