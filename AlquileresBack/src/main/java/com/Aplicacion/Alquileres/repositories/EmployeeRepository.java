package com.Aplicacion.Alquileres.repositories;

import com.Aplicacion.Alquileres.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee,Integer> {
    Employee findByEmail(String email);
    Optional<Employee> findByDni(Integer dni);
}
