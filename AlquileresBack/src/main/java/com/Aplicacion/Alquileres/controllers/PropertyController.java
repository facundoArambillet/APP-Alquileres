package com.Aplicacion.Alquileres.controllers;

import com.Aplicacion.Alquileres.models.Property;
import com.Aplicacion.Alquileres.services.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/properties")
public class PropertyController {
    @Autowired
    private PropertyService propertyService;

    @GetMapping()
    public ResponseEntity<List<Property>> getAll() {
        if(propertyService.getAll() != null) {
            return new ResponseEntity<List<Property>>(propertyService.getAll(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<Property>>(propertyService.getAll(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/allDesc")
    public ResponseEntity<List<Property>> getAllDesc() {
        if(propertyService.getAll() != null) {
            return new ResponseEntity<List<Property>>(propertyService.getAllDesc(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<Property>>(propertyService.getAllDesc(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Property> getById(@PathVariable("id") int id) {
        if(propertyService.getById(id) != null) {
            return new ResponseEntity<Property>(propertyService.getById(id), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Property>(propertyService.getById(id), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping()
    public ResponseEntity<Property> createProperty(@RequestBody Property newProperty) {
        if(propertyService.createProperty(newProperty) != null) {
            return new ResponseEntity<Property>(newProperty, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Property>(newProperty, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProperty(@RequestBody Property newProperty, @PathVariable("id") int id) {
        if(propertyService.updateProperty(newProperty,id) != null) {
            return new ResponseEntity<String>("Propiedad actualizada con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al actualizar propiedad", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProperty(@PathVariable("id") int id) {
        if(propertyService.deleteProperty(id) != null) {
            return new ResponseEntity<String>("Propiedad eliminada con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al eliminar propiedad", HttpStatus.NOT_FOUND);
        }
    }
}
