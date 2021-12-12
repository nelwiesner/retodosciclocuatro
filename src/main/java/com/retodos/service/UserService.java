package com.retodos.service;

import java.util.List;
import java.util.Optional;

import com.retodos.model.User;
import com.retodos.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/**
 *
 * @author Nelson Wiesner
 */
@Service
public class UserService {
    @Autowired
    private UserRepository repositorio;

    public List<User> listar(){
        return repositorio.listar();
    }

    public User save(User user) {
        if (user.getId() == null) {
            if (existeEmail(user.getEmail()) == false) {
                return repositorio.save(user);
            } else {
                return user;
            }
        } else {
            return user;
        }
    }

    public User update(User user) {        
        if (repositorio.existeEmail(user.getEmail())) {
            return repositorio.save(user);
        } else {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User not found"
            );
        }
    }

    public boolean delete(int id) {    
        Optional<User> usuario= repositorio.userExist(id);    
        if (!usuario.isEmpty()) {
            repositorio.delete(usuario.get());
            return true;
        } else {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User not found"
            );
        }
    }



    public boolean existeEmail(String email){
        return repositorio.existeEmail(email);
    }

    public User autenticarUsuario(String email,String password) {
        Optional<User> usuario = repositorio.autenticarUsuario(email, password);

        if (usuario.isEmpty()) {
            return new User(email, password, "NO DEFINIDO");
        } else{
            return usuario.get();
        }
    }

}
