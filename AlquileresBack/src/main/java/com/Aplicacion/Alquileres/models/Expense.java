package com.Aplicacion.Alquileres.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter @Setter
@Table(name = "expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_expense")
    private Integer idExpense;
    private Double  total;
    private String name;

    @ManyToMany()
    @JoinTable(
            name = "expenses_has_utilities",
            joinColumns = @JoinColumn(name = "expenses_id_expense"),
            inverseJoinColumns = @JoinColumn(name = "utilities_id_utility"))
    private List<Utility> utilities;

    public Expense() {
    }

    public Expense(List<Utility> utilities,String name) {
        this.name = name;
        this.utilities = utilities;
        calculateTotal();
    }

    public void calculateTotal() {
        this.total = 0.0;
        if (this.utilities != null) {
            for (Utility utility : this.utilities) {
                this.total += utility.getPrice();
            }
        }
    }
}

