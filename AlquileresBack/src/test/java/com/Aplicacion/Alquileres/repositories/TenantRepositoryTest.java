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
import java.util.List;
import java.util.Optional;
@SpringBootTest(properties = {"spring.config.name=application-test"})
public class TenantRepositoryTest {
    @Autowired
    private TenantRepository tenantRepository;
    @Autowired
    private PropertyRepository propertyRepository;
    @Autowired
    private PropertyTypeRepository propertyTypeRepository;

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
        propertyTypeRepository.save(propertyType_1);
        propertyTypeRepository.save(propertyType_2);
        Property property_1 = new Property("Property 1",50000.0,"Street 1",50,"City 1","Description 1",10.0,propertyType_1.getIdType());
        Property property_2 = new Property("Property 2",100000.0,"Street 2",100,"City 2","Description 2",20.0,propertyType_2.getIdType());
        propertyRepository.save(property_1);
        propertyRepository.save(property_2);

        Tenant tenant_1 = new Tenant("Tenant 1","Last name 1",123456789,"Street tenant 1",150,"City tenant 1",987456321L,"email1@email.com",property_1.getIdProperty());
        Tenant tenant_2 = new Tenant("Tenant 2","Last name 2",987654321,"Street tenant 2",200,"City tenant 2",741258963L,"email2@email.com",property_2.getIdProperty());
        tenantRepository.save(tenant_1);
        tenantRepository.save(tenant_2);

        tenants.add(tenant_1);
        tenants.add(tenant_2);
    }

    @DisplayName("Test for get all tenants")
    @Test
    void getAllTenants() {
        //Given condicion previa
        tenantRepository.save(tenants.get(0));
        tenantRepository.save(tenants.get(1));

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
        Tenant tenantSaved = tenantRepository.save(tenants.get(0));

        //Then verificacion de la salida
        Assertions.assertThat(tenantSaved).isNotNull();
        Assertions.assertThat(tenantSaved.getIdTenant()).isGreaterThan(0);
    }

    @DisplayName("Test for update a tenant")
    @Test
    public void updateTenant() {
        //Given condicion previa
        tenantRepository.save(tenants.get(0));

        //When accion o comportamiento que vamos a probar
        Optional<Tenant> tenantSaved = tenantRepository.findById(tenants.get(0).getIdTenant());
        PropertyType propertyType_3 = new PropertyType("Local");
        propertyTypeRepository.save(propertyType_3);
        Property property_3 = new Property("Property 3",75000.0,"Street 3",25,"City 3","Description 3",30.0,propertyType_3.getIdType());
        propertyRepository.save(property_3);

        tenantSaved.map(
                tenant -> {
                    tenant.setName("Tenant updated");
                    tenant.setLastName("Last name updated");
                    tenant.setDni(369852147);
                    tenant.setStreet("Street updated");
                    tenant.setCity("City updated");
                    tenant.setPhoneNumber(357896412L);
                    tenant.setStreet("Street updated");
                    tenant.setStreetNumber(96);
                    tenant.setIdProperty(property_3.getIdProperty());
                    return tenantRepository.save(tenant);
                }
        );

        //Then verificacion de la salida
        Assertions.assertThat(tenantSaved.get().getName()).isEqualTo("Tenant updated");
        Assertions.assertThat(tenantSaved.get().getDni()).isEqualTo(369852147);
        Assertions.assertThat(tenantSaved.get().getIdProperty()).isEqualTo(property_3.getIdProperty());
    }

    @DisplayName("Test for delete a tenant")
    @Test
    public void deleteTenant() {
        //Given condicion previa
        tenantRepository.save(tenants.get(0));

        //When accion o comportamiento que vamos a probar
        tenantRepository.delete(tenants.get(0));
        Optional<Tenant> tenantDeleted = tenantRepository.findById(1);

        //Then verificacion de la salida
        Assertions.assertThat(tenantDeleted).isEmpty();
    }
}
