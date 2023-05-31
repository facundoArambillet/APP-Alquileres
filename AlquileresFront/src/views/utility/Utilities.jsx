import React, { useState, useEffect } from 'react';
import "../../styles/tables.css";
import DetailUtilities from './DetailUtilities';


export default function Utilities() {

    const [utilities, setUtilities] = useState([]);

    async function loadServicios() {
        let response = await fetch("http://localhost:8100/app/utilities/allDesc", {
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
            setUtilities(json);
        }
        else {
            console.log(response)
            console.log("Error en la carga de propiedades")
        }
    }
    useEffect(() => {
        loadServicios();
    }, []);

    return (
        <DetailUtilities utilities={utilities}></DetailUtilities>
    )
}