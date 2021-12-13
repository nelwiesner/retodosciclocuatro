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
        int id=0;
        try{
            id = crudInterface.findTopByOrderByIdDesc().get().getId()+1;
        }catch(Exception ex)
        {
            id=1;
        }

        if(user.getId()==null) {
            user.setId(id);
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
