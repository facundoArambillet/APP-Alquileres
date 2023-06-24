package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.Company;
import com.Aplicacion.Alquileres.models.Employee;
import com.Aplicacion.Alquileres.repositories.EmployeeRepository;
import jakarta.persistence.EntityExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAll() {
        try {
            return employeeRepository.findAll();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public Employee getById(int id) {
        try {
            return employeeRepository.findById(id).orElseThrow();
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }

    public Employee getByEmail(String email) {
        try {
            return employeeRepository.findByEmail(email);
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Optional<Employee> getByDNI(int dni) {
        try {
            return employeeRepository.findByDni(dni);
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Employee createEmployee(Employee newEmployee) {
        Optional<Employee> employeeSaved = employeeRepository.findByDni(newEmployee.getDni());
        if(employeeSaved.isPresent()) {
            throw new EntityExistsException("El dni del empleado ya existe: " + newEmployee.getDni());
        }
        else {
            return employeeRepository.save(newEmployee);
        }
    }

    public Optional<Employee> updateEmployee(Employee newEmployee, int id) {
        try {
            return employeeRepository.findById(id).map(
                    employee -> {
                        employee.setDni(newEmployee.getDni());
                        employee.setName(newEmployee.getName());
                        employee.setLastName(newEmployee.getLastName());
                        employee.setAge(newEmployee.getAge());
                        employee.setStreet(newEmployee.getStreet());
                        employee.setStreetNumber(newEmployee.getStreetNumber());
                        employee.setPostalCode(newEmployee.getPostalCode());
                        employee.setCity(newEmployee.getCity());
                        employee.setState(newEmployee.getState());
                        employee.setAreaCode(newEmployee.getAreaCode());
                        employee.setPhoneNumber(newEmployee.getPhoneNumber());
                        employee.setEmail(newEmployee.getEmail());
                        employee.setPosition(newEmployee.getPosition());
                        employee.setDescription(newEmployee.getDescription());
                        employee.setStartDate(newEmployee.getStartDate());
                        return employeeRepository.save(employee);
                    }
            );
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Employee deleteEmployee(int id) {
        try {
            Employee employeeDeleted = employeeRepository.findById(id).orElseThrow();
            employeeRepository.deleteById(id);
            return employeeDeleted;
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }

}
