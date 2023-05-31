import React, { useState, useEffect } from 'react';
import "../../styles/tables.css";
import DetailPropertyTypes from './DetailPropertyTypes';

export default function PropertyType() {

    const [propertyTypes, setPropertyTypes] = useState([]);

    async function loadPropertyTypes() {
        let response = await fetch("http://localhost:8100/app/propertyTypes/allDesc", {
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
            setPropertyTypes(json);
        }
        else {
            console.log(response)
            console.log("Error en la carga de tipos de propiedad")
        }
    }
    
    useEffect(() => {
        loadPropertyTypes();
    }, []);
    return (
        <DetailPropertyTypes propertyTypes = {propertyTypes}></DetailPropertyTypes>
    )
}