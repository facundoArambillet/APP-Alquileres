package com.Aplicacion.Alquileres.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Getter @Setter
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Integer idUser;
    private String email;
    private String password;
    @Column(name = "id_rol")
    private Integer idRol;

    @ManyToOne()
    @JoinColumn(name = "id_rol",insertable = false,updatable = false)
    private UserRol userRol;

    public User() {
    }

    public User(String email, String password, Integer idRol) {
        this.email = email;
        this.password = password;
        this.idRol = idRol;
    }

    @Override
    @JsonIgnore // Lo uso para que no me salgan las relaciones cuando hago un GET
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return  List.of(new SimpleGrantedAuthority(userRol.getType()));
    }

    @Override
    @JsonIgnore
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
