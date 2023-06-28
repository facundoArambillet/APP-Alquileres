package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.Property;
import com.Aplicacion.Alquileres.models.PropertyType;
import com.Aplicacion.Alquileres.repositories.PropertyRepository;
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
public class PropertyServiceTest {
    @Autowired
    private PropertyService propertyService;
    @Autowired
    private PropertyRepository propertyRepository;
    @Autowired
    private PropertyTypeService propertyTypeService;
    private List<Property> properties = new ArrayList<>();

    //Borra todos los registros de la BDD despues de cada prueba
    @AfterEach
    void cleanDatabase() {
        propertyRepository.deleteAll();
    }

    @BeforeEach
    public void setup() {
        PropertyType propertyType_1 = new PropertyType("Departament");
        PropertyType propertyType_2= new PropertyType("House");
        propertyTypeService.createPropertyType(propertyType_1);
        propertyTypeService.createPropertyType(propertyType_2);
        Property property_1 = new Property("Property 1",50000.0,"Street 1",50,"City 1","Description 1",10.0,propertyType_1.getIdType());
        Property property_2 = new Property("Property 2",100000.0,"Street 2",100,"City 2","Description 2",20.0,propertyType_2.getIdType());
        propertyService.createProperty(property_1);
        propertyService.createProperty(property_2);

        properties.add(property_1);
        properties.add(property_2);
    }

    @DisplayName("Test for get all property")
    @Test
    void getAllProperties() {
        //Given condicion previa
        propertyService.createProperty(properties.get(0));
        propertyService.createProperty(properties.get(1));

        //When accion o comportamiento que vamos a probar
        List<Property> properties = propertyService.getAll();

        //Then verificacion de la salida
        Assertions.assertThat(properties).isNotNull();
        Assertions.assertThat(properties.size()).isEqualTo(2);
    }

    @DisplayName("Test for create a property")
    @Test
    public void createProperty() {
        //Given condicion previa

        //When accion o comportamiento que vamos a probar
        Property propertySaved = propertyService.createProperty(properties.get(0));

        //Then verificacion de la salida
        Assertions.assertThat(propertySaved).isNotNull();
        Assertions.assertThat(propertySaved.getIdProperty()).isGreaterThan(0);
    }

    @DisplayName("Test for update a property")
    @Test
    public void updateProperty() {
        //Given condicion previa
        Property property = propertyService.createProperty(properties.get(0));
        Property newProperty = propertyService.createProperty(properties.get(1));

        //When accion o comportamiento que vamos a probar
        Optional<Property> propertySaved = propertyService.updateProperty(newProperty,property.getIdProperty());

        //Then verificacion de la salida
        Assertions.assertThat(propertySaved.get().getName()).isEqualTo("Property 2");
        Assertions.assertThat(propertySaved.get().getRentPrice()).isEqualTo(100000.0);
        Assertions.assertThat(propertySaved.get().getPercentageExpenses()).isEqualTo(20.0);
    }

    @DisplayName("Test for delete a property")
    @Test
    public void deleteProperty() {
        //Given condicion previa
        Property property = properties.get(0);

        //When accion o comportamiento que vamos a probar
        propertyService.deleteProperty(property.getIdProperty());
        Property propertyDeleted = propertyService.getById(1);

        //Then verificacion de la salida
        Assertions.assertThat(propertyDeleted).isNull();
    }
}
