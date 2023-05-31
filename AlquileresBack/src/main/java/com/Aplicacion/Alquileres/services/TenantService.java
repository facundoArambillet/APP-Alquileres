package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.Tenant;
import com.Aplicacion.Alquileres.repositories.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class TenantService {
    @Autowired
    private TenantRepository tenantRepository;

    public List<Tenant> getAll() {
        try {
            return tenantRepository.findAll();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public List<Tenant> getAllDesc() {
        try {
            return tenantRepository.getAllDesc();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public Tenant getById(int id) {
        try {
            return tenantRepository.findById(id).orElseThrow();
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }

    public Tenant createTenant(Tenant newTenant) {
        try {
            return tenantRepository.save(newTenant);
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Optional<Tenant> updateTenant(Tenant newTenant, int id) {
        try {
            return tenantRepository.findById(id).map(
                    tenant -> {
                        tenant.setName(newTenant.getName());
                        tenant.setLastName(newTenant.getLastName());
                        tenant.setDni(newTenant.getDni());
                        tenant.setStreet(newTenant.getStreet());
                        tenant.setStreetNumber(newTenant.getStreetNumber());
                        tenant.setCity(newTenant.getCity());
                        tenant.setPhoneNumber(newTenant.getPhoneNumber());
                        tenant.setEmail(newTenant.getEmail());
                        return tenantRepository.save(tenant);
                    }
            );
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Tenant deleteTenant(int id) {
        try {
            Tenant tenantDeleted = tenantRepository.findById(id).orElseThrow();
            tenantRepository.deleteById(id);
            return tenantDeleted;
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }
}
