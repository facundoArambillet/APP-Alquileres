package com.Aplicacion.Alquileres.repositories;

import com.Aplicacion.Alquileres.models.*;
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
public class InvoiceRepositoryTest {
    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private TenantRepository tenantRepository;
    @Autowired
    private PropertyRepository propertyRepository;
    @Autowired
    private PropertyTypeRepository propertyTypeRepository;
    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private UtilityRepository utilityRepository;
    @Autowired
    private UtilityTypeRepository utilityTypeRepository;

    private List<Invoice> invoices = new ArrayList<>();
    private List<Utility> utilities = new ArrayList<>();

    //Borra todos los registros de la BDD despues de cada prueba
    @AfterEach
    void cleanDatabase() {
        invoiceRepository.deleteAll();
    }

    @BeforeEach
    public void setup() {
        PropertyType propertyType = new PropertyType("Departament");
        propertyTypeRepository.save(propertyType);
        Property property = new Property("Property 1",50000.0,"Street",50,"City","Description",10.0,propertyType.getIdType());
        propertyRepository.save(property);
        Tenant tenant = new Tenant("Tenant 1","Last Name",123456789,"Street",100,"City",987654321L,"email@email.com",property.getIdProperty());
        tenantRepository.save(tenant);

        UtilityType utilityType_1 = new UtilityType("Electricity");
        UtilityType utilityType_2 = new UtilityType("Water");
        utilityTypeRepository.save(utilityType_1);
        utilityTypeRepository.save(utilityType_2);
        Utility utility_1 = new Utility("Description 1",new Date(),2000.0);
        Utility utility_2 = new Utility("Description 2",new Date(),4000.0);
        utility_1.setIdType(utilityType_1.getIdType());
        utility_2.setIdType(utilityType_2.getIdType());
        utilityRepository.save(utility_1);
        utilityRepository.save(utility_2);
        utilities.add(utility_1);
        utilities.add(utility_2);
        Expense expense = new Expense(utilities,"Expense 1");
        expense.calculateTotal();
        expenseRepository.save(expense);
        Invoice invoice = new Invoice(new Date(),"Detail",(property.getRentPrice() + expense.getTotal()),tenant.getIdTenant(),expense.getIdExpense());
        invoiceRepository.save(invoice);
        invoices.add(invoice);
    }

    @DisplayName("Test for get all invoices")
    @Test
    void getAllInvoices() {
        //Given condicion previa
        invoiceRepository.save(invoices.get(0));

        //When accion o comportamiento que vamos a probar
        List<Invoice> invoices = invoiceRepository.findAll();

        //Then verificacion de la salida
        Assertions.assertThat(invoices).isNotNull();
        Assertions.assertThat(invoices.size()).isEqualTo(1);
    }

    @DisplayName("Test for create a invoice")
    @Test
    public void createInvoice() {
        //Given condicion previa


        //When accion o comportamiento que vamos a probar
        Invoice invoiceSaved = invoiceRepository.save(invoices.get(0));

        //Then verificacion de la salida
        Assertions.assertThat(invoiceSaved).isNotNull();
        Assertions.assertThat(invoiceSaved.getIdExpense()).isGreaterThan(0);
    }

    @DisplayName("Test for update a invoice")
    @Test
    public void updateInvoice() {
        //Given condicion previa
        invoiceRepository.save(invoices.get(0));

        //When accion o comportamiento que vamos a probar
        Optional<Invoice> invoiceSaved = invoiceRepository.findById(invoices.get(0).getIdInvoice());

        invoiceSaved.map(
                invoice -> {
                    invoice.setDate(new Date(2023,6,25));
                    invoice.setDetail("detail updated");
                    invoice.setTotal(10000.9);
                    invoice.setIdTenant(2);
                    invoice.setIdExpense(2);
                    return invoiceRepository.save(invoice);
                }
        );

        //Then verificacion de la salida
        Assertions.assertThat(invoiceSaved.get().getDetail()).isEqualTo("detail updated");
        Assertions.assertThat(invoiceSaved.get().getTotal()).isEqualTo(10000.9);
        Assertions.assertThat(invoiceSaved.get().getDate()).isEqualTo(new Date(2023,6,25));
    }

    @DisplayName("Test for delete a invoice")
    @Test
    public void deleteInvoice() {
        //Given condicion previa
        invoiceRepository.save(invoices.get(0));
        int idInvoice = invoices.get(0).getIdInvoice();
        //When accion o comportamiento que vamos a probar
        invoiceRepository.delete(invoices.get(0));
        Optional<Invoice> invoiceDeleted = invoiceRepository.findById(idInvoice);

        //Then verificacion de la salida
        Assertions.assertThat(invoiceDeleted).isEmpty();
    }
}
