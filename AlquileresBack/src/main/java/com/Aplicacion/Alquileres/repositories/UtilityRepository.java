package com.Aplicacion.Alquileres.repositories;

import com.Aplicacion.Alquileres.models.Expense;
import com.Aplicacion.Alquileres.models.Utility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UtilityRepository extends JpaRepository<Utility,Integer> {
    @Query("SELECT u FROM Utility u JOIN u.utilityType t WHERE t.type = :type")
    List<Utility> findByType(String type);

    @Query("SELECT u FROM Utility u ORDER BY u.idUtility DESC")
    List<Utility> getAllDesc();
}
