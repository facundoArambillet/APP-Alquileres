package com.Aplicacion.Alquileres.repositories;

import com.Aplicacion.Alquileres.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExpenseRepository  extends JpaRepository<Expense,Integer> {
    @Query("SELECT e FROM Expense e ORDER BY e.idExpense DESC")
    List<Expense> getAllDesc();
}
