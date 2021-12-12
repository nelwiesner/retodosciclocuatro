package com.retodos.repository;

import java.util.List;
import java.util.Optional;

import com.retodos.model.User;
import com.retodos.repository.crud.UserCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author desarrolloextremo
 */
@Repository
public class UserRepository {
    @Autowired
    private UserCrudRepository crudInterface;

    public List<User> listar(){
        return crudInterface.findAll();
    }

    public User save(User user){
        if(user.getId()==null) {
            user.setId(crudInterface.findTopByOrderByIdDesc().get().getId()+1);
        }
        return crudInterface.save(user);
    }

    public void delete(User user){
        crudInterface.delete(user);
    }

    public Optional<User> userExist(Integer id){
        Optional<User> usuario=crudInterface.findById(id);
        return usuario;
    }

    public boolean existeEmail(String email){
        Optional<User> usuario=crudInterface.findByEmail(email);
        return !usuario.isEmpty();
    }

    public Optional<User> autenticarUsuario(String email,String password) {
        return crudInterface.findByEmailAndPassword (email, password);
    }
}
