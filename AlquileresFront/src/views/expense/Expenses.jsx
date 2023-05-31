import React, { useState, useEffect } from 'react';
import "../../styles/tables.css";
import DetailExpenses from './DetailExpenses';

export default function Expenses() {

    const [expenses, setExpenses] = useState([]);

    async function loadExpenses() {
        let response = await fetch("http://localhost:8100/app/expenses/allDesc", {
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
            setExpenses(json);
        }
        else {
            console.log(response)
            console.log("Error en la carga de expensas")
        }
    }
    useEffect(() => {
        loadExpenses();
    }, []);
    //console.log(expenses)
    return (
        <DetailExpenses expenses={expenses}></DetailExpenses>
    )
}