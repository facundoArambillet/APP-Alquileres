package com.Aplicacion.Alquileres.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "tenants")
public class Tenant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tenant")
    private Integer idTenant;
    private String name;
    @Column(name = "last_name")
    private String lastName;
    private Integer dni;
    private String street;
    @Column(name = "street_number")
    private Integer streetNumber;
    private String city;
    @Column(name = "phone_number")
    private Long phoneNumber;
    private String email;
    @Column(name = "id_property")
    private Integer idProperty;

    @OneToOne()
    @JoinColumn(name = "id_property",insertable = false,updatable = false)
    private Property property;

    public Tenant() {
    }

    public Tenant(String name, String lastName, Integer dni, String street, Integer streetNumber, String city, Long phoneNumber, String email, Integer idProperty) {
        this.name = name;
        this.lastName = lastName;
        this.dni = dni;
        this.street = street;
        this.streetNumber = streetNumber;
        this.city = city;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.idProperty = idProperty;
    }
}
