package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.UtilityType;
import com.Aplicacion.Alquileres.repositories.UtilityTypeRepository;
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
public class UtilityTypeServiceTest {
    @Autowired
    private UtilityTypeService utilityTypeService;
    @Autowired
    private UtilityTypeRepository utilityTypeRepository;

    private List<UtilityType> utilityTypes = new ArrayList<>();

    //Borra todos los registros de la BDD despues de cada prueba
    @AfterEach
    void cleanDatabase() {
        utilityTypeRepository.deleteAll();
    }

    @BeforeEach
    public void setup() {
        UtilityType utilityType_1 = new UtilityType("Water");
        UtilityType utilityType_2 = new UtilityType("Electricity");
        utilityTypeService.createUtilityType(utilityType_1);
        utilityTypeService.createUtilityType(utilityType_2);
        utilityTypes.add(utilityType_1);
        utilityTypes.add(utilityType_2);
    }

    @DisplayName("Test for get all utility types")
    @Test
    void getAllUtilityTypes() {
        //Given condicion previa

        //When accion o comportamiento que vamos a probar
        List<UtilityType> utilityTypes = utilityTypeService.getAll();

        //Then verificacion de la salida
        Assertions.assertThat(utilityTypes).isNotNull();
        Assertions.assertThat(utilityTypes.size()).isEqualTo(2);
    }

    @DisplayName("Test for create a utility type")
    @Test
    public void createUtilityType() {
        //Given condicion previa
        UtilityType utilityType = utilityTypes.get(0);
        //When accion o comportamiento que vamos a probar
        UtilityType utilityTypeSaved = utilityTypeService.createUtilityType(utilityType);

        //Then verificacion de la salida
        Assertions.assertThat(utilityTypeSaved).isNotNull();
        Assertions.assertThat(utilityTypeSaved.getIdType()).isGreaterThan(0);
    }

    @DisplayName("Test for update a utility type")
    @Test
    public void updateUtilityType() {
        //Given condicion previa
        UtilityType utilityType = utilityTypes.get(0);
        UtilityType newUtilityType = utilityTypes.get(1);

        //When accion o comportamiento que vamos a probar
        Optional<UtilityType> utilityTypeSaved = utilityTypeService.updateUtilityType(newUtilityType,utilityType.getIdType());

        //Then verificacion de la salida
        Assertions.assertThat(utilityTypeSaved.get().getType()).isEqualTo("Electricity");

    }

    @DisplayName("Test for delete a utility type")
    @Test
    public void deleteUtilityType() {
        //Given condicion previa
        UtilityType utilityType = utilityTypes.get(0);

        //When accion o comportamiento que vamos a probar
        utilityTypeService.deleteUtilityType(utilityType.getIdType());
        UtilityType utilityTypeDeleted = utilityTypeService.getById(1);

        //Then verificacion de la salida
        Assertions.assertThat(utilityTypeDeleted).isNull();
    }
}
