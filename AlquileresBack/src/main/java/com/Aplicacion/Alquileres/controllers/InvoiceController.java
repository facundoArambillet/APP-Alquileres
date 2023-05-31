package com.Aplicacion.Alquileres.controllers;

import com.Aplicacion.Alquileres.models.Invoice;
import com.Aplicacion.Alquileres.services.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/invoices")
public class InvoiceController {
    @Autowired
    private InvoiceService invoiceService;

    @GetMapping()
    public ResponseEntity<List<Invoice>> getAll() {
        if(invoiceService.getAll() != null) {
            return new ResponseEntity<List<Invoice>>(invoiceService.getAll(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<Invoice>>(invoiceService.getAll(), HttpStatus.NOT_FOUND);
        }

    }
    @GetMapping("/allDesc")
    public ResponseEntity<List<Invoice>> getAllDesc() {
        if(invoiceService.getAll() != null) {
            return new ResponseEntity<List<Invoice>>(invoiceService.getAllDesc(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<Invoice>>(invoiceService.getAllDesc(), HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getById(@PathVariable("id") int id) {
        if(invoiceService.getById(id) != null) {
            return new ResponseEntity<Invoice>(invoiceService.getById(id), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Invoice>(invoiceService.getById(id), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/lastFive")
    public ResponseEntity<List<Invoice>> getLastFive() {
        if(invoiceService.getLastFive() != null) {
            return new ResponseEntity<List<Invoice>>(invoiceService.getLastFive(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<List<Invoice>>(invoiceService.getLastFive(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping()
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice newInvoice) {
        if(invoiceService.createInvoice(newInvoice) != null) {
            return new ResponseEntity<Invoice>(newInvoice, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<Invoice>(newInvoice, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateInvoice(@RequestBody Invoice newInvoice, @PathVariable("id") int id) {
        if(invoiceService.updateInvoice(newInvoice,id) != null) {
            return new ResponseEntity<String>("Factura actualizada con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al actualizar factura", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInvoice(@PathVariable("id") int id) {
        if(invoiceService.deleteInvoice(id) != null) {
            return new ResponseEntity<String>("Factura eliminada con exito", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<String>("Error al eliminar factura", HttpStatus.NOT_FOUND);
        }
    }
}
