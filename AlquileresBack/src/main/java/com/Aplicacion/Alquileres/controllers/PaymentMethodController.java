package com.Aplicacion.Alquileres.controllers;

import com.Aplicacion.Alquileres.models.PaymentMethod;
import com.Aplicacion.Alquileres.models.PropertyType;
import com.Aplicacion.Alquileres.services.PaymentMethodService;
import com.Aplicacion.Alquileres.services.PropertyTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Controller
@RequestMapping("/paymentMethod")
public class PaymentMethodController {
    @Autowired
    private PaymentMethodService paymentMethodService;

    @GetMapping()
    public ResponseEntity<List<PaymentMethod>> getAll() {
        if(paymentMethodService.getAll() != null) {
            return new ResponseEntity<List<PaymentMethod>>(paymentMethodService.getAll(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<PaymentMethod>>(paymentMethodService.getAll(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentMethod> getById(@PathVariable("id") int id) {
        if(paymentMethodService.getById(id) != null) {
            return new ResponseEntity<PaymentMethod>(paymentMethodService.getById(id), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<PaymentMethod>(paymentMethodService.getById(id), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping()
    public ResponseEntity<PaymentMethod> createPaymentMethod(@RequestBody PaymentMethod newPaymentMethod) {
        if(paymentMethodService.createPaymentMethod(newPaymentMethod) != null) {
            return new ResponseEntity<PaymentMethod>(newPaymentMethod, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<PaymentMethod>(newPaymentMethod, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updatePaymentMethod(@RequestBody PaymentMethod newPaymentMethod, @PathVariable("id") int id) {
        if(paymentMethodService.updatePaymentMethod(newPaymentMethod,id) != null) {
            return new ResponseEntity<String>("Metodo de pago actualizada con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al actualizar Metodo de pago", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePaymentMethod(@PathVariable("id") int id) {
        if(paymentMethodService.deletePaymentMethod(id) != null) {
            return new ResponseEntity<String>("Metodo de pago eliminada con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al eliminar Metodo de pago", HttpStatus.NOT_FOUND);
        }
    }
}
