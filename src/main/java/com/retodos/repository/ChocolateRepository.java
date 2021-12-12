package com.retodos.repository;

import java.util.List;
import java.util.Optional;

import com.retodos.model.Chocolate;
import com.retodos.repository.crud.ChocolateCrudRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ChocolateRepository {
    @Autowired
    private ChocolateCrudRepository crudInterface;

    public List<Chocolate> listar() {
        return crudInterface.findAll();
    }

    public Chocolate save(Chocolate chocolate) {
        return crudInterface.save(chocolate);
    }

    public void delete(Chocolate chocolate) {
        crudInterface.delete(chocolate);
    }

    public boolean referenceExist(String reference) {
        Optional<Chocolate> chocolate= crudInterface.findById(reference);
        return !chocolate.isEmpty();
    }

    public Optional<Chocolate> chocolateExist(String reference){
        Optional<Chocolate> chocolate=crudInterface.findById(reference);
        return chocolate;
    }
}