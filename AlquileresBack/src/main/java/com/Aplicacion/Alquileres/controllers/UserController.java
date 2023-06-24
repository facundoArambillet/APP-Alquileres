package com.Aplicacion.Alquileres.controllers;

import com.Aplicacion.Alquileres.models.User;
import com.Aplicacion.Alquileres.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping()
    public ResponseEntity<List<User>> getAll() {
        if(userService.getAll() != null) {
            return new ResponseEntity<List<User>>(userService.getAll(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<User>>(userService.getAll(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/allDesc")
    public ResponseEntity<List<User>> getAllDesc() {
        if(userService.getAll() != null) {
            return new ResponseEntity<List<User>>(userService.getAllDesc(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<User>>(userService.getAllDesc(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable("id") int id) {
        if(userService.getById(id) != null) {
            return new ResponseEntity<User>(userService.getById(id), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<User>(userService.getById(id), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("email/{email}")
    public ResponseEntity<User> getByEmail(@PathVariable("email") String email) {
        if(userService.getByEmail(email) != null) {
            return new ResponseEntity<User>(userService.getByEmail(email), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<User>(userService.getByEmail(email), HttpStatus.NOT_FOUND);
        }
    }

/*    @PostMapping("/email")
    public ResponseEntity<User> getByEmaill(@RequestBody String email) {
        if(userService.getByEmail(email) != null) {
            return new ResponseEntity<User>(userService.getByEmail(email), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<User>(userService.getByEmail(email), HttpStatus.NOT_FOUND);
        }
    }*/

    @PostMapping()
    public ResponseEntity<User> createUser(@RequestBody User newUser) {
        if(userService.createUser(newUser) != null) {
            return new ResponseEntity<User>(newUser, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<User>(newUser, HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@RequestBody User newUser, @PathVariable("id") int id) {
        if(userService.updateUser(newUser,id) != null) {
            return new ResponseEntity<String>("Usuario actualizado con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al actualizar usuario", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") int id) {
        if(userService.deleteUser(id) != null) {
            return new ResponseEntity<String>("Usuario eliminado con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al eliminar usuario", HttpStatus.NOT_FOUND);
        }
    }
}
