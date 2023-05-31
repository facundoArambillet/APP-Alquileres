package com.Aplicacion.Alquileres.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "property_types")
public class PropertyType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idproperty_type")
    private Integer idType;
    private String type;

    public PropertyType() {
    }

    public PropertyType(String type) {
        this.type = type;
    }
}
