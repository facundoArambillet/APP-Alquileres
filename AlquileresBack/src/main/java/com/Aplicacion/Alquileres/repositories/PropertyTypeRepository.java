package com.Aplicacion.Alquileres.repositories;

import com.Aplicacion.Alquileres.models.Expense;
import com.Aplicacion.Alquileres.models.PropertyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PropertyTypeRepository extends JpaRepository<PropertyType,Integer> {
    @Query("SELECT p FROM PropertyType p ORDER BY p.idType DESC")
    List<Expense> getAllDesc();
}
