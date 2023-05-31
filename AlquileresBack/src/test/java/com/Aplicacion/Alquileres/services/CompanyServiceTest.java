package com.Aplicacion.Alquileres.services;

import com.Aplicacion.Alquileres.models.Company;
import com.Aplicacion.Alquileres.repositories.CompanyRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class CompanyServiceTest {

    @Mock
    private CompanyRepository companyRepository;

    @InjectMocks
    private CompanyService companyService;

    private Company company;

    @BeforeEach
    public void setup() {
        company = new Company("Company_1",123456789,123456789,7513,"Tandil",123456789);
        company.setIdCompany(1);
    }

    //Borra todos los registros de la BDD despues de cada prueba
    @AfterEach
    void cleanDatabase() {
        companyRepository.deleteAll();
    }

    @DisplayName("Test for get all companies")
    @Test
    public void getAll() {
        //Given
        Company company_2 = new Company("Company 2",963852741,147258369,7000,"Adolfo Gonzales Chaves",123456789);
        given(companyRepository.findAll()).willReturn(List.of(company,company_2));

        //When
        List<Company> companies = companyService.getAll();

        //Then
        Assertions.assertThat(companies).isNotNull();
        Assertions.assertThat(companies.size()).isEqualTo(2);

    }

    @DisplayName("Test for create Company")
    @Test
    public void createCompany() {
        //Given
        given(companyRepository.findByName(company.getName()))
                .willReturn(Optional.empty());
        given(companyRepository.save(company)).willReturn(company);

        //When
        Company companySaved = companyService.createCompany(company);

        //Then
        Assertions.assertThat(companySaved).isNotNull();
    }

    @DisplayName("Test for update a company")
    @Test
    public void updateCompany() {
        // Given
        given(companyRepository.findById(1)).willReturn(Optional.of(company));
        given(companyRepository.save(company)).willReturn(company);
        Company newCompany = new Company("company_2", 321654987, 147258339, 1234, "Mar del plata", 987456321);

        // When
        Optional<Company> companyUpdate = companyService.updateCompany(newCompany, 1);

        // Then
        Assertions.assertThat(companyUpdate).isPresent();
        Assertions.assertThat(companyUpdate.get().getName()).isEqualTo("company_2");
        Assertions.assertThat(companyUpdate.get().getCity()).isEqualTo("Mar del plata");
        Assertions.assertThat(companyUpdate.get().getPostalCode()).isEqualTo(1234);
    }

    @DisplayName("Test for delete a company")
    @Test
    public void deleteCompany() {
        //Given
        given(companyRepository.findById(company.getIdCompany())).willReturn(Optional.of(company));
        willDoNothing().given(companyRepository).deleteById(company.getIdCompany());

        //When
        Company companyDeleted = companyService.deleteCompany(company.getIdCompany());

        //Then
        verify(companyRepository,times(1)).deleteById(company.getIdCompany());
        Assertions.assertThat(companyDeleted).isEqualTo(company);
    }

}
