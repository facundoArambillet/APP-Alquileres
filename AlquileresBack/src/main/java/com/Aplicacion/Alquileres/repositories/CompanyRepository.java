package com.Aplicacion.Alquileres.repositories;

import com.Aplicacion.Alquileres.models.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company,Integer> {
    Optional<Company> findByName(String name);
}
