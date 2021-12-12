
package com.retodos.controller;

import java.util.List;

import com.retodos.model.User;
import com.retodos.service.UserService;
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

/**
 *
 * @author desarrolloextremo
 */
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService servicio;
    
    @GetMapping("/all")
    public List<User> listar(){
        return servicio.listar();
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User registrar(@RequestBody User user)
    {
        return servicio.save(user);
    }

    @GetMapping("/{email}/{password}")
    public User autenticarUsuario(@PathVariable("email") String email, @PathVariable("password") String password) {
        return servicio.autenticarUsuario(email, password);
    }

    @GetMapping("/emailexist/{email}")
    public boolean existeEmail(@PathVariable("email") String email) {
        return servicio.existeEmail(email);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public User update(@RequestBody User user)
    {
        return servicio.update(user);
    }

    
    @DeleteMapping("{id}")
    public boolean delete(@PathVariable("id") int id) {
        return servicio.delete(id);
    }

    @GetMapping("{id}")
    public User getUser(@PathVariable("id") int id) {
        return servicio.getUser(id);
    }
}
