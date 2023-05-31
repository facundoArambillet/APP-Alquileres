package com.Aplicacion.Alquileres.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "payment_methods")
public class PaymentMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idpayment_method")
    private Integer idPaymentMethod;
    private String type;

    public PaymentMethod() {
    }

    public PaymentMethod(String type) {
        this.type = type;
    }
}
