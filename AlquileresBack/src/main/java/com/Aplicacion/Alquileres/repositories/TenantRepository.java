package com.Aplicacion.Alquileres.repositories;

import com.Aplicacion.Alquileres.models.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TenantRepository extends JpaRepository<Tenant,Integer> {
    @Query("SELECT t FROM Tenant t ORDER BY t.idTenant DESC")
    List<Tenant> getAllDesc();
}
