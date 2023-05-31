package com.Aplicacion.Alquileres.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "user_roles")
public class UserRol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol")
    private Integer idRol;
    private String type;

    public UserRol() {
    }

    public UserRol(String type) {
        this.type = type;
    }
}
