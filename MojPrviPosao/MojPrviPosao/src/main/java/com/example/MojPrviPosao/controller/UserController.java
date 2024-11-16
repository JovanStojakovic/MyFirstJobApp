package com.example.MojPrviPosao.controller;

import com.example.MojPrviPosao.dto.CompanyDTO;
import com.example.MojPrviPosao.dto.UserDTO;
import com.example.MojPrviPosao.model.User;
import com.example.MojPrviPosao.services.JWTUtils;
import com.example.MojPrviPosao.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
    @RequestMapping("/user")
    public class UserController {


        @Autowired
        private UserService userService;
        @Autowired
        JWTUtils jwtUtils;
        @Autowired
        AuthenticationManager authenticationManager;

        @GetMapping("/currentUser")
        public ResponseEntity<UserDTO> getCurrentUser() {
            UserDTO currentUserDTO = userService.getCurrentUser();
            return ResponseEntity.ok(currentUserDTO);
        }
        @GetMapping("/all")
        public ResponseEntity<List<UserDTO>> getAllUsersIfJovan() {
            List<UserDTO> usersDto = userService.findAllUsersIfJovan();
            return ResponseEntity.ok(usersDto);
        }

        @PutMapping("/suspend/{username}")
        public ResponseEntity<String> suspendUser(@PathVariable String username) {
            try {
                userService.suspendUser(username);
                return ResponseEntity.ok("Korisnik " + username + " je suspendovan.");
            } catch (RuntimeException e) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
            }
        }

}
