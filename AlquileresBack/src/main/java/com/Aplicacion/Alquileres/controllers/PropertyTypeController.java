package com.Aplicacion.Alquileres.controllers;

import com.Aplicacion.Alquileres.models.PropertyType;
import com.Aplicacion.Alquileres.services.PropertyTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/propertyTypes")
public class PropertyTypeController {
    @Autowired
    private PropertyTypeService propertyTypeService;

    @GetMapping()
    public ResponseEntity<List<PropertyType>> getAll() {
        if(propertyTypeService.getAll() != null) {
            return new ResponseEntity<List<PropertyType>>(propertyTypeService.getAll(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<PropertyType>>(propertyTypeService.getAll(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/allDesc")
    public ResponseEntity<List<PropertyType>> getAllDesc() {
        if(propertyTypeService.getAll() != null) {
            return new ResponseEntity<List<PropertyType>>(propertyTypeService.getAllDesc(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<PropertyType>>(propertyTypeService.getAllDesc(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyType> getById(@PathVariable("id") int id) {
        if(propertyTypeService.getById(id) != null) {
            return new ResponseEntity<PropertyType>(propertyTypeService.getById(id), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<PropertyType>(propertyTypeService.getById(id), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping()
    public ResponseEntity<PropertyType> createPropertyType(@RequestBody PropertyType newPropertyType) {
        if(propertyTypeService.createPropertyType(newPropertyType) != null) {
            return new ResponseEntity<PropertyType>(newPropertyType, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<PropertyType>(newPropertyType, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updatePropertyType(@RequestBody PropertyType newPropertyType, @PathVariable("id") int id) {
        if(propertyTypeService.updatePropertyType(newPropertyType,id) != null) {
            return new ResponseEntity<String>("Tipo de propiedad actualizada con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al actualizar Tipo de propiedad", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePropertyType(@PathVariable("id") int id) {
        if(propertyTypeService.deletePropertyType(id) != null) {
            return new ResponseEntity<String>("Tipo de propiedad eliminada con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al eliminar Tipo de propiedad", HttpStatus.NOT_FOUND);
        }
    }
}
