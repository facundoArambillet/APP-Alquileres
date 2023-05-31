package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.UtilityType;
import com.Aplicacion.Alquileres.repositories.UtilityTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UtilityTypeService {
    @Autowired
    private UtilityTypeRepository utilityTypeRepository;

    public List<UtilityType> getAll() {
        try {
            return utilityTypeRepository.findAll();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public List<UtilityType> getAllDesc() {
        try {
            return utilityTypeRepository.getAllDesc();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public UtilityType getById(int id) {
        try {
            return utilityTypeRepository.findById(id).orElseThrow();
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }

    public UtilityType createUtilityType(UtilityType newUtilityType) {
        try {
            return utilityTypeRepository.save(newUtilityType);
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Optional<UtilityType> updateUtilityType(UtilityType newUtilityType, int id) {
        try {
            return utilityTypeRepository.findById(id).map(
                    utilityType -> {
                        utilityType.setType(newUtilityType.getType());
                        return utilityTypeRepository.save(utilityType);
                    }
            );
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public UtilityType deleteUtilityType(int id) {
        try {
            UtilityType typeDeleted = utilityTypeRepository.findById(id).orElseThrow();
            utilityTypeRepository.deleteById(id);
            return typeDeleted;
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }
}
