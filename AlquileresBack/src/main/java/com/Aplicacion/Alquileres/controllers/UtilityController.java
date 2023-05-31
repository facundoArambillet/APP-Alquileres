package com.Aplicacion.Alquileres.controllers;

import com.Aplicacion.Alquileres.models.Utility;
import com.Aplicacion.Alquileres.services.UtilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/utilities")
public class UtilityController {
    @Autowired
    private UtilityService utilityService;

    @GetMapping()
    public ResponseEntity<List<Utility>> getAll() {
        if(utilityService.getAll() != null) {
            return new ResponseEntity<List<Utility>>(utilityService.getAll(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<Utility>>(utilityService.getAll(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/allDesc")
    public ResponseEntity<List<Utility>> getAllDesc() {
        if(utilityService.getAll() != null) {
            return new ResponseEntity<List<Utility>>(utilityService.getAllDesc(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<Utility>>(utilityService.getAllDesc(), HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Utility> getById(@PathVariable("id") int id) {
        if(utilityService.getById(id) != null) {
            return new ResponseEntity<Utility>(utilityService.getById(id), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Utility>(utilityService.getById(id), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Utility>> getByType(@PathVariable("type") String type) {
        if(utilityService.getByType(type) != null) {
            return new ResponseEntity<List<Utility>>(utilityService.getByType(type), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<Utility>>(utilityService.getByType(type), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping()
    public ResponseEntity<Utility> createUtility(@RequestBody Utility newUtility) {
        if(utilityService.createUtility(newUtility) != null) {
            return new ResponseEntity<Utility>(newUtility, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Utility>(newUtility, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUtility(@RequestBody Utility newUtility, @PathVariable("id") int id) {
        if(utilityService.updateUtility(newUtility,id) != null) {
            return new ResponseEntity<String>("Servicio actualizado con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al actualizar servicio", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUtility(@PathVariable("id") int id) {
        if(utilityService.deleteUtility(id) != null) {
            return new ResponseEntity<String>("Servicio eliminado con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al eliminar servicio", HttpStatus.NOT_FOUND);
        }
    }
}
