import React, { useState, useEffect } from 'react';
import DetailInvoiceDownload from './DetailInvoiceDownload';

//Libreria para podr generar una paginacion
import TablePagination from '@mui/material/TablePagination';
//Libreria para generar pdf desde html y javaScript
import { PDFDownloadLink } from '@react-pdf/renderer';


export default function DetailInvoices(invoices) {
    let arrayInvoices = invoices.invoices;
    const [arrayInvoicesShow, setArrayInvoivesShow] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [tenants, setTenants] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [priceExpense, setPriceExpense] = useState("")
    const [propertyTenant, setPropertyTenant] = useState({
        name: '',
        rentPrice: '',
        percentageExpenses: '',
    });
    const [inputsValues, setInputsValues] = useState({
        date: '',
        detail: '',
        total: 0,
        idTenant: "",
        idExpense: '',
        tenant: {
            property: {}
        },
        expense: ""
    });
    const [priceInvoice, setPriceInvoice] = useState(0);
    const [invoicesSelected, setInvoicesSelected] = useState({
        invoiceOne: {},
        invoiceTwo: {}
    })

    //////////////////////// PAGINACION ////////////////////////////////////////////////////////////////////////////

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));
        paginateInvoices(parseInt(event.target.value));
        setPage(0);
    };

    function paginateInvoices(pages) {
        const pageSize = pages;
        const startIndex = (page) * pageSize;
        const endIndex = startIndex + pageSize;
        setArrayInvoivesShow(arrayInvoices.slice(startIndex, endIndex));
    }


    const handleSubmit = async () => {
        console.log(inputsValues)
        let response = await fetch(`http://localhost:8100/app/invoices`, {
            "method": 'POST',
            "headers": {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "Origin": 'http://localhost:3000',
                "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(inputsValues)
        })
        if (response.ok) {
            console.log(`creado`);
            window.location.href = "/invoices";
        }
        else {
            console.log("Error")
        }
    };

    const handleDelete = async (idInvoice) => {

        Swal.fire({
            title: 'Esta seguro?',
            text: "Esta accion no puede revertirse una vez confirmada",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar Factura'
          })
            .then(async (willDelete) => { //EL ASYNC DE ACA ES PARA EL AWAIT DE LA RESPUESTA DEL DELETE
                if (willDelete.isConfirmed) {
                    Swal.fire("Factura borrada con exito", {
                        icon: "success",
                    });
                    // METO LA FUNCIONALIDAD DENTRO DEL ALERT PARA QUE NO SE DISPARE EL BORRADO SI EL USUARIO SE ARREPIENTE

                    let response = await fetch(`http://localhost:8100/app/invoices/${idInvoice}`, {
                        "method": 'DELETE',
                        "headers": {
                            "Accept": 'application/json',
                            "Content-Type": 'application/json',
                            "Origin": 'http://localhost:3000',
                            "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
                        },
                    })
                    if (response.ok) {
                        console.log(`Factura Eliminada`);
                        window.location.href = "/invoices";
                    }
                    else {
                        console.log("Error")
                    }

                }
            });

    }

    const handleSelectChangeTenant = (event) => {
        //Creo una clase y selecciono todos los selects que tengan esa clase
        let selects = document.querySelectorAll(".selectData");

        let expenseSelectedValue = parseInt(document.querySelector("#expenseValue").value);

        // console.log(event.target.options[event.target.selectedIndex].id) //Con esto agarro el id del option que este seleccionado
        const selectedId = parseInt(event.target.options[event.target.selectedIndex].id)
        console.log(selects[0].options[event.target.selectedIndex].id)
        setInputsValues(prevState => ({
            ...prevState,
            //Con esto seteo los ids(Sabiendo que el primer lugar del array select es para los ids de tenant y el segundo para los de expenses)
            idTenant: parseInt(selects[0].options[event.target.selectedIndex].id)
        }));

        tenants.forEach(tenant => {
            if (tenant.idTenant === selectedId) {
                setPropertyTenant({
                    name: tenant.property.name,
                    rentPrice: parseInt(tenant.property.rentPrice),
                    percentageExpenses: parseInt(tenant.property.percentageExpenses)
                });
                if (tenant.property.percentageExpenses === 0) {
                    setPriceInvoice(parseInt(tenant.property.rentPrice + expenseSelectedValue))
                }
                else {
                    setPriceInvoice(parseInt(tenant.property.rentPrice + (expenseSelectedValue * ((tenant.property.percentageExpenses / 100)))))
                }

                setInputsValues(prevState => ({
                    ...prevState,
                    tenant: tenant,
                    total: priceInvoice
                }));
            }
        })


    };


    const handleSelectChangeExpense = (event) => {
        //Creo una clase y selecciono todos los selects que tengan esa clase
        let selects = document.querySelectorAll(".selectData");
        let rentPrice = parseInt(document.querySelector("#rentPrice").value);
        let percentageExpenses = parseInt(document.querySelector("#percentageExpenses").value);

        // console.log(event.target.options[event.target.selectedIndex].id) //Con esto agarro el id del option que este seleccionado
        const selectedId = parseInt(event.target.options[event.target.selectedIndex].id)
        //console.log(selects[0].options)
        setInputsValues(prevState => ({
            ...prevState,
            //Con esto seteo los ids(Sabiendo que el primer lugar del array select es para los ids de tenant y el segundo para los de expenses)
            idExpense: parseInt(selects[1].options[event.target.selectedIndex].id)
        }));

        expenses.forEach(expense => {
            if (expense.idExpense === selectedId) {
                if (percentageExpenses === 0) {
                    setPriceInvoice(parseInt(rentPrice + expense.total))
                }
                else {
                    setPriceInvoice(parseInt(rentPrice + (expense.total * (percentageExpenses / 100))))
                }
                setPriceExpense(expense.total)

                setInputsValues(prevState => ({
                    ...prevState,
                    expense: expense,
                    total: priceInvoice
                }));
            }
        })

    };

    const handleSelectExcel = () => {
        //Agarro los 2 selects que tienen cada factura
        let invoiceOne = document.querySelector(".invoiceExcelOne");
        let invoiceTwo = document.querySelector(".invoiceExcelTwo");
        arrayInvoices.forEach(invoice => {
            //Pregunto si el id de la factura es igual al id del option que esta seleccionado
            if (invoice.idInvoice == invoiceOne.options[invoiceOne.options.selectedIndex].id) {
                setInvoicesSelected(prevState => ({
                    ...prevState,
                    invoiceOne: invoice
                }));
            }
            else if (invoice.idInvoice == invoiceTwo.options[invoiceTwo.options.selectedIndex].id) {
                setInvoicesSelected(prevState => ({
                    ...prevState,
                    invoiceTwo: invoice
                }));
            }

        });

        console.log(invoicesSelected);
    };


    const handleInputChange = (key, value) => {
        setInputsValues(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    async function loadTenants() {
        let response = await fetch("http://localhost:8100/app/tenants", {
            "method": 'GET',
            "headers": {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "Origin": 'http://localhost:3000',
                "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            }

        })
        let json = await response.json();
        if (response.ok && json.length > 0) {
            setTenants(json);
            setInputsValues(prevState => ({
                ...prevState,
                tenant: json[0],
            }));
            setPropertyTenant({
                name: json[0].property.name,
                rentPrice: json[0].property.rentPrice,
                percentageExpenses: json[0].property.percentageExpenses
            })
            //console.log(priceInvoice)
            setPriceInvoice(parseInt(json[0].property.rentPrice))
        }
        // else {
        //     console.log(response);
        //     console.log("Error en la carga de propiedades");
        // }
    }

    async function loadExpenses() {
        let response = await fetch("http://localhost:8100/app/expenses", {
            "method": 'GET',
            "headers": {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "Origin": 'http://localhost:3000',
                "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            }

        })
        let json = await response.json();
        if (response.ok && json.length > 0) {
            let rentPrice = parseInt(document.querySelector("#rentPrice").value);
            let percentageExpenses = parseInt(document.querySelector("#percentageExpenses").value)
            setExpenses(json);
            setInputsValues(prevState => ({
                ...prevState,
                idExpense: json[0].idExpense,
                expense: json[0]
            }));
            setPriceExpense(json[0].total);

            setPriceInvoice(parseInt(rentPrice + (json[0].total * (percentageExpenses / 100))))
        }
    }
    useEffect(() => {
        loadTenants();
        loadExpenses();
    }, []);
    useEffect(() => {
        setInputsValues(prevState => ({
            ...prevState,
            total: priceInvoice
        }));
    }, [priceInvoice])
    useEffect(() => {
        paginateInvoices(10);
    }, [page, arrayInvoices]);


    return (
        <>
            <div className="div-tables">
                <section className="intro">
                    <div className="gradient-custom-2 h-100">
                        <div className="mask d-flex align-items-center h-100">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-12">
                                        <div className="table-responsive">
                                            <TablePagination
                                                component="div"
                                                count={arrayInvoices.length}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                rowsPerPage={rowsPerPage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />
                                            <table className="table table-dark table-bordered mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Nro Factura</th>
                                                        <th scope="col">Fecha</th>
                                                        <th scope="col">Detalle</th>
                                                        <th scope="col">Total</th>
                                                        <th scope="col">Inquilinos</th>
                                                        <th scope="col">Propiedad Inquilino</th>
                                                        <th scope="col">Acciones del Usuario</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {arrayInvoicesShow.length === 0 ? <tr>
                                                        <td scope="col"><input type="number" placeholder="Nro Factura" className='text-white' disabled /></td>
                                                        <td scope="col"><input type="date" placeholder="Fecha" className='text-white' disabled /></td>
                                                        <td scope="col"><input type="text" placeholder="Detail" className='text-white' disabled /></td>
                                                        <td scope="col"><input type="number" placeholder="Total" className='text-white' disabled /></td>
                                                        <td scope="col">
                                                            <select className='text-white' onChange={handleSelectChangeTenant}>
                                                                {tenants.map(tenant => (
                                                                    <option id={tenant.idTenant} key={tenant.idTenant}>{tenant.name}</option>
                                                                ))}
                                                            </select>
                                                        </td>
                                                        <td scope="col"><input type="text" value={propertyTenant.name} className='text-white' disabled /></td>

                                                        <td scope="col" >
                                                            <div className='row'>
                                                                <div className="col-3">
                                                                    <button type="button" className="btn btn-primary btn-actions" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
                                                                        <i className="bi bi-plus-lg"></i>
                                                                    </button>
                                                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                        <div className="modal-dialog">
                                                                            <div className="modal-content" style={{ color: "black" }}>
                                                                                <div className="modal-header">
                                                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Facturas</h1>
                                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                    <form>
                                                                                        <div className='row'>
                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Nro Factura</label>
                                                                                                <input type="number" className="form-control" style={{ border: "1px solid" }} id='idInvoice' disabled defaultValue={1} />
                                                                                            </div>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Fecha</label>
                                                                                                <input type="date" className="form-control" style={{ border: "1px solid" }} id='date' onChange={(e) => handleInputChange("date", e.target.value)} />
                                                                                            </div>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Inquilino</label>
                                                                                                <table style={{ marginLeft: "2.5%", width: "200px", height: "38px" }}>
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <select className='selectData' style={{ border: "1px solid" }} defaultValue={inputsValues.idTenant} onChange={handleSelectChangeTenant}>
                                                                                                                    {tenants.map(tenant => (
                                                                                                                        <option id={tenant.idTenant} key={tenant.idTenant}>{tenant.name}</option>
                                                                                                                    ))}
                                                                                                                </select>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Propiedad Inquilino</label>
                                                                                                <input type="text" className="form-control" style={{ border: "1px solid" }} id='name' defaultValue={propertyTenant.name} disabled />
                                                                                            </div>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Precio Alquiler</label>
                                                                                                <input type="number" className="form-control" style={{ border: "1px solid" }} id='rentPrice' disabled defaultValue={propertyTenant.rentPrice} />
                                                                                            </div>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Porcentaje De Expensas</label>
                                                                                                <input type="number" className="form-control" style={{ border: "1px solid" }} id='percentageExpenses' disabled defaultValue={propertyTenant.percentageExpenses} />
                                                                                            </div>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Expensas</label>
                                                                                                <table style={{ marginLeft: "2.5%", width: "200px", height: "38px" }}>
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <select className='selectData' style={{ border: "1px solid" }} onChange={handleSelectChangeExpense}>
                                                                                                                    {expenses.map(expense => (
                                                                                                                        <option id={expense.idExpense} key={expense.idExpense}>{expense.name}</option>
                                                                                                                    ))}
                                                                                                                </select>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Valor Expensas</label>
                                                                                                <input type="number" className="form-control" style={{ border: "1px solid" }} id='expenseValue' defaultValue={priceExpense} disabled />
                                                                                            </div>
                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Total</label>
                                                                                                <input type="number" className="form-control" style={{ border: "1px solid" }} id='total' defaultValue={priceInvoice} disabled />
                                                                                            </div>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Detalle</label>
                                                                                                <input type="text" className="form-control" style={{ border: "1px solid" }} id='detail' onChange={(e) => handleInputChange("detail", e.target.value)} />
                                                                                            </div>

                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                                <div className="modal-footer">
                                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                    <button type="button" className="btn btn-primary " onClick={handleSubmit}>Crear Factura</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-3">
                                                                    <button type="button" className="btn btn-primary btn-actions" >
                                                                        <i className="bi bi-arrow-repeat"></i>
                                                                    </button>

                                                                </div>
                                                                <div className="col-3">
                                                                    <button type="button" className="btn btn-primary btn-actions">
                                                                        <i className="bi bi-trash3-fill"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                        :
                                                        (arrayInvoicesShow?.map((invoice) => (
                                                            <tr key={invoice.idInvoice}>
                                                                <td scope="col"><input type="number" defaultValue={invoice.idInvoice} className='text-white' disabled /></td>
                                                                <td scope="col"><input type="date" defaultValue={invoice.date.split('T')[0]} className='text-white' disabled /></td>
                                                                <td scope="col"><input type="text" defaultValue={invoice.detail} className='text-white' disabled /></td>
                                                                <td scope="col"><input type="number" defaultValue={invoice.total} className='text-white' disabled /></td>
                                                                <td scope="col">
                                                                    <select className='text-white' defaultValue={invoice.idTenant} onChange={handleSelectChangeTenant}>
                                                                        {tenants.map(tenant => (
                                                                            <option value={tenant.idTenant} id={tenant.idTenant} key={tenant.idTenant}>{tenant.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </td>

                                                                <td scope="col"><input type="text" value={invoice.tenant.property.name} className='text-white' disabled onChange={handleSelectChangeTenant} /></td>

                                                                <td scope="col" >
                                                                    <div className='row'>
                                                                        <div className="col-3">
                                                                            <button type="button" className="btn btn-primary btn-actions" data-bs-toggle="modal" data-bs-target="#modalCreate" >
                                                                                <i className="bi bi-plus-lg"></i>
                                                                            </button>
                                                                            <div className="modal fade" id="modalCreate" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content" style={{ color: "black" }}>
                                                                                        <div className="modal-header">
                                                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Facturas</h1>
                                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            <form>
                                                                                                <div className='row'>
                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Nro Factura</label>
                                                                                                        <input type="number" className="form-control" style={{ border: "1px solid" }} id='idInvoice' disabled defaultValue={arrayInvoices[0].idInvoice + 1} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Fecha</label>
                                                                                                        <input type="date" className="form-control" style={{ border: "1px solid" }} id='date' onChange={(e) => handleInputChange("date", e.target.value)} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Inquilino</label>
                                                                                                        <table style={{ marginLeft: "2.5%", width: "200px", height: "38px" }}>
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        <select className='selectData' style={{ border: "1px solid" }} defaultValue={inputsValues.idTenant} onChange={handleSelectChangeTenant}>
                                                                                                                            {tenants.map(tenant => (
                                                                                                                                <option id={tenant.idTenant} key={tenant.idTenant}>{tenant.name}</option>
                                                                                                                            ))}
                                                                                                                        </select>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Propiedad Inquilino</label>
                                                                                                        <input type="text" className="form-control" style={{ border: "1px solid" }} id='name' value={propertyTenant.name} disabled onChange={handleSelectChangeTenant} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Precio Alquiler</label>
                                                                                                        <input type="number" className="form-control" style={{ border: "1px solid" }} id='rentPrice' disabled value={propertyTenant.rentPrice} onChange={handleSelectChangeTenant} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Porcentaje De Expensas</label>
                                                                                                        <input type="number" className="form-control" style={{ border: "1px solid" }} id='percentageExpenses' disabled value={propertyTenant.percentageExpenses} onChange={handleSelectChangeTenant} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Expensas</label>
                                                                                                        <table style={{ marginLeft: "2.5%", width: "200px", height: "38px" }}>
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        <select className='selectData' style={{ border: "1px solid" }} onChange={handleSelectChangeExpense}>
                                                                                                                            {expenses.map(expense => (
                                                                                                                                <option id={expense.idExpense} key={expense.idExpense}>{expense.name}</option>
                                                                                                                            ))}
                                                                                                                        </select>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Valor Expensas</label>
                                                                                                        <input type="number" className="form-control" style={{ border: "1px solid" }} id='expenseValue' value={priceExpense} disabled onChange={handleSelectChangeExpense} />
                                                                                                    </div>
                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Total</label>
                                                                                                        <input type="number" className="form-control" style={{ border: "1px solid" }} id='total' value={priceInvoice} disabled onChange={handleSelectChangeExpense} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Detalle</label>
                                                                                                        <input type="text" className="form-control" style={{ border: "1px solid" }} id='detail' onChange={(e) => handleInputChange("detail", e.target.value)} />
                                                                                                    </div>

                                                                                                </div>
                                                                                            </form>
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                            <button type="button" className="btn btn-primary " onClick={handleSubmit}>Crear Factura</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-3">
                                                                            <button type="button" className="btn btn-primary btn-actions" onClick={() => handleDelete(invoice.idInvoice)}>
                                                                                <i className="bi bi-trash3-fill"></i>
                                                                            </button>
                                                                        </div>
                                                                        <div className="col-3">
                                                                            <PDFDownloadLink
                                                                                document={<DetailInvoiceDownload invoice={invoice}></DetailInvoiceDownload>}
                                                                                fileName='factura.pdf'>
                                                                                <button type="button" className="btn btn-primary btn-actions">
                                                                                    <i className="bi bi-cloud-arrow-down"></i>
                                                                                </button>
                                                                            </PDFDownloadLink>
                                                                        </div>

                                                                        <div className="col-3">
                                                                            <button type="button" className="btn btn-primary btn-actions" data-bs-toggle="modal" data-bs-target="#modalExcel">
                                                                                <i className="bi bi-file-earmark-spreadsheet"></i>
                                                                            </button>
                                                                            <div className="modal fade" id="modalExcel" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content" style={{ color: "black" }}>
                                                                                        <div className="modal-header">
                                                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Facturas</h1>
                                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            <div className="mb-3 col-12">
                                                                                                <div className='row'>
                                                                                                    <div className="col"><label htmlFor="recipient-name" className="col-form-label">Factura 1</label>
                                                                                                    </div>
                                                                                                    <div className="col">
                                                                                                        <select className='invoiceExcelOne' style={{ border: "1px solid" }} >
                                                                                                            {arrayInvoices.map((invoice, index) => (
                                                                                                                <option id={invoice.idInvoice} key={index}>{`${invoice.tenant.name}, ${invoice.tenant.lastName}-${invoice.total}`}</option>
                                                                                                            ))}
                                                                                                        </select>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="mb-3 col-12">
                                                                                                <div className='row'>
                                                                                                    <div className="col"><label htmlFor="recipient-name" className="col-form-label">Factura 2</label></div>
                                                                                                    <div className="col">
                                                                                                        <select className='invoiceExcelTwo' style={{ border: "1px solid" }} >
                                                                                                            {arrayInvoices.map((invoice, idx) => (
                                                                                                                <option id={invoice.idInvoice} key={idx}>{`${invoice.tenant.name}, ${invoice.tenant.lastName}-${invoice.total}`}</option>
                                                                                                            ))}
                                                                                                        </select>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                            <button type="button" className="btn btn-primary " onClick={handleSelectExcel}>Crear Excel</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}
