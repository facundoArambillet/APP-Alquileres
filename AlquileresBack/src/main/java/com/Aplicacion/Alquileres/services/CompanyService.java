package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.Company;
import com.Aplicacion.Alquileres.repositories.CompanyRepository;
import jakarta.persistence.EntityExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    public List<Company> getAll() {
        try {
            return companyRepository.findAll();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public Company getById(int id) {
        try {
            return companyRepository.findById(id).orElseThrow();
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }

    public Company createCompany(Company newCompany) {
        Optional<Company> companySaved = companyRepository.findByName(newCompany.getName());
        if(companySaved.isPresent()) {
            throw new EntityExistsException("La compania ya existe: " + newCompany.getName());
        }
        else {
            return companyRepository.save(newCompany);
        }
    }

    public Optional<Company> updateCompany(Company newCompany, int id) {
        try {
            return companyRepository.findById(id).map(
                    company -> {
                        company.setName(newCompany.getName());
                        company.setPhoneNumber(newCompany.getPhoneNumber());
                        company.setCbu(newCompany.getCbu());
                        company.setPostalCode(newCompany.getPostalCode());
                        company.setCity(newCompany.getCity());
                        company.setCuit(newCompany.getCuit());
                        company.setPhoneNumber(newCompany.getPhoneNumber());
                        return companyRepository.save(company);
                    }
            );
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Company deleteCompany(int id) {
        try {
            Company companyDeleted = companyRepository.findById(id).orElseThrow();
            companyRepository.deleteById(id);
            return companyDeleted;
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }
}
