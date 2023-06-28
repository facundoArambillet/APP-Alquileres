package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.Expense;
import com.Aplicacion.Alquileres.models.Utility;
import com.Aplicacion.Alquileres.models.UtilityType;
import com.Aplicacion.Alquileres.repositories.ExpenseRepository;
import com.Aplicacion.Alquileres.repositories.UtilityRepository;
import com.Aplicacion.Alquileres.repositories.UtilityTypeRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@SpringBootTest(properties = {"spring.config.name=application-test"})
public class ExpenseServiceTest {
    @Autowired
    private ExpenseService expenseService;
    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private UtilityRepository utilityRepository;
    @Autowired
    private UtilityTypeRepository utilityTypeRepository;

    private List<Utility> utilities = new ArrayList<>();

    //Borra todos los registros de la BDD despues de cada prueba
    @AfterEach
    void cleanDatabase() {
        expenseRepository.deleteAll();
    }

    @BeforeEach
    public void setup() {
        UtilityType utilityType_1 = new UtilityType("Electricity");
        utilityTypeRepository.save(utilityType_1);

        Utility utility_1 = new Utility("description 1",new Date(),2500.5);
        utility_1.setIdType(utilityType_1.getIdType());
        Utility utility_2 = new Utility("description 2",new Date(),3500.5);
        utility_2.setIdType(utilityType_1.getIdType());
        Utility utility_3 = new Utility("description 3",new Date(),4500.5);
        utility_3.setIdType(utilityType_1.getIdType());

        utilityRepository.save(utility_1);
        utilityRepository.save(utility_2);
        utilityRepository.save(utility_3);

        utilities.add(utility_1);
        utilities.add(utility_2);
        utilities.add(utility_3);
    }

    @DisplayName("Test for get all expenses")
    @Test
    void getAllExpenses() {
        //Given condicion previa
        Expense expense_1 = new Expense(utilities,"Expense 1");
        Expense expense_2 = new Expense(utilities,"Expense 2");
        expenseService.createExpense(expense_1);
        expenseService.createExpense(expense_2);

        //When accion o comportamiento que vamos a probar
        List<Expense> expenses = expenseService.getAll();

        //Then verificacion de la salida
        Assertions.assertThat(expenses).isNotNull();
        Assertions.assertThat(expenses.size()).isEqualTo(2);
    }

    @DisplayName("Test for create a expense")
    @Test
    public void createExpense() {
        //Given condicion previa
        Expense expense_1 = new Expense(utilities,"Expense 1");

        //When accion o comportamiento que vamos a probar
        Expense expenseSaved = expenseService.createExpense(expense_1);

        //Then verificacion de la salida
        Assertions.assertThat(expenseSaved).isNotNull();
        Assertions.assertThat(expenseSaved.getIdExpense()).isGreaterThan(0);
    }

    @DisplayName("Test for update a expense")
    @Test
    public void updateExpense() {
        //Given condicion previa
        Expense expense_1 = new Expense(utilities,"Expense 1");
        expenseService.createExpense(expense_1);

        UtilityType utilityType_1 = new UtilityType("Electricity");
        utilityTypeRepository.save(utilityType_1);

        List<Utility> utilitiesUpdate = new ArrayList<>();
        Utility utility_4 = new Utility("description 4",new Date(),5000.1);
        Utility utility_5 = new Utility("description 5",new Date(),6000.1);
        Utility utility_6 = new Utility("description 6",new Date(),7000.1);
        utility_4.setIdType(utilityType_1.getIdType());
        utility_5.setIdType(utilityType_1.getIdType());
        utility_6.setIdType(utilityType_1.getIdType());

        utilityRepository.save(utility_4);
        utilityRepository.save(utility_5);
        utilityRepository.save(utility_6);

        utilitiesUpdate.add(utility_4);
        utilitiesUpdate.add(utility_5);
        utilitiesUpdate.add(utility_6);
        Expense newExpense = new Expense(utilitiesUpdate,"New expense");

        //When accion o comportamiento que vamos a probar
        Optional<Expense> expenseUpdated = expenseService.updateExpense(newExpense, expense_1.getIdExpense());

        //Then verificacion de la salida
        Assertions.assertThat(expenseUpdated.get().getName()).isEqualTo("New expense");
        Assertions.assertThat(expenseUpdated.get().getTotal()).isEqualTo(18000.300000000003);
        //Assertions.assertThat(expenseUpdated.get().getUtilities()).isEqualTo(utilitiesUpdate);
        //Si no lo hago con un for, se referencia a objetos diferentes y falla el test
        for(int i = 0; i < expenseUpdated.get().getUtilities().size(); i++) {
            Assertions.assertThat(expenseUpdated.get().getUtilities().get(i).getPrice()).isEqualTo(utilitiesUpdate.get(i).getPrice());
        }
    }

    @DisplayName("Test for delete a expense")
    @Test
    public void deleteExpense() {
        //Given condicion previa
        Expense expense_1 = new Expense(utilities,"Expense 1");
        expenseService.createExpense(expense_1);

        //When accion o comportamiento que vamos a probar
        expenseService.deleteExpense(expense_1.getIdExpense());
        Expense expenseDeleted = expenseService.getById(1);

        //Then verificacion de la salida
        Assertions.assertThat(expenseDeleted).isNull();
    }
}
