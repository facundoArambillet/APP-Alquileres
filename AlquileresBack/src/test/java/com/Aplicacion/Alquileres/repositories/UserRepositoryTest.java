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
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserRolRepository userRolRepository;

    private List<User> users = new ArrayList<>();

    //Borra todos los registros de la BDD despues de cada prueba
    @AfterEach
    void cleanDatabase() {
        userRepository.deleteAll();
    }

    @BeforeEach
    public void setup() {
        UserRol userRol_1 = new UserRol("Admin");
        UserRol userRol_2 = new UserRol("Basic");
        userRolRepository.save(userRol_1);
        userRolRepository.save(userRol_2);

        User user_1 = new User("user1@user.com","password user 1",userRol_1.getIdRol());
        User user_2 = new User("user2@user.com","password user 2", userRol_2.getIdRol());
        userRepository.save(user_1);
        userRepository.save(user_2);

        users.add(user_1);
        users.add(user_2);
    }

    @DisplayName("Test for get all users")
    @Test
    void getAllUsers() {
        //Given condicion previa
        userRepository.save(users.get(0));
        userRepository.save(users.get(1));

        //When accion o comportamiento que vamos a probar
        List<User> users = userRepository.findAll();

        //Then verificacion de la salida
        Assertions.assertThat(users).isNotNull();
        Assertions.assertThat(users.size()).isEqualTo(2);
    }

    @DisplayName("Test for create a user")
    @Test
    public void createUser() {
        //Given condicion previa

        //When accion o comportamiento que vamos a probar
        User userSaved = userRepository.save(users.get(0));

        //Then verificacion de la salida
        Assertions.assertThat(userSaved).isNotNull();
        Assertions.assertThat(userSaved.getIdUser()).isGreaterThan(0);
    }

    @DisplayName("Test for update a user")
    @Test
    public void updateUser() {
        //Given condicion previa
        userRepository.save(users.get(0));

        //When accion o comportamiento que vamos a probar
        Optional<User> userSaved = userRepository.findById(users.get(0).getIdUser());


        userSaved.map(
                user -> {
                    user.setEmail("Email updated");
                    user.setPassword("Password updated");
                    user.setIdRol(users.get(1).getIdRol());
                    return userRepository.save(user);
                }
        );

        //Then verificacion de la salida
        Assertions.assertThat(userSaved.get().getEmail()).isEqualTo("Email updated");
        Assertions.assertThat(userSaved.get().getPassword()).isEqualTo("Password updated");
        Assertions.assertThat(userSaved.get().getIdRol()).isEqualTo(users.get(1).getIdRol());
    }

    @DisplayName("Test for delete a user")
    @Test
    public void deleteUser() {
        //Given condicion previa
        userRepository.save(users.get(0));

        //When accion o comportamiento que vamos a probar
        userRepository.delete(users.get(0));
        Optional<User> userDeleted = userRepository.findById(1);

        //Then verificacion de la salida
        Assertions.assertThat(userDeleted).isEmpty();
    }
}
