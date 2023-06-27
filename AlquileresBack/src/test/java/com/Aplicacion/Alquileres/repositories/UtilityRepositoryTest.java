package com.Aplicacion.Alquileres.repositories;

import com.Aplicacion.Alquileres.models.Utility;
import com.Aplicacion.Alquileres.models.UtilityType;
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
public class UtilityRepositoryTest {
    @Autowired
    private UtilityRepository utilityRepository;
    @Autowired
    private UtilityTypeRepository utilityTypeRepository;

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
        utilityTypeRepository.save(utilityType_1);
        utilityTypeRepository.save(utilityType_2);

        Utility utility_1 = new Utility("Description utility 1",new Date(),5000.0);
        Utility utility_2 = new Utility("Description utility 2",new Date(),7000.0);
        utility_1.setIdType(utilityType_1.getIdType());
        utility_2.setIdType(utilityType_2.getIdType());
        utilityRepository.save(utility_1);
        utilityRepository.save(utility_2);
        utilities.add(utility_1);
        utilities.add(utility_2);
    }

    @DisplayName("Test for get all utilities")
    @Test
    void getAllUtilities() {
        //Given condicion previa
        utilityRepository.save(utilities.get(0));
        utilityRepository.save(utilities.get(1));

        //When accion o comportamiento que vamos a probar
        List<Utility> utilities = utilityRepository.findAll();

        //Then verificacion de la salida
        Assertions.assertThat(utilities).isNotNull();
        Assertions.assertThat(utilities.size()).isEqualTo(2);
    }

    @DisplayName("Test for create a utility")
    @Test
    public void createUtility() {
        //Given condicion previa

        //When accion o comportamiento que vamos a probar
        Utility utilitySaved = utilityRepository.save(utilities.get(0));

        //Then verificacion de la salida
        Assertions.assertThat(utilitySaved).isNotNull();
        Assertions.assertThat(utilitySaved.getIdUtility()).isGreaterThan(0);
    }

    @DisplayName("Test for update a utility")
    @Test
    public void updateUtility() {
        //Given condicion previa
        utilityRepository.save(utilities.get(0));

        //When accion o comportamiento que vamos a probar
        Optional<Utility> utilitySaved = utilityRepository.findById(utilities.get(0).getIdUtility());

        utilitySaved.map(
                utility -> {
                    utility.setDescription("Description updated");
                    utility.setDate(new Date(2023,6,26));
                    utility.setPrice(8000.0);
                    return utilityRepository.save(utility);
                }
        );

        //Then verificacion de la salida
        Assertions.assertThat(utilitySaved.get().getDescription()).isEqualTo("Description updated");
        Assertions.assertThat(utilitySaved.get().getDate()).isEqualTo(new Date(2023,6,26));
        Assertions.assertThat(utilitySaved.get().getPrice()).isEqualTo(8000.0);

    }

    @DisplayName("Test for delete a utility")
    @Test
    public void deleteUtility() {
        //Given condicion previa
        utilityRepository.save(utilities.get(0));

        //When accion o comportamiento que vamos a probar
        utilityRepository.delete(utilities.get(0));
        Optional<Utility> utilityDeleted = utilityRepository.findById(1);

        //Then verificacion de la salida
        Assertions.assertThat(utilityDeleted).isEmpty();
    }
}
