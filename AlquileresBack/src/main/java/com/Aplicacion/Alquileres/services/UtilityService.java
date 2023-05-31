package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.Utility;
import com.Aplicacion.Alquileres.repositories.UtilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UtilityService {
    @Autowired
    private UtilityRepository utilityRepository;

    public List<Utility> getAll() {
        try {
            return utilityRepository.findAll();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public List<Utility> getAllDesc() {
        try {
            return utilityRepository.getAllDesc();
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
    public Utility getById(int id) {
        try {
            return utilityRepository.findById(id).orElseThrow();
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }

    public List<Utility> getByType(String type) {
        try {
            return utilityRepository.findByType(type);
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }

    public Utility createUtility(Utility newUtility) {
        try {
            return utilityRepository.save(newUtility);
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Optional<Utility> updateUtility(Utility newUtility, int id) {
        try {
            return utilityRepository.findById(id).map(
                    utility -> {
                        utility.setDescription(newUtility.getDescription());
                        utility.setDate(newUtility.getDate());
                        utility.setPrice(newUtility.getPrice());
                        utility.setIdType(newUtility.getIdType());
                        utility.setUtilityType(newUtility.getUtilityType());
                        return utilityRepository.save(utility);
                    }
            );
        }
        catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public Utility deleteUtility(int id) {
        try {
            Utility utilityDeleted = utilityRepository.findById(id).orElseThrow();
            utilityRepository.deleteById(id);
            return utilityDeleted;
        }
        catch (NoSuchElementException e) {
            System.out.println(e);
            return null;
        }
    }
}
