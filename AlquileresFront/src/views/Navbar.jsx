import React from 'react';
import "../styles/navbar.css";

export default function Navbar() {
    const LOGIN = window.sessionStorage.getItem("loginOk");
    const EMAIL = window.sessionStorage.getItem("email")
    function closeSesion() {
        window.sessionStorage.clear();
        window.location.href = "/";
    }

    return (
        <div className="div-nav">
            {LOGIN ? (
                <header>
                    <nav className="navbar navbar-expand-lg fixed-top navbar-scroll">
                        <div className="container">
                            <a className="navbar-brand" href="/">Alquileres</a>
                            <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto d-flex align-items-start">
                                    <li className="nav-item dropdown">
                                        <div className="dropdown">
                                            <a className="btn btn-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Propiedades
                                            </a>

                                            <ul className="dropdown-menu" >
                                                <li><a className="dropdown-item" href="/propertyTypes">Crear Tipo</a></li>
                                                <li><a className="dropdown-item" href="/properties">Crear Propiedad</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/tenants">Inquilinos</a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <div className="dropdown">
                                            <a className="btn btn-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Servicios
                                            </a>

                                            <ul className="dropdown-menu" >
                                                <li><a className="dropdown-item" href="/utilityTypes">Crear Tipo</a></li>
                                                <li><a className="dropdown-item" href="/utilities">Crear Servicio</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/expenses">Expensas</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/invoices">Facturas</a>
                                    </li>
                                </ul>
                                <ul className="navbar-nav d-flex flex-row">
                                    <li className="nav-item dropdown">
                                        <div className="dropdown">
                                            <a className="btn btn-light dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {EMAIL}
                                            </a>

                                            <ul className="dropdown-menu" >
                                                <li><a className="dropdown-item" href="#" onClick={closeSesion}>Cerrar Sesion</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            ) : (
                <header>
                    <nav className="navbar navbar-expand-lg fixed-top navbar-scroll">
                        <div className="container">
                            <a className="navbar-brand" href="/">Alquileres</a>
                            <button className="navbar-toggler" type="button" data-mdb-toggle="collapse"
                                data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </nav>


                </header>
            )}
        </div>

    )
}