package com.retodos.controller;

import java.util.List;

import com.retodos.model.Chocolate;
import com.retodos.service.ChocolateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chocolate")
public class ChocolateController {
    @Autowired
    private ChocolateService servicio;
    
    @GetMapping("/all")
    public List<Chocolate> listar(){
        return servicio.listar();
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Chocolate registrar(@RequestBody Chocolate chocolate)
    {
        return servicio.save(chocolate);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Chocolate update(@RequestBody Chocolate chocolate)
    {
        return servicio.update(chocolate);
    }

    @DeleteMapping("{reference}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("reference") String reference) {
        return servicio.delete(reference);
    }

    @GetMapping("{id}")
    public Chocolate getProduct(@PathVariable("id") String id) {
        return servicio.getProduct(id);
    }
}
