package com.Aplicacion.Alquileres.repositories;

import com.Aplicacion.Alquileres.models.Expense;
import com.Aplicacion.Alquileres.models.UserRol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRolRepository extends JpaRepository<UserRol,Integer> {
    @Query("SELECT ur FROM UserRol ur ORDER BY ur.idRol DESC")
    List<UserRol> getAllDesc();
}
