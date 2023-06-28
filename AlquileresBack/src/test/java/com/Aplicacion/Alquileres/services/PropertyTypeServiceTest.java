package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.PropertyType;
import com.Aplicacion.Alquileres.repositories.PropertyTypeRepository;
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
public class PropertyTypeServiceTest {
    @Autowired PropertyTypeService propertyTypeService;
    @Autowired
    private PropertyTypeRepository propertyTypeRepository;

    private List<PropertyType> propertyTypes = new ArrayList<>();

    //Borra todos los registros de la BDD despues de cada prueba
    @AfterEach
    void cleanDatabase() {
        propertyTypeRepository.deleteAll();
    }

    @BeforeEach
    public void setup() {
        PropertyType propertyType_1 = new PropertyType("Departament");
        PropertyType propertyType_2 = new PropertyType("House");
        propertyTypeService.createPropertyType(propertyType_1);
        propertyTypeService.createPropertyType(propertyType_2);

        propertyTypes.add(propertyType_1);
        propertyTypes.add(propertyType_2);
    }

    @DisplayName("Test for get all property types")
    @Test
    void getAllPropertyTypes() {
        //Given condicion previa

        //When accion o comportamiento que vamos a probar
        List<PropertyType> propertyTypes = propertyTypeService.getAll();

        //Then verificacion de la salida
        Assertions.assertThat(propertyTypes).isNotNull();
        Assertions.assertThat(propertyTypes.size()).isEqualTo(2);
    }

    @DisplayName("Test for create a property types")
    @Test
    public void createPropertyTypes() {
        //Given condicion previa

        //When accion o comportamiento que vamos a probar
        PropertyType propertyTypeSaved = propertyTypeService.createPropertyType(propertyTypes.get(0));

        //Then verificacion de la salida
        Assertions.assertThat(propertyTypeSaved).isNotNull();
        Assertions.assertThat(propertyTypeSaved.getIdType()).isGreaterThan(0);
    }

    @DisplayName("Test for update a property types")
    @Test
    public void updatePropertyTpes() {
        //Given condicion previa
        PropertyType propertyType = propertyTypes.get(0);
        PropertyType newPropertyType = propertyTypes.get(1);

        //When accion o comportamiento que vamos a probar
        Optional<PropertyType> propertyTypeSaved = propertyTypeService.updatePropertyType(newPropertyType,propertyType.getIdType());

        //Then verificacion de la salida
        Assertions.assertThat(propertyTypeSaved.get().getType()).isEqualTo("House");
    }

    @DisplayName("Test for delete a property type")
    @Test
    public void deletePropertyType() {
        //Given condicion previa
        PropertyType propertyType = propertyTypes.get(0);

        //When accion o comportamiento que vamos a probar
        propertyTypeService.deletePropertyType(propertyType.getIdType());
        PropertyType propertyDeleted = propertyTypeService.getById(1);

        //Then verificacion de la salida
        Assertions.assertThat(propertyDeleted).isNull();
    }
}
