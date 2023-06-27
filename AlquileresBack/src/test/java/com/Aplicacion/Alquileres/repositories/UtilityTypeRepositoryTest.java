package com.Aplicacion.Alquileres.repositories;


import com.Aplicacion.Alquileres.models.UtilityType;
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
public class UtilityTypeRepositoryTest {

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
        utilityTypeRepository.save(utilityType_1);
        utilityTypeRepository.save(utilityType_2);
        utilityTypes.add(utilityType_1);
        utilityTypes.add(utilityType_2);
    }

    @DisplayName("Test for get all utility types")
    @Test
    void getAllUtilityTypes() {
        //Given condicion previa
        utilityTypeRepository.save(utilityTypes.get(0));
        utilityTypeRepository.save(utilityTypes.get(1));

        //When accion o comportamiento que vamos a probar
        List<UtilityType> utilityTypes = utilityTypeRepository.findAll();

        //Then verificacion de la salida
        Assertions.assertThat(utilityTypes).isNotNull();
        Assertions.assertThat(utilityTypes.size()).isEqualTo(2);
    }

    @DisplayName("Test for create a utility type")
    @Test
    public void createUtilityType() {
        //Given condicion previa

        //When accion o comportamiento que vamos a probar
        UtilityType utilityTypeSaved = utilityTypeRepository.save(utilityTypes.get(0));

        //Then verificacion de la salida
        Assertions.assertThat(utilityTypeSaved).isNotNull();
        Assertions.assertThat(utilityTypeSaved.getIdType()).isGreaterThan(0);
    }

    @DisplayName("Test for update a utility type")
    @Test
    public void updateUtilityType() {
        //Given condicion previa
        utilityTypeRepository.save(utilityTypes.get(0));

        //When accion o comportamiento que vamos a probar
        Optional<UtilityType> utilityTypeSaved = utilityTypeRepository.findById(utilityTypes.get(0).getIdType());

        utilityTypeSaved.map(
                utilityType -> {
                    utilityType.setType("Type updated");
                    return utilityTypeRepository.save(utilityType);
                }
        );

        //Then verificacion de la salida
        Assertions.assertThat(utilityTypeSaved.get().getType()).isEqualTo("Type updated");

    }

    @DisplayName("Test for delete a utility type")
    @Test
    public void deleteUtilityType() {
        //Given condicion previa
        utilityTypeRepository.save(utilityTypes.get(0));

        //When accion o comportamiento que vamos a probar
        utilityTypeRepository.delete(utilityTypes.get(0));
        Optional<UtilityType> utilityTypeDeleted = utilityTypeRepository.findById(1);

        //Then verificacion de la salida
        Assertions.assertThat(utilityTypeDeleted).isEmpty();
    }
}
