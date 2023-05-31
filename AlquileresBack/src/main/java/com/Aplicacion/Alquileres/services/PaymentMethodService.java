package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.PaymentMethod;
import com.Aplicacion.Alquileres.repositories.PaymentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class PaymentMethodService {
    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    public List<PaymentMethod> getAll() {
        try {
            return paymentMethodRepository.findAll();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public PaymentMethod getById(int id) {
        try {
            return paymentMethodRepository.findById(id).orElseThrow();
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }

    public PaymentMethod createPaymentMethod(PaymentMethod newPaymentMethod) {
        try {
            return paymentMethodRepository.save(newPaymentMethod);
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Optional<PaymentMethod> updatePaymentMethod(PaymentMethod newPaymentMethod, int id) {
        try {
            return paymentMethodRepository.findById(id).map(
                    paymentMethod -> {
                        paymentMethod.setType(newPaymentMethod.getType());
                        return paymentMethodRepository.save(paymentMethod);
                    }
            );
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public PaymentMethod deletePaymentMethod(int id) {
        try {
            PaymentMethod paymentMethodDeleted = paymentMethodRepository.findById(id).orElseThrow();
            paymentMethodRepository.deleteById(id);
            return paymentMethodDeleted;
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }
}
