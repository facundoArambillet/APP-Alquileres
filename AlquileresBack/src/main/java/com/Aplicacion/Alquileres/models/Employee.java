package com.Aplicacion.Alquileres.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter @Setter
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_employee")
    private Integer idEmployee;
    private Integer dni;
    private String name;
    @Column(name = "last_name")
    private String lastName;
    private Integer age;
    private String street;
    @Column(name = "street_number")
    private Integer streetNumber;
    @Column(name = "postal_code")
    private Integer postalCode;
    private String city;
    private String state;
    @Column(name = "area_code")
    private Integer areaCode;
    @Column(name = "phone_number")
    private Double phoneNumber;
    private String email;
    private String position;
    private String description;
    @Column(name = "start_date")
    private Date startDate;
    @Column(name = "id_company")
    private Integer idCompany;
    @ManyToOne()
    @JoinColumn(name = "id_company",insertable = false,updatable = false)
    private Company company;

    public Employee() {
    }

    public Employee(Integer dni, String name, String lastName, Integer age, String street, Integer streetNumber, Integer postalCode, String city, String state, Integer areaCode, Double phoneNumber, String email, String position, String description, Date startDate, Integer idCompany, Company company) {
        this.dni = dni;
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.street = street;
        this.streetNumber = streetNumber;
        this.postalCode = postalCode;
        this.city = city;
        this.state = state;
        this.areaCode = areaCode;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.position = position;
        this.description = description;
        this.startDate = startDate;
        this.idCompany = idCompany;
    }
}
