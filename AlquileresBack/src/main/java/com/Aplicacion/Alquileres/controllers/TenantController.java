package com.Aplicacion.Alquileres.controllers;

import com.Aplicacion.Alquileres.models.Tenant;
import com.Aplicacion.Alquileres.services.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/tenants")
public class TenantController {
    @Autowired
    private TenantService tenantService;

    @GetMapping()
    public  ResponseEntity<List<Tenant>> getAll() {
        if(tenantService.getAll() != null) {
            return new ResponseEntity<List<Tenant>>(tenantService.getAll(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<Tenant>>(tenantService.getAll(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/allDesc")
    public  ResponseEntity<List<Tenant>> getAllDesc() {
        if(tenantService.getAll() != null) {
            return new ResponseEntity<List<Tenant>>(tenantService.getAllDesc(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<Tenant>>(tenantService.getAllDesc(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tenant> getById(@PathVariable("id") int id) {
        if(tenantService.getById(id) != null) {
            return new ResponseEntity<Tenant>(tenantService.getById(id), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Tenant>(tenantService.getById(id), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping()
    public ResponseEntity<Tenant> createTenant(@RequestBody Tenant newTenant) {
        if(tenantService.createTenant(newTenant) != null) {
            return new ResponseEntity<Tenant>(newTenant, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Tenant>(newTenant, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateTenant(@RequestBody Tenant newTenant, @PathVariable("id") int id) {
        if(tenantService.updateTenant(newTenant,id) != null) {
            return new ResponseEntity<String>("Inquilino actualizado con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al actualizar Inquilino", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTenant(@PathVariable("id") int id) {
        if(tenantService.deleteTenant(id) != null) {
            return new ResponseEntity<String>("Inquilino eliminado con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al eliminar Inquilino", HttpStatus.NOT_FOUND);
        }
    }
}
