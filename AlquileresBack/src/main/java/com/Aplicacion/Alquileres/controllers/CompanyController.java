package com.Aplicacion.Alquileres.controllers;

import com.Aplicacion.Alquileres.models.Company;
import com.Aplicacion.Alquileres.services.CompanyService;
import jakarta.persistence.EntityExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/companies")
public class CompanyController {
    @Autowired
    private CompanyService companyService;

    @GetMapping()
        public ResponseEntity<List<Company>> getAll() {
        if(companyService.getAll() != null) {
            return new ResponseEntity<List<Company>>(companyService.getAll(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<Company>>(companyService.getAll(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Company> getById(@PathVariable("id") int id) {
        if(companyService.getById(id) != null) {
            return new ResponseEntity<Company>(companyService.getById(id), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Company>(companyService.getById(id), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping()
    public ResponseEntity<Company> createCompany(@RequestBody Company newCompany) {
        try {
            Company createdCompany = companyService.createCompany(newCompany);
            return new ResponseEntity<Company>(createdCompany, HttpStatus.OK);
        }
        catch (EntityExistsException e) {
            return new ResponseEntity<Company>(HttpStatus.CONFLICT);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<String> updateCompany(@RequestBody Company newCompany, @PathVariable("id") int id) {
        if(companyService.updateCompany(newCompany,id) != null) {
            return new ResponseEntity<String>("Empresa actualizada con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al actualizar empresa", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCompany(@PathVariable("id") int id) {
        if(companyService.deleteCompany(id) != null) {
            return new ResponseEntity<String>("Empresa eliminada con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al eliminar empresa", HttpStatus.NOT_FOUND);
        }
    }

}
