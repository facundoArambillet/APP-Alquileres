package com.Aplicacion.Alquileres.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.engine.internal.Cascade;

import java.util.Date;
import java.util.List;

@Entity
@Getter @Setter
@Table(name = "utilities")
public class Utility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_utility")
    private Integer idUtility;

    private String description;
    private Date date;
    private Double price;
    @Column(name = "id_type")
    private Integer idType;

    @ManyToOne
    @JoinColumn(name = "id_type",insertable = false,updatable = false)
    private UtilityType utilityType;

/*    @ManyToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinTable(
            name = "invoices_has_utilities",
            joinColumns = @JoinColumn(name = "utilities_id_utility"),
            inverseJoinColumns = @JoinColumn(name = "invoices_id_invoice"))
    private List<Invoice> invoices;*/

    public Utility() {
    }
    public Utility(String description, Date date, Double price) {
        this.description = description;
        this.date = date;
        this.price = price;
    }
}
