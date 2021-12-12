package com.retodos.service;

import java.util.List;
import java.util.Optional;

import com.retodos.model.Chocolate;
import com.retodos.repository.ChocolateRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ChocolateService {
    
    @Autowired
    private ChocolateRepository repositorio;

    public List<Chocolate> listar() {
        return repositorio.listar();
    }

    public Chocolate save(Chocolate chocolate) {
        return repositorio.save(chocolate);
    }

    public boolean existeRefrence(String reference) {
        return repositorio.referenceExist(reference);
    }

    public Chocolate update(Chocolate chocolate) {        
        if (repositorio.referenceExist(chocolate.getReference())) {
            return repositorio.save(chocolate);
        } else {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Chocolate not found"
            );
        }
    }

    public boolean delete(String reference) {    
        Optional<Chocolate> chocolate= repositorio.chocolateExist(reference);    
        if (!chocolate.isEmpty()) {
            repositorio.delete(chocolate.get());
            return true;
        } else {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Chocolate not found"
            );
        }
    }
}
