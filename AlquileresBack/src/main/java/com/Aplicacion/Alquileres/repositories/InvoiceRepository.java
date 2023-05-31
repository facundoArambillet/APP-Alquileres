package com.Aplicacion.Alquileres.repositories;

import com.Aplicacion.Alquileres.models.Expense;
import com.Aplicacion.Alquileres.models.Invoice;
import com.Aplicacion.Alquileres.models.Utility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice,Integer> {
    @Query("SELECT i FROM Invoice i ORDER BY i.idInvoice DESC LIMIT 5")
    List<Invoice> getLastFive();

    @Query("SELECT i FROM Invoice i ORDER BY i.idInvoice DESC")
    List<Invoice> getAllDesc();
}
