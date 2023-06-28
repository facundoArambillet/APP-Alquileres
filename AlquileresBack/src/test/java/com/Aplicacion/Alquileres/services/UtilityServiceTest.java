package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.Utility;
import com.Aplicacion.Alquileres.models.UtilityType;
import com.Aplicacion.Alquileres.repositories.UtilityRepository;
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
public class UtilityServiceTest {
    @Autowired
    private UtilityService utilityService;
    @Autowired
    private UtilityRepository utilityRepository;
    @Autowired
    private UtilityTypeService utilityTypeService;

    private List<Utility> utilities = new ArrayList<>();

    //Borra todos los registros de la BDD despues de cada prueba
    @AfterEach
    void cleanDatabase() {
        utilityRepository.deleteAll();
    }

    @BeforeEach
    public void setup() {
        UtilityType utilityType_1 = new UtilityType("Water");
        UtilityType utilityType_2 = new UtilityType("Electricity");
        utilityTypeService.createUtilityType(utilityType_1);
        utilityTypeService.createUtilityType(utilityType_2);

        Utility utility_1 = new Utility("Description utility 1",new Date(),5000.0);
        Utility utility_2 = new Utility("Description utility 2",new Date(2023,6,26),7000.0);
        utility_1.setIdType(utilityType_1.getIdType());
        utility_2.setIdType(utilityType_2.getIdType());
        utilityService.createUtility(utility_1);
        utilityService.createUtility(utility_2);
        utilities.add(utility_1);
        utilities.add(utility_2);
    }

    @DisplayName("Test for get all utilities")
    @Test
    void getAllUtilities() {
        //Given condicion previa

        //When accion o comportamiento que vamos a probar
        List<Utility> utilities = utilityService.getAll();

        //Then verificacion de la salida
        Assertions.assertThat(utilities).isNotNull();
        Assertions.assertThat(utilities.size()).isEqualTo(2);
    }

    @DisplayName("Test for create a utility")
    @Test
    public void createUtility() {
        //Given condicion previa
        Utility utility = utilities.get(0);
        //When accion o comportamiento que vamos a probar
        Utility utilitySaved = utilityService.createUtility(utility);

        //Then verificacion de la salida
        Assertions.assertThat(utilitySaved).isNotNull();
        Assertions.assertThat(utilitySaved.getIdUtility()).isGreaterThan(0);
    }

    @DisplayName("Test for update a utility")
    @Test
    public void updateUtility() {
        //Given condicion previa
        Utility utility = utilities.get(0);
        Utility newUtility = utilities.get(1);

        //When accion o comportamiento que vamos a probar
        Optional<Utility> utilitySaved = utilityService.updateUtility(newUtility,utility.getIdUtility());

        //Then verificacion de la salida
        Assertions.assertThat(utilitySaved.get().getDescription()).isEqualTo("Description utility 2");
        Assertions.assertThat(utilitySaved.get().getPrice()).isEqualTo(7000.0);

    }

    @DisplayName("Test for delete a utility")
    @Test
    public void deleteUtility() {
        //Given condicion previa
        Utility utility = utilities.get(0);

        //When accion o comportamiento que vamos a probar
        utilityService.deleteUtility(utility.getIdUtility());
        Utility utilityDeleted = utilityService.getById(1);

        //Then verificacion de la salida
        Assertions.assertThat(utilityDeleted).isNull();
    }
}
