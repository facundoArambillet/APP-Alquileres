package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.UserRol;
import com.Aplicacion.Alquileres.repositories.UserRolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserRolService {
    @Autowired
    private UserRolRepository userRolRepository;

    public List<UserRol> getAll() {
        try {
            return userRolRepository.findAll();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public List<UserRol> getAllDesc() {
        try {
            return userRolRepository.getAllDesc();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public UserRol getById(int id) {
        try {
            return userRolRepository.findById(id).orElseThrow();
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }

    public UserRol createUserRol(UserRol newUserRol) {
        try {
            return userRolRepository.save(newUserRol);
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Optional<UserRol> updateUserRol(UserRol newUserRol, int id) {
        try {
            return userRolRepository.findById(id).map(
                    userRol -> {
                        userRol.setType(newUserRol.getType());
                        return userRolRepository.save(userRol);
                    }
            );
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public UserRol deleteUserRole(int id) {
        try {
            UserRol userRolDeleted = userRolRepository.findById(id).orElseThrow();
            userRolRepository.deleteById(id);
            return userRolDeleted;
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }
}
