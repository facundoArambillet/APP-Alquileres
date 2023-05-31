import React, { useState, useEffect } from 'react';
import "../../styles/tables.css";
import DetailUtilityTypes from './DetailUtilityTypes';

export default function UtilityTypes() {

    const [utilityTypes, setUtilityTypes] = useState([]);

    async function loadUtilityTypes() {
        let response = await fetch("http://localhost:8100/app/utilityTypes/allDesc", {
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
            setUtilityTypes(json);
        }
        else {
            console.log(response)
            console.log("Error en la carga de tipos de servicios")
        }
    }
    useEffect(() => {
        loadUtilityTypes();
    }, []);

    return (
        <DetailUtilityTypes utilityTypes={utilityTypes}></DetailUtilityTypes>
    )
}