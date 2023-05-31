package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.PropertyType;
import com.Aplicacion.Alquileres.repositories.PropertyTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class PropertyTypeService {
    @Autowired
    private PropertyTypeRepository propertyTypeRepository;

    public List<PropertyType> getAll() {
        try {
            return propertyTypeRepository.findAll();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public List<PropertyType> getAllDesc() {
        try {
            return propertyTypeRepository.findAll();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public PropertyType getById(int id) {
        try {
            return propertyTypeRepository.findById(id).orElseThrow();
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }

    public PropertyType createPropertyType(PropertyType newPropertyType) {
        try {
            return propertyTypeRepository.save(newPropertyType);
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Optional<PropertyType> updatePropertyType(PropertyType newPropertyType, int id) {
        try {
            return propertyTypeRepository.findById(id).map(
                    property -> {
                        property.setType(newPropertyType.getType());;
                        return propertyTypeRepository.save(property);
                    }
            );
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public PropertyType deletePropertyType(int id) {
        try {
            PropertyType propertyTypeDeleted = propertyTypeRepository.findById(id).orElseThrow();
            propertyTypeRepository.deleteById(id);
            return propertyTypeDeleted;
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }
}
