package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.Property;
import com.Aplicacion.Alquileres.models.PropertyType;
import com.Aplicacion.Alquileres.models.Tenant;
import com.Aplicacion.Alquileres.repositories.TenantRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@SpringBootTest(properties = {"spring.config.name=application-test"})
public class TenantServiceTest {
    @Autowired
    private TenantService tenantService;
    @Autowired
    private TenantRepository tenantRepository;
    @Autowired
    private PropertyService propertyService;
    @Autowired
    private PropertyTypeService propertyTypeService;

    private List<Tenant> tenants = new ArrayList<>();

    //Borra todos los registros de la BDD despues de cada prueba
    @AfterEach
    void cleanDatabase() {
        tenantRepository.deleteAll();
    }

    @BeforeEach
    public void setup() {
        PropertyType propertyType_1 = new PropertyType("Departament");
        PropertyType propertyType_2 = new PropertyType("House");
        propertyTypeService.createPropertyType(propertyType_1);
        propertyTypeService.createPropertyType(propertyType_2);
        Property property_1 = new Property("Property 1",50000.0,"Street 1",50,"City 1","Description 1",10.0,propertyType_1.getIdType());
        Property property_2 = new Property("Property 2",100000.0,"Street 2",100,"City 2","Description 2",20.0,propertyType_2.getIdType());
        propertyService.createProperty(property_1);
        propertyService.createProperty(property_2);

        Tenant tenant_1 = new Tenant("Tenant 1","Last name 1",123456789,"Street tenant 1",150,"City tenant 1",987456321L,"email1@email.com",property_1.getIdProperty());
        Tenant tenant_2 = new Tenant("Tenant 2","Last name 2",987654321,"Street tenant 2",200,"City tenant 2",741258963L,"email2@email.com",property_2.getIdProperty());
        tenantService.createTenant(tenant_1);
        tenantService.createTenant(tenant_2);

        tenants.add(tenant_1);
        tenants.add(tenant_2);
    }

    @DisplayName("Test for get all tenants")
    @Test
    void getAllTenants() {
        //Given condicion previa


        //When accion o comportamiento que vamos a probar
        List<Tenant> tenants = tenantRepository.findAll();

        //Then verificacion de la salida
        Assertions.assertThat(tenants).isNotNull();
        Assertions.assertThat(tenants.size()).isEqualTo(2);
    }

    @DisplayName("Test for create a tenant")
    @Test
    public void createTenant() {
        //Given condicion previa

        //When accion o comportamiento que vamos a probar
        Tenant tenantSaved = tenantService.createTenant(tenants.get(0));

        //Then verificacion de la salida
        Assertions.assertThat(tenantSaved).isNotNull();
        Assertions.assertThat(tenantSaved.getIdTenant()).isGreaterThan(0);
    }

    @DisplayName("Test for update a tenant")
    @Test
    public void updateTenant() {
        //Given condicion previa
        Tenant tenant = tenants.get(0);
        Tenant newTenant = tenants.get(1);

        //When accion o comportamiento que vamos a probar
        Optional<Tenant> tenantSaved = tenantService.updateTenant(newTenant,tenant.getIdTenant());

        //Then verificacion de la salida
        Assertions.assertThat(tenantSaved.get().getName()).isEqualTo("Tenant 2");
        Assertions.assertThat(tenantSaved.get().getDni()).isEqualTo(987654321);
        Assertions.assertThat(tenantSaved.get().getEmail()).isEqualTo("email2@email.com");
    }

    @DisplayName("Test for delete a tenant")
    @Test
    public void deleteTenant() {
        //Given condicion previa
        Tenant tenant = tenants.get(0);

        //When accion o comportamiento que vamos a probar
        tenantService.deleteTenant(tenant.getIdTenant());
        Tenant tenantDeleted = tenantService.getById(1);

        //Then verificacion de la salida
        Assertions.assertThat(tenantDeleted).isNull();
    }
}
