package com.Aplicacion.Alquileres.repositories;

import com.Aplicacion.Alquileres.models.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod,Integer> {
}
