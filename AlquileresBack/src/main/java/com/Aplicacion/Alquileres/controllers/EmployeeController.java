package com.Aplicacion.Alquileres.controllers;

import com.Aplicacion.Alquileres.models.Employee;
import com.Aplicacion.Alquileres.services.EmployeeService;
import jakarta.persistence.EntityExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping()
    public ResponseEntity<List<Employee>> getAll() {
        if(employeeService.getAll() != null) {
            return new ResponseEntity<List<Employee>>(employeeService.getAll(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<Employee>>(employeeService.getAll(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getById(@PathVariable("id") int id) {
        if(employeeService.getById(id) != null) {
            return new ResponseEntity<Employee>(employeeService.getById(id), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Employee>(employeeService.getById(id), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<Employee> getByEmail(@PathVariable("id") String nombre) {
        if(employeeService.getByEmail(nombre) != null) {
            return new ResponseEntity<Employee>(employeeService.getByEmail(nombre), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Employee>(employeeService.getByEmail(nombre), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/dni/{dni}")
    public ResponseEntity<Optional<Employee>> getByDNI(@PathVariable("dni") int dni) {
        if(employeeService.getByDNI(dni) != null) {
            return new ResponseEntity<Optional<Employee>>(employeeService.getByDNI(dni), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Optional<Employee>>(employeeService.getByDNI(dni), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping()
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee newEmployee) {
        try {
            Employee createdEmployee = employeeService.createEmployee(newEmployee);
            return new ResponseEntity<Employee>(createdEmployee, HttpStatus.OK);
        }
        catch (EntityExistsException e) {
            return new ResponseEntity<Employee>(HttpStatus.CONFLICT);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateEmployee(@RequestBody Employee newEmployee, @PathVariable("id") int id) {
        if(employeeService.updateEmployee(newEmployee,id) != null) {
            return new ResponseEntity<String>("Empleado actualizado con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al actualizar empleado", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") int id) {
        if(employeeService.deleteEmployee(id) != null) {
            return new ResponseEntity<String>("Empleado eliminado con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al eliminar empleado", HttpStatus.NOT_FOUND);
        }
    }

}
