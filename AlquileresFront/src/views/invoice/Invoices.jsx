import React, { useState, useEffect } from 'react';
import DetailInvoices from './DetailInvoices';
import "../../styles/tables.css";

export default function Invoices() {

    const [invoices, setInvoices] = useState([]);

    async function loadServicios() {
        let response = await fetch("http://localhost:8100/app/invoices/allDesc", {
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
            setInvoices(json);
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
        <DetailInvoices invoices={invoices}></DetailInvoices>
    )
}