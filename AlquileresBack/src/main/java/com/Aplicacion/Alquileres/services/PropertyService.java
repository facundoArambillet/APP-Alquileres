package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.Property;
import com.Aplicacion.Alquileres.repositories.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class PropertyService {
    @Autowired
    private PropertyRepository propertyRepository;

    public List<Property> getAll() {
        try {
            return propertyRepository.findAll();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public List<Property> getAllDesc() {
        try {
            return propertyRepository.getAllDesc();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public Property getById(int id) {
        try {
            return propertyRepository.findById(id).orElseThrow();
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }

    public Property createProperty(Property newProperty) {
        try {
            return propertyRepository.save(newProperty);
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Optional<Property> updateProperty(Property newProperty, int id) {
        try {
            return propertyRepository.findById(id).map(
                    property -> {
                        property.setName(newProperty.getName());
                        property.setRentPrice(newProperty.getRentPrice());
                        property.setStreet(newProperty.getStreet());
                        property.setStreetNumber(newProperty.getStreetNumber());
                        property.setCity(newProperty.getCity());
                        property.setDescription(newProperty.getDescription());
                        property.setPercentageExpenses(newProperty.getPercentageExpenses());
                        return propertyRepository.save(property);
                    }
            );
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Property deleteProperty(int id) {
        try {
            Property propertyDeleted = propertyRepository.findById(id).orElseThrow();
            propertyRepository.deleteById(id);
            return propertyDeleted;
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }
}
