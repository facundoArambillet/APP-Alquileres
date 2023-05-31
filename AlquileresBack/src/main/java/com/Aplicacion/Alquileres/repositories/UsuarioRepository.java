package com.Aplicacion.Alquileres.repositories;

import com.Aplicacion.Alquileres.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsuarioRepository extends JpaRepository<User,Integer> {
    User findByEmail(String email);

    @Query("SELECT u FROM User u ORDER BY u.idUser DESC")
    List<User> getAllDesc();
}
