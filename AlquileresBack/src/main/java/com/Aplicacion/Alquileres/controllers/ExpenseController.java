package com.Aplicacion.Alquileres.controllers;

import com.Aplicacion.Alquileres.models.Expense;
import com.Aplicacion.Alquileres.services.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/expenses")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;

    @GetMapping()
    public ResponseEntity<List<Expense>> getAll() {
        if(expenseService.getAll() != null) {
            return new ResponseEntity<List<Expense>>(expenseService.getAll(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<Expense>>(expenseService.getAll(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/allDesc")
    public ResponseEntity<List<Expense>> getAllDesc() {
        if(expenseService.getAll() != null) {
            return new ResponseEntity<List<Expense>>(expenseService.getAllDesc(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<Expense>>(expenseService.getAllDesc(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Expense> getById(@PathVariable("id") int id) {
        if(expenseService.getById(id) != null) {
            return new ResponseEntity<Expense>(expenseService.getById(id), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Expense>(expenseService.getById(id), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping()
    public ResponseEntity<Expense> createExpense(@RequestBody Expense newExpense) {
        if(expenseService.createExpense(newExpense) != null) {
            return new ResponseEntity<Expense>(newExpense, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Expense>(newExpense, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateExpense(@RequestBody Expense newExpense, @PathVariable("id") int id) {
        if(expenseService.updateExpense(newExpense,id) != null) {
            return new ResponseEntity<String>("Expensa actualizada con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al actualizar expensa", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePropertyType(@PathVariable("id") int id) {
        if(expenseService.deleteExpense(id) != null) {
            return new ResponseEntity<String>("Expensa eliminada con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al eliminar expensa", HttpStatus.NOT_FOUND);
        }
    }
}
