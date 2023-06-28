package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.*;
import com.Aplicacion.Alquileres.repositories.InvoiceRepository;
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
public class InvoiceServiceTest {
    @Autowired
    private InvoiceService invoiceService;
    @Autowired
    private ExpenseService expenseService;
    @Autowired
    private UtilityService utilityService;
    @Autowired
    private UtilityTypeService utilityTypeService;
    @Autowired
    private TenantService tenantService;
    @Autowired
    private PropertyService propertyService;
    @Autowired
    private PropertyTypeService propertyTypeService;
    @Autowired
    private InvoiceRepository invoiceRepository;

    private List<Invoice> invoices = new ArrayList<>();

    private List<Utility> utilities = new ArrayList<>();

    //Borra todos los registros de la BDD despues de cada prueba
    @AfterEach
    void cleanDatabase() {
        invoiceRepository.deleteAll();
    }

    @BeforeEach
    public void setup() {
        UtilityType utilityType_1 = new UtilityType("Water");
        UtilityType utilityType_2 = new UtilityType("Electricity");
        utilityTypeService.createUtilityType(utilityType_1);
        utilityTypeService.createUtilityType(utilityType_2);

        Utility utility_1 = new Utility("Description utility 1",new Date(),5000.0);
        Utility utility_2 = new Utility("Description utility 2",new Date(),6000.0);
        Utility utility_3 = new Utility("Description utility 3",new Date(),7000.0);
        utility_1.setIdType(utilityType_1.getIdType());
        utility_2.setIdType(utilityType_2.getIdType());
        utility_3.setIdType(utilityType_2.getIdType());
        utilityService.createUtility(utility_1);
        utilityService.createUtility(utility_2);
        utilityService.createUtility(utility_3);
        utilities.add(utility_1);
        utilities.add(utility_2);
        utilities.add(utility_3);

        Expense expense = new Expense(utilities,"Expense name");
        expenseService.createExpense(expense);

        PropertyType propertyType_1 = new PropertyType("Departament");
        PropertyType propertyType_2 = new PropertyType("House");
        propertyTypeService.createPropertyType(propertyType_1);
        propertyTypeService.createPropertyType(propertyType_2);

        Property property_1 = new Property("Property 1",60000.0,"Street property 1",150,
                "City property 1","Description property 1",15.0,propertyType_1.getIdType());
        Property property_2 = new Property("Property 2",70000.0,"Street property 2",200,
                "City property 2","Description property 2",20.0,propertyType_2.getIdType());
        propertyService.createProperty(property_1);
        propertyService.createProperty(property_2);

        Tenant tenant_1 = new Tenant("Name tenant 1","Last name tenant 1",123456789,"Street tenant 1",
                450,"City tenant 1",2983547621L,"Email1@email.com",property_1.getIdProperty());
        Tenant tenant_2 = new Tenant("Name tenant 2","Last name tenant 2",789456123,"Street tenant 2",
                500,"City tenant 2",789541236L,"Email2@email.com",property_2.getIdProperty());
        tenantService.createTenant(tenant_1);
        tenantService.createTenant(tenant_2);

        Invoice invoice_1 = new Invoice(new Date(),"Detail invoice 1",((expense.getTotal() * (property_1.getPercentageExpenses() /100)) + property_1.getRentPrice()),tenant_1.getIdTenant(),expense.getIdExpense());
        Invoice invoice_2 = new Invoice(new Date(),"Detail invoice 2",((expense.getTotal() * (property_2.getPercentageExpenses() /100)) + property_2.getRentPrice()),tenant_2.getIdTenant(),expense.getIdExpense());
        invoiceService.createInvoice(invoice_1);
        invoiceService.createInvoice(invoice_2);
        invoices.add(invoice_1);
        invoices.add(invoice_2);
    }

    @DisplayName("Test for get all invoices")
    @Test
    void getAllInvoices() {
        //Given condicion previa

        //When accion o comportamiento que vamos a probar
        List<Invoice> invoices = invoiceService.getAll();

        //Then verificacion de la salida
        Assertions.assertThat(invoices).isNotNull();
        Assertions.assertThat(invoices.size()).isEqualTo(2);
    }

    @DisplayName("Test for create a invoice")
    @Test
    public void createInvoice() {
        //Given condicion previa


        //When accion o comportamiento que vamos a probar
        Invoice invoiceSaved = invoiceService.createInvoice(invoices.get(0));

        //Then verificacion de la salida
        Assertions.assertThat(invoiceSaved).isNotNull();
        Assertions.assertThat(invoiceSaved.getIdExpense()).isGreaterThan(0);
    }

    @DisplayName("Test for update a invoice")
    @Test
    public void updateInvoice() {
        //Given condicion previa
        Invoice invoice = invoiceService.createInvoice(invoices.get(0));
        Invoice newInvoice = invoices.get(1);

        //When accion o comportamiento que vamos a probar
        Optional<Invoice> invoiceUpdated = invoiceService.updateInvoice(newInvoice, invoice.getIdInvoice());

        //Then verificacion de la salida
        Assertions.assertThat(invoiceUpdated.get().getDetail()).isEqualTo("Detail invoice 2");
        Assertions.assertThat(invoiceUpdated.get().getTotal()).isEqualTo(73600.0);


    }

    @DisplayName("Test for delete a invoice")
    @Test
    public void deleteInvoice() {
        //Given condicion previa
        invoiceService.createInvoice(invoices.get(0));

        //When accion o comportamiento que vamos a probar
        invoiceService.deleteInvoice(invoices.get(0).getIdInvoice());
        Invoice invoiceDeleted = invoiceService.getById(1);

        //Then verificacion de la salida
        Assertions.assertThat(invoiceDeleted).isNull();
    }
}
