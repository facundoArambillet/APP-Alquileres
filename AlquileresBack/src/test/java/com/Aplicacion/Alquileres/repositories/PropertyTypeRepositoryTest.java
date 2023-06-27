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
public class PropertyTypeRepositoryTest {
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
        propertyTypeRepository.save(propertyType_1);
        propertyTypeRepository.save(propertyType_2);

        propertyTypes.add(propertyType_1);
        propertyTypes.add(propertyType_2);
    }

    @DisplayName("Test for get all property types")
    @Test
    void getAllPropertyTypes() {
        //Given condicion previa
        propertyTypeRepository.save(propertyTypes.get(0));
        propertyTypeRepository.save(propertyTypes.get(1));

        //When accion o comportamiento que vamos a probar
        List<PropertyType> propertyTypes = propertyTypeRepository.findAll();

        //Then verificacion de la salida
        Assertions.assertThat(propertyTypes).isNotNull();
        Assertions.assertThat(propertyTypes.size()).isEqualTo(2);
    }

    @DisplayName("Test for create a property types")
    @Test
    public void createPropertyTypes() {
        //Given condicion previa

        //When accion o comportamiento que vamos a probar
        PropertyType propertyTypeSaved = propertyTypeRepository.save(propertyTypes.get(0));

        //Then verificacion de la salida
        Assertions.assertThat(propertyTypeSaved).isNotNull();
        Assertions.assertThat(propertyTypeSaved.getIdType()).isGreaterThan(0);
    }

    @DisplayName("Test for update a property types")
    @Test
    public void updatePropertyTpes() {
        //Given condicion previa
        propertyTypeRepository.save(propertyTypes.get(0));

        //When accion o comportamiento que vamos a probar
        Optional<PropertyType> propertyTypeSaved = propertyTypeRepository.findById(propertyTypes.get(0).getIdType());

        propertyTypeSaved.map(
                propertyType -> {
                    propertyType.setType("Property type updated");
                    return propertyTypeRepository.save(propertyType);
                }
        );

        //Then verificacion de la salida
        Assertions.assertThat(propertyTypeSaved.get().getType()).isEqualTo("Property type updated");
    }

    @DisplayName("Test for delete a property type")
    @Test
    public void deletePropertyType() {
        //Given condicion previa
        propertyTypeRepository.save(propertyTypes.get(0));

        //When accion o comportamiento que vamos a probar
        propertyTypeRepository.delete(propertyTypes.get(0));
        Optional<PropertyType> propertyDeleted = propertyTypeRepository.findById(1);

        //Then verificacion de la salida
        Assertions.assertThat(propertyDeleted).isEmpty();
    }
}
