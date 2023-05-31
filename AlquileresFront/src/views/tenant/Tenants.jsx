import React, { useState, useEffect } from 'react';
import "../../styles/tables.css";
import DetailTenants from './DetailTenants';

export default function Tenants() {

    const [tenants, setTenants] = useState([]);
    const [properties, setProperties] = useState([])

    async function loadInquilinos() {
        let response = await fetch("http://localhost:8100/app/tenants/allDesc", {
            "method": 'GET',
            "headers": {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "Origin": 'http://localhost:3000',
                "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            }
        })
        if (response.ok) {
            let json = await response.json();
            setTenants(json);
        }
        else {
            console.log(response)
            console.log("Error en la carga de propiedades")
        }
    }
    async function loadProperties() {
        let response = await fetch("http://localhost:8100/app/properties", {
            "method": 'GET',
            "headers": {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "Origin": 'http://localhost:3000',
                "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            }
        })
        if (response.ok) {
            let json = await response.json();
            setProperties(json);
        }
        else {
            console.log(response)
            console.log("Error en la carga de tipos de propiedad")
        }
    }
    useEffect(() => {
        loadInquilinos();
        loadProperties();
    }, []);
    return (
        <DetailTenants tenants={tenants}></DetailTenants>
    )
}