package com.Aplicacion.Alquileres.repositories;
import com.Aplicacion.Alquileres.models.Company;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.ActiveProfiles;

import java.util.List;
import java.util.Optional;


//El decorador @DataJpaTest  establece que se van a hacer test unicamente a un repository o entidad

//El decorador @SpringBootTest hace pruebas reales directamente en tu base de datos(MySql) por eso creo una configuracion de pruebas
//en una base de datos en memoria(H2) para no afectar mis registros

//@DataJpaTest

//No me funciona el activar el profile test
/*@SpringBootTest
@ActiveProfiles("test")*/
@SpringBootTest(properties = {"spring.config.name=application-test"})
 public class CompanyRepositoryTest {
    @Autowired
    private CompanyRepository companyRepository;

    //Borra todos los registros de la BDD despues de cada prueba
    @AfterEach
    void cleanDatabase() {
        companyRepository.deleteAll();
    }

    @DisplayName("Test for get all companies")
    @Test
    void getAllCompanies() {
        //Given condicion previa
        Company company_1 = new Company("Company 1",123456789,123456789,7513,"Tandil",123456789);
        Company company_2 = new Company("Company 2",987654321,987654321,7000,"Adolfo Gonzales Chaves",987654321);
        companyRepository.save(company_1);
        companyRepository.save(company_2);

        //When accion o comportamiento que vamos a probar
        List<Company> companies = companyRepository.findAll();

        //Then verificacion de la salida
        Assertions.assertThat(companies).isNotNull();
        Assertions.assertThat(companies.size()).isEqualTo(2);
    }

    @DisplayName("Test for create a company")
    @Test
    public void createCompany() {
        //Given condicion previa
        Company company_1 = new Company("Company 1",123456789,123456789,7513,"Tandil",123456789);
        //When accion o comportamiento que vamos a probar

        Company companySaved = companyRepository.save(company_1);
        //Then verificacion de la salida

        Assertions.assertThat(companySaved).isNotNull();
        Assertions.assertThat(companySaved.getIdCompany()).isGreaterThan(0);
    }



    @DisplayName("Test for update a company")
    @Test
    public void updateCompany() {
        //Given condicion previa
        Company company_1 = new Company("Company 1",123456789,123456789,7513,"Tandil",123456789);
        companyRepository.save(company_1);

        //When accion o comportamiento que vamos a probar
        Optional<Company> companySaved = companyRepository.findByName(company_1.getName());
        companySaved.map(
                company -> {
                    company.setName("Company 10");
                    company.setPhoneNumber(15324789);
                    company.setCbu(789456123);
                    company.setPostalCode(7000);
                    company.setCity("Mar del plata");
                    company.setCuit(852369741);
                    return companyRepository.save(company);
                }
        );

        //Then verificacion de la salida
        Assertions.assertThat(companySaved.get().getName()).isEqualTo("Company 10");
        Assertions.assertThat(companySaved.get().getPhoneNumber()).isEqualTo(15324789);
        Assertions.assertThat(companySaved.get().getCity()).isEqualTo("Mar del plata");
    }

    @DisplayName("Test for delete a company")
    @Test
    public void deleteCompany() {
        //Given condicion previa
        Company company_1 = new Company("Company 1",123456789,123456789,7513,"Tandil",123456789);
        companyRepository.save(company_1);

        //When accion o comportamiento que vamos a probar
        companyRepository.delete(company_1);
        Optional<Company> companyDeleted = companyRepository.findByName("Company 1");

        //Then verificacion de la salida
        Assertions.assertThat(companyDeleted).isEmpty();
    }

}
