package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.Invoice;
import com.Aplicacion.Alquileres.models.Utility;
import com.Aplicacion.Alquileres.models.UtilityType;
import com.Aplicacion.Alquileres.repositories.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private UtilityService utilityService;

    public List<Invoice> getAll() {
        try {
            return invoiceRepository.findAll();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public List<Invoice> getAllDesc() {
        try {
            return invoiceRepository.getAllDesc();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public Invoice getById(int id) {
        try {
            return invoiceRepository.findById(id).orElseThrow();
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }

    public List<Invoice> getLastFive() {
        try{
            return invoiceRepository.getLastFive();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Invoice createInvoice(Invoice newInvoice) {
        try {
            return invoiceRepository.save(newInvoice);
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Optional<Invoice> updateInvoice(Invoice newInvoice, int id) {
        try {
            return invoiceRepository.findById(id).map(
                    invoice -> {
                        invoice.setDate(newInvoice.getDate());
                        invoice.setDetail(newInvoice.getDetail());
                        invoice.setTotal(newInvoice.getTotal());
                        return invoiceRepository.save(invoice);
                    }
            );
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Invoice deleteInvoice(int id) {
        try {
            Invoice invoiceDeleted = invoiceRepository.findById(id).orElseThrow();
            invoiceRepository.deleteById(id);
            return invoiceDeleted;
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }
}
