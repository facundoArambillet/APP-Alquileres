package com.Aplicacion.Alquileres.repositories;

import com.Aplicacion.Alquileres.models.UserRol;
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
public class UserRolRepositoryTest {

    @Autowired
    private UserRolRepository userRolRepository;

    private List<UserRol> userRols = new ArrayList<>();

    //Borra todos los registros de la BDD despues de cada prueba
    @AfterEach
    void cleanDatabase() {
        userRolRepository.deleteAll();
    }

    @BeforeEach
    public void setup() {
        UserRol userRol_1 = new UserRol("Admin");
        UserRol userRol_2 = new UserRol("Basic");
        userRolRepository.save(userRol_1);
        userRolRepository.save(userRol_2);
        userRols.add(userRol_1);
        userRols.add(userRol_2);
    }

    @DisplayName("Test for get all user rols")
    @Test
    void getAllUserRols() {
        //Given condicion previa
        userRolRepository.save(userRols.get(0));
        userRolRepository.save(userRols.get(1));

        //When accion o comportamiento que vamos a probar
        List<UserRol> userRols = userRolRepository.findAll();

        //Then verificacion de la salida
        Assertions.assertThat(userRols).isNotNull();
        Assertions.assertThat(userRols.size()).isEqualTo(2);
    }

    @DisplayName("Test for create a user rol")
    @Test
    public void createUserRol() {
        //Given condicion previa

        //When accion o comportamiento que vamos a probar
        UserRol userRolSaved = userRolRepository.save(userRols.get(0));

        //Then verificacion de la salida
        Assertions.assertThat(userRolSaved).isNotNull();
        Assertions.assertThat(userRolSaved.getIdRol()).isGreaterThan(0);
    }

    @DisplayName("Test for update a user rol")
    @Test
    public void updateUserRol() {
        //Given condicion previa
        userRolRepository.save(userRols.get(0));

        //When accion o comportamiento que vamos a probar
        Optional<UserRol> userRolSaved = userRolRepository.findById(userRols.get(0).getIdRol());

        userRolSaved.map(
                userRol -> {
                    userRol.setType("Type updated");
                    return userRolRepository.save(userRol);
                }
        );

        //Then verificacion de la salida
        Assertions.assertThat(userRolSaved.get().getType()).isEqualTo("Type updated");
        Assertions.assertThat(userRolSaved.get().getIdRol()).isEqualTo(userRols.get(0).getIdRol());
    }

    @DisplayName("Test for delete a user rol")
    @Test
    public void deleteUser() {
        //Given condicion previa
        userRolRepository.save(userRols.get(0));

        //When accion o comportamiento que vamos a probar
        userRolRepository.delete(userRols.get(0));
        Optional<UserRol> userRolDeleted = userRolRepository.findById(1);

        //Then verificacion de la salida
        Assertions.assertThat(userRolDeleted).isEmpty();
    }
}
