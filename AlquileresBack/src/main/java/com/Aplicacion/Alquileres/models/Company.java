package com.Aplicacion.Alquileres.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "companies")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_company")
    private Integer idCompany;
    private String name;
    @Column(name = "phone_number")
    private Integer phoneNumber;
    private Integer cbu;
    @Column(name = "postal_code")
    private Integer postalCode;
    private String city;
    private Integer cuit;


    public Company() {
    }

    public Company(String name, Integer phoneNumber, Integer cbu, Integer postalCode, String city, Integer cuit) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.cbu = cbu;
        this.postalCode = postalCode;
        this.city = city;
        this.cuit = cuit;
    }
}
