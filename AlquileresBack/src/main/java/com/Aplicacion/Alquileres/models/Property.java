package com.Aplicacion.Alquileres.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_property")
    private Integer idProperty;
    private String name;
    @Column(name = "rent_price")
    private Double rentPrice;
    private String street;
    @Column(name = "street_number")
    private Integer streetNumber;
    private String city;
    private String description;
    @Column(name = "percentages_expenses")
    private Double percentageExpenses;
    @Column(name = "id_type")
    private Integer idType;

    @ManyToOne()
    @JoinColumn(name = "id_type",insertable = false,updatable = false)
    private PropertyType propertyType;

    public Property() {
    }

    public Property(String name, Double rentPrice, String street, Integer streetNumber, String city, String description, Double percentageExpenses, Integer idType) {
        this.name = name;
        this.rentPrice = rentPrice;
        this.street = street;
        this.streetNumber = streetNumber;
        this.city = city;
        this.description = description;
        this.percentageExpenses = percentageExpenses;
        this.idType = idType;
    }
}

