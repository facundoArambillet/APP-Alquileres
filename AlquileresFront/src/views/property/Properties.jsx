import React, { useState, useEffect } from 'react';
import "../../styles/tables.css";
import DetailProperties from './DetailProperties';

export default function Properties() {

    const [properties, setProperties] = useState([]);

    async function loadProperties() {
        let response = await fetch("http://localhost:8100/app/properties/allDesc", {
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
            console.log("Error en la carga de propiedades")
        }
    }
    
    useEffect(() => {
        loadProperties();
    }, []);
    return (
        <DetailProperties properties = {properties}></DetailProperties>
    )
}