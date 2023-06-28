package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.User;
import com.Aplicacion.Alquileres.models.UserRol;
import com.Aplicacion.Alquileres.repositories.UserRepository;
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
public class UserServiceTest {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserRolService userRolService;

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
        userRolService.createUserRol(userRol_1);
        userRolService.createUserRol(userRol_2);

        User user_1 = new User("user1@user.com","password user 1",userRol_1.getIdRol());
        User user_2 = new User("user2@user.com","password user 2", userRol_2.getIdRol());
        userService.createUser(user_1);
        userService.createUser(user_2);

        users.add(user_1);
        users.add(user_2);
    }

    @DisplayName("Test for get all users")
    @Test
    void getAllUsers() {
        //Given condicion previa

        //When accion o comportamiento que vamos a probar
        List<User> users = userService.getAll();

        //Then verificacion de la salida
        Assertions.assertThat(users).isNotNull();
        Assertions.assertThat(users.size()).isEqualTo(2);
    }

    @DisplayName("Test for create a user")
    @Test
    public void createUser() {
        //Given condicion previa
        //Creo otro usuario porque si intento crear un usuario que ya existe el service me devuelve null
        UserRol userRol_3 = new UserRol("Advanced");
        userRol_3.setIdRol(3);
        User user_3 = new User("user3@user.com","password user 3",userRol_3.getIdRol());
        //When accion o comportamiento que vamos a probar
        User userSaved = userService.createUser(user_3);

        //Then verificacion de la salida
        Assertions.assertThat(userSaved.getEmail()).isNotNull();
        Assertions.assertThat(userSaved.getIdUser()).isGreaterThan(0);
    }

    @DisplayName("Test for update a user")
    @Test
    public void updateUser() {
        //Given condicion previa
        User user = users.get(0);
        User newUser = users.get(1);

        //When accion o comportamiento que vamos a probar
        Optional<User> userSaved = userService.updateUser(newUser,user.getIdUser());

        //Then verificacion de la salida
        Assertions.assertThat(userSaved.get().getEmail()).isEqualTo("user2@user.com");
    }

    @DisplayName("Test for delete a user")
    @Test
    public void deleteUser() {
        //Given condicion previa
        User user = users.get(0);

        //When accion o comportamiento que vamos a probar
        userService.deleteUser(users.get(0).getIdUser());
        Optional<User> userDeleted = userRepository.findById(1);

        //Then verificacion de la salida
        Assertions.assertThat(userDeleted).isEmpty();
    }
}
