package com.retodos;

import java.util.List;

import com.retodos.model.User;
import com.retodos.repository.crud.UserCrudRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RetodosApplication implements CommandLineRunner{
	@Autowired
	private UserCrudRepository userRepo;

	public static void main(String[] args) {
		SpringApplication.run(RetodosApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		userRepo.deleteAll();
		userRepo.saveAll(List.of(			
			new User(1, "123456", "alan brito", "CR 34-45", "311222222", "alanbrito@gmail.com", "Demo123.", "ZONA 1","ADM")			
		));
	}

}
