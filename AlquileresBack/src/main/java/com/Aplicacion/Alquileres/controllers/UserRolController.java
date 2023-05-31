package com.Aplicacion.Alquileres.controllers;

import com.Aplicacion.Alquileres.models.UserRol;
import com.Aplicacion.Alquileres.services.UserRolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/userRol")
public class UserRolController {
    @Autowired
    private UserRolService userRolService;

    @GetMapping()
    public ResponseEntity<List<UserRol>> getAll() {
        if(userRolService.getAll() != null) {
            return new ResponseEntity<List<UserRol>>(userRolService.getAll(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<UserRol>>(userRolService.getAll(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/allDesc")
    public ResponseEntity<List<UserRol>> getAllDesc() {
        if(userRolService.getAll() != null) {
            return new ResponseEntity<List<UserRol>>(userRolService.getAll(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<UserRol>>(userRolService.getAll(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserRol> getById(@PathVariable("id") int id) {
        if(userRolService.getById(id) != null) {
            return new ResponseEntity<UserRol>(userRolService.getById(id), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<UserRol>(userRolService.getById(id), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping()
    public ResponseEntity<UserRol> createUserRol(@RequestBody UserRol newUserRole) {
        if(userRolService.createUserRol(newUserRole) != null) {
            return new ResponseEntity<UserRol>(newUserRole, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<UserRol>(newUserRole, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUserRol(@RequestBody UserRol newUserRol, @PathVariable("id") int id) {
        if(userRolService.updateUserRol(newUserRol,id) != null) {
            return new ResponseEntity<String>("Rol de usuario actualizada con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al actualizar Rol de usuario", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUserRol(@PathVariable("id") int id) {
        if(userRolService.deleteUserRole(id) != null) {
            return new ResponseEntity<String>("Rol de usuario eliminada con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al eliminar Rol de usuario", HttpStatus.NOT_FOUND);
        }
    }
}
