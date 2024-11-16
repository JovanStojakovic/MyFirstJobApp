package com.example.MojPrviPosao;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.validation.annotation.Validated;

@SpringBootApplication
@Validated
public class MojPrviPosaoApplication {

	public static void main(String[] args) {
		SpringApplication.run(MojPrviPosaoApplication.class, args);
	}

}
