package com.Aplicacion.Alquileres.repositories;

import com.Aplicacion.Alquileres.models.Expense;
import com.Aplicacion.Alquileres.models.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property,Integer> {
    @Query("SELECT p FROM Property p ORDER BY p.idProperty DESC")
    List<Property> getAllDesc();
}
