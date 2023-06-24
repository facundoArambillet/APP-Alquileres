package com.Aplicacion.Alquileres.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter @Setter
@Table(name = "invoices")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_invoice")
    private Integer idInvoice;
    private Date date;
    private String detail;
    private Double total;
    @Column(name = "id_tenant")
    private Integer idTenant;
    @Column(name = "id_expense")
    private Integer idExpense;

    @ManyToOne()
    @JoinColumn(name = "id_tenant",insertable = false,updatable = false)
    private Tenant tenant;

    @OneToOne()
    @JoinColumn(name = "id_expense", insertable=false, updatable=false)
    private Expense expense;

/*
    @ManyToMany()
    @JoinTable(
            name = "invoices_has_utilities",
            joinColumns = @JoinColumn(name = "invoices_id_invoice"),
            inverseJoinColumns = @JoinColumn(name = "utilities_id_utility"))
    private List<Utility> utilities;
*/

    public Invoice() {
    }

    public Invoice( Date date, String detail, Double total, Integer idTenant, Integer idExpense) { //  List<Integer> idsUtilities ,List<Utility> utilities
        this.date = date;
        this.detail = detail;
        this.total = total;
        this.idTenant = idTenant;
        this.idExpense = idExpense;
        //this.utilities = utilities;
        //this.idsUtilities = idsUtilities;
    }

}
