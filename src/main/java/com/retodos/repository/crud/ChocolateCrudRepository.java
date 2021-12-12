package com.retodos.repository.crud;

import com.retodos.model.Chocolate;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChocolateCrudRepository extends MongoRepository<Chocolate,String> {

}