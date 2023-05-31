package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.Employee;
import com.Aplicacion.Alquileres.models.Expense;
import com.Aplicacion.Alquileres.repositories.EmployeeRepository;
import com.Aplicacion.Alquileres.repositories.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepository expenseRepository;

    public List<Expense> getAll() {
        try {
            return expenseRepository.findAll();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public List<Expense> getAllDesc() {
        try {
            return expenseRepository.getAllDesc();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public Expense getById(int id) {
        try {
            return expenseRepository.findById(id).orElseThrow();
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }


    public Expense createExpense(Expense newExpense) {
        try {
            newExpense.calculateTotal();
            return expenseRepository.save(newExpense);
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Optional<Expense> updateExpense(Expense newExpense, int id) {
        try {
            return expenseRepository.findById(id).map(
                    expense -> {
                        expense.setName(newExpense.getName());
                        expense.setUtilities(newExpense.getUtilities());
                        expense.setTotal(newExpense.getTotal());
                        return expenseRepository.save(expense);
                    }
            );
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Expense deleteExpense(int id) {
        try {
            Expense expenseDeletes = expenseRepository.findById(id).orElseThrow();
            expenseRepository.deleteById(id);
            return expenseDeletes;
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }
}
