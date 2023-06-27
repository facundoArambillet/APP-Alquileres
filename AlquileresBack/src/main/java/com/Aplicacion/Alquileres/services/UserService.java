package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.User;
import com.Aplicacion.Alquileres.models.UserRol;
import com.Aplicacion.Alquileres.repositories.UserRolRepository;
import com.Aplicacion.Alquileres.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRolRepository userRolRepository;

    public List<User> getAll() {
        try {
            return userRepository.findAll();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public List<User> getAllDesc() {
        try {
            return userRepository.getAllDesc();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public User getById(int id) {
        try {
            return userRepository.findById(id).orElseThrow();
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }

    public User getByEmail(String email) {
        try {
            return userRepository.findByEmail(email);
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }

    public User createUser(User newUser) {
        try {
            User user = userRepository.findByEmail(newUser.getEmail());
            if(user != null) {
                return null;
            }
            else {
                //Armo el REGEX para controlar que datos me ingresan al email
                Pattern pattern = Pattern.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
                Matcher matcher = pattern.matcher(newUser.getEmail());
                if(matcher.find()) {
                    UserRol rol = userRolRepository.findById(newUser.getIdRol()).orElseThrow();
                    newUser.setUserRol(rol);
                    newUser.setEmail(newUser.getEmail().toLowerCase());
                    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                    newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
                    return userRepository.save(newUser);
                }
                else {
                    throw  new IllegalArgumentException(("El correo electrónico ingresado no es válido"));
                }
            }
        }
        catch (NoSuchElementException ex) {
            System.out.println(ex.getMessage());
            return null;
        }
        catch (IllegalArgumentException ex) {
            System.out.println(ex.getMessage());
            return null;
        }
    }


/*    public User login(User user) {

            User oldUser = usuarioRepository.findByEmail(user.getEmail());
            if(oldUser != null) {
                if(oldUser.getEmail().equals(user.getEmail()) && oldUser.getPassword().equals(user.getPassword())) {
                    return oldUser;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
    }*/

    public Optional<User> updateUser(User newUser, int id) {
        try {
            return userRepository.findById(id).map(
                    user -> {
                        user.setEmail(newUser.getEmail());
                        user.setPassword(newUser.getPassword());
                        return userRepository.save(user);
                    }
            );
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public User deleteUser(int id) {
        try {
            User userDeleted = userRepository.findById(id).orElseThrow();
            userRepository.deleteById(id);
            return userDeleted;
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }
}
