package com.Aplicacion.Alquileres.controllers;

import com.Aplicacion.Alquileres.models.UtilityType;
import com.Aplicacion.Alquileres.services.UtilityTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/utilityTypes")
public class UtilityTypeController {
    @Autowired
    private UtilityTypeService utilityTypeService;

    @GetMapping()
    public ResponseEntity<List<UtilityType>> getAll() {
        if(utilityTypeService.getAll() != null) {
            return new ResponseEntity<List<UtilityType>>(utilityTypeService.getAll(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<UtilityType>>(utilityTypeService.getAll(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/allDesc")
    public ResponseEntity<List<UtilityType>> getAllDesc() {
        if(utilityTypeService.getAll() != null) {
            return new ResponseEntity<List<UtilityType>>(utilityTypeService.getAllDesc(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<UtilityType>>(utilityTypeService.getAllDesc(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UtilityType> getById(@PathVariable("id") int id) {
        if(utilityTypeService.getById(id) != null) {
            return new ResponseEntity<UtilityType>(utilityTypeService.getById(id), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<UtilityType>(utilityTypeService.getById(id), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping()
    public ResponseEntity<UtilityType> createUtilityType(@RequestBody UtilityType newUtilityType) {
        if(utilityTypeService.createUtilityType(newUtilityType) != null) {
            return new ResponseEntity<UtilityType>(newUtilityType, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<UtilityType>(newUtilityType, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUtilityType(@RequestBody UtilityType newUtilityType, @PathVariable("id") int id) {
        if(utilityTypeService.updateUtilityType(newUtilityType,id) != null) {
            return new ResponseEntity<String>("Tipo de servicio actualizado con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al actualizar tipo de servicio", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUtilityType(@PathVariable("id") int id) {
        if(utilityTypeService.deleteUtilityType(id) != null) {
            return new ResponseEntity<String>("Tipo de servicio eliminado con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al eliminar tipo de servicio", HttpStatus.NOT_FOUND);
        }
    }

}
