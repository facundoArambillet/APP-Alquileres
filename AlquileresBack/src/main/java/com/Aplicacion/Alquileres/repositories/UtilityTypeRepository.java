package com.Aplicacion.Alquileres.repositories;

import com.Aplicacion.Alquileres.models.Expense;
import com.Aplicacion.Alquileres.models.UtilityType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UtilityTypeRepository extends JpaRepository<UtilityType,Integer> {
    @Query("SELECT ut FROM UtilityType ut ORDER BY ut.idType DESC")
    List<UtilityType> getAllDesc();
}
