import React, { useState, useEffect } from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function DetailExpenses(expenses) {
    let arrayExpenses = expenses.expenses;
    const [arrayExpensesShow, setArrayExpensesShow] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [loading, setLoading] = useState(true);
    const [utilities, setUtilities] = useState([]);
    const [expenseSelected, setExpenseSelected] = useState({
        name: "",
        utilities: [],
        total: ""
    })
    const [utilityTypes, setUtilityTypes] = useState([]);
    const [idsUtilitiesSelected, setIdsUtilitiesSelected] = useState([]);
    //AVERIGUAR COMO HACER PARA NO TENER QUE INICIALIZAR UTILITIES SIN QUE SE ROMPA POR UNDEFINED
    const [exp, setExpense] = useState({
        name: "",
        utilities: [{
            description: ""
        }, {
            description: ""
        },
        {
            description: ""
        }],
        total: ""
    })

    //////////////////////// PAGINACION ////////////////////////////////////////////////////////////////////////////

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));
        paginateTenants(parseInt(event.target.value));
        setPage(0);
    };

    function paginateTenants(pages) {
        const pageSize = pages;
        const startIndex = (page) * pageSize;
        const endIndex = startIndex + pageSize;
        setArrayExpensesShow(arrayExpenses.slice(startIndex, endIndex));
    }



    const handleSubmit = async () => {

        let response = await fetch(`http://localhost:8100/app/expenses`, {
            "method": 'POST',
            "headers": {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "Origin": 'http://localhost:3000',
                "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(exp)
        })
        if (response.ok) {
            console.log(`Expensas Creada`);
            window.location.href = "/expenses";
        }
        else {
            console.log("Error")
        }
    };

    const handleUpdate = async (idExpense) => {
        let response = await fetch(`http://localhost:8100/app/expenses/${idExpense}`, {
            "method": 'PUT',
            "headers": {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "Origin": 'http://localhost:3000',
                "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(exp)
        })
        if (response.ok) {
            console.log(`Expensa Actualizada`);
            window.location.href = "/expenses";
        }
        else {
            console.log("Error")
        }
    };

    const handleDelete = async (idExpense) => {
        Swal.fire({
            title: 'Esta seguro?',
            text: "Esta accion no puede revertirse una vez confirmada",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar Expensa'
        })
            .then(async (willDelete) => { //EL ASYNC DE ACA ES PARA EL AWAIT DE LA RESPUESTA DEL DELETE
                if (willDelete.isConfirmed) {
                    Swal.fire("Expensa borrada con exito", {
                        icon: "success",
                    });
                    // METO LA FUNCIONALIDAD DENTRO DEL ALERT PARA QUE NO SE DISPARE EL BORRADO SI EL USUARIO SE ARREPIENTE

                    let response = await fetch(`http://localhost:8100/app/expenses/${idExpense}`, {
                        "method": 'DELETE',
                        "headers": {
                            "Accept": 'application/json',
                            "Content-Type": 'application/json',
                            "Origin": 'http://localhost:3000',
                            "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
                        },
                    })
                    if (response.ok) {
                        console.log(`Expensa Eliminada`);
                        window.location.href = "/expenses";
                    }
                    else {
                        console.log("Error")
                    }
                }
            });

    }

    const handleSelected = async (idExpense) => {
        let response = await fetch(`http://localhost:8100/app/expenses/${idExpense}`, {
            "method": 'GET',
            "headers": {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "Origin": 'http://localhost:3000',
                "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            },
        })
        if (response.ok) {
            let json = await response.json();
            setExpenseSelected(json);
            console.log(json)
            setExpense({
                name: json.name,
                utilities: json.utilities,
                total: json.total
            })
        }
        else {
            console.log("Error")
        }
    };


    const handleSelectChange = async (event) => {
        //const selectedId = parseInt(event.target.options[event.target.selectedIndex].id)
        //console.log(selectedId) //Con esto agarro el id del option que este seleccionado
        const selects = document.querySelectorAll(".services");
        const idsSelected = [];
        let nameExpense = document.querySelector("#nameUpdate").value //Hago esto porque cuando cambio los options se renderiza el componente y me borra el name

        setExpense(prevState => ({
            ...prevState,
            name: nameExpense
        }));

        // console.log(event.target.options[event.target.selectedIndex])
        //ACA LIMITO A utilityTypes.length PORQUE SINO ME REPITE LOS IDS EN EL ARRAY POR LA CANTIDAD DE COLUMNAS QUE HAYA
        for (let i = 0; i < utilityTypes.length; i++) {
            selects[i].options.selectedIndex = event.target.selectedIndex;
            const idSelected = parseInt(selects[i].options[event.target.selectedIndex].id); //Asi me devuelve los servicios por mes
            idsSelected.push(idSelected);
        }

        setIdsUtilitiesSelected(idsSelected);
    };


    const handleInputChange = (key, value) => {
        setExpense(prevState => ({
            ...prevState,
            [key]: value
        }));
    };


    async function loadUtilitiesById(idUtility) {
        let response = await fetch(`http://localhost:8100/app/utilities/${idUtility}`, {
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
            return json;
        }
        else {
            console.log(response)
            console.log("Error en la carga de servicio por ID")
        }
    }


    async function loadUtilitiesByType(utilityType) {
        let response = await fetch(`http://localhost:8100/app/utilities/type/${utilityType}`, {
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
            return json;
        }
        else {
            console.log(response)
            console.log("Error en la carga de servicios")
        }
    }
    async function loadExpense() {
        let utilityPromisesExpense = idsUtilitiesSelected.map(idUtility => loadUtilitiesById(idUtility));
        let nameExpense = document.querySelector("#nameUpdate") //Hago esto porque cuando cambio los options se renderiza el componente y me borra el name
        await Promise.all(utilityPromisesExpense).then(results => {
            let total = 0;
            results.map(result => {
                total += parseInt(result.price);
            })
            if (results.length > 0) {
                setExpense({
                    utilities: results,
                    name: nameExpense.value, //Cambie el .value porque si lo pongo directamente en nameExpense rompe
                    total: total
                });
            }

        })
    }
    async function loadUtilityTypes() {
        let response = await fetch("http://localhost:8100/app/utilityTypes", {
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
            //Cargo las utilities por tipo
            let utilityPromises = json.map(utilityType => loadUtilitiesByType(utilityType.type));

            Promise.all(utilityPromises).then(results => {
                let firstUtilityByCategory = [];
                setUtilities(results);
                //Recorro todas las utilities y agarro el ID de las primera utility de cada tipo y los seteo en idsUtilitiesSelected
                results.map(result => {
                    firstUtilityByCategory.push(result[0].idUtility);
                })
                setIdsUtilitiesSelected(firstUtilityByCategory)
            });

        }
        else {
            console.log(response);
            console.log("Error en la carga de tipos de servicios");
        }

    }
    useEffect(() => {
        loadUtilityTypes();
    }, []);
    useEffect(() => {
        loadExpense();
    }, [idsUtilitiesSelected]);
    useEffect(() => {
        paginateTenants(10);
    }, [page, arrayExpenses]);
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
                                                count={arrayExpenses.length}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                rowsPerPage={rowsPerPage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />
                                            <table className="table table-dark table-bordered mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Nombre</th>
                                                        {utilityTypes.length !== 0 ? (
                                                            utilityTypes.map((utilityType) => (
                                                                <th scope="col" key={utilityType.idType}>{utilityType.type}</th>
                                                            ))
                                                        ) : (
                                                            <th scope="col">Servicios</th>
                                                        )}
                                                        <th scope="col">Total</th>
                                                        <th scope="col">ACTIONS USERS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {arrayExpensesShow.length === 0 ?
                                                        <tr>
                                                            <td scope="col"><input type="text" placeholder="Nombre" className='text-white' disabled /></td>
                                                            {utilities.map((utility, index) => (
                                                                <td scope="col" key={index}>
                                                                    <select className='text-white' onChange={handleSelectChange}>
                                                                        {utility.map(utilitiesByTypes => (
                                                                            <option id={utilitiesByTypes.idUtility} key={utilitiesByTypes.idUtility} defaultValue={utilitiesByTypes.idUtility}>{utilitiesByTypes.description}</option>
                                                                        ))}
                                                                    </select>
                                                                </td>
                                                            ))}
                                                            <td scope="col"><input type="number" placeholder="Total" className='text-white' disabled /></td>
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
                                                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Expensas</h1>
                                                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                    </div>
                                                                                    <div className="modal-body">
                                                                                        <form>
                                                                                            <div className='row'>
                                                                                                <div className="mb-3 col-6">
                                                                                                    <label htmlFor="recipient-name" className="col-form-label">Nombre</label>
                                                                                                    <input type="text" className="form-control" style={{ border: "1px solid" }} id='name' onChange={(e) => handleInputChange('name', e.target.value)} />
                                                                                                </div>
                                                                                                {utilities.map((utility, index) => (
                                                                                                    <div key={index} className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">{utility[0].utilityType.type}</label>
                                                                                                        <table style={{ marginLeft: "2.5%", width: "200px", height: "38px" }}>
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td scope="col" key={index} >
                                                                                                                        <select className='services' style={{ border: "1px solid" }} onChange={handleSelectChange}>
                                                                                                                            {utility.map(utilitiesByTypes => (
                                                                                                                                <option id={utilitiesByTypes.idUtility} key={utilitiesByTypes.idUtility}>{utilitiesByTypes.description}</option>
                                                                                                                            ))}
                                                                                                                        </select>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </div>
                                                                                                ))}

                                                                                                <div className="mb-3 col-6">
                                                                                                    <label htmlFor="recipient-name" className="col-form-label">Total</label>
                                                                                                    <input defaultValue={exp.total} type="number" className="form-control" style={{ border: "1px solid" }} id='total' disabled />
                                                                                                </div>
                                                                                            </div>
                                                                                        </form>
                                                                                    </div>
                                                                                    <div className="modal-footer">
                                                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                        <button type="button" className="btn btn-primary " onClick={handleSubmit}>Crear Expensa</button>
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
                                                        : (
                                                            arrayExpensesShow?.map((expense) => (
                                                                <tr key={expense.idExpense}>
                                                                    <td scope="col"><input type="text" defaultValue={expense.name} className='text-white' disabled /></td>

                                                                    {expense.utilities.map((utility, index) => (
                                                                        <td scope="col" key={index}><input type="text" defaultValue={utility.description} className='text-white' disabled /></td>
                                                                    ))}

                                                                    <td scope="col"><input type="number" defaultValue={expense.total} className='text-white' disabled /></td>
                                                                    <td scope="col" >
                                                                        <div className='row'>
                                                                            <div className="col-4">
                                                                                <button type="button" className="btn btn-primary btn-actions" data-bs-toggle="modal" data-bs-target="#modalCreate">
                                                                                    <i className="bi bi-plus-lg"></i>
                                                                                </button>
                                                                                <div className="modal fade" id="modalCreate" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                                    <div className="modal-dialog">
                                                                                        <div className="modal-content" style={{ color: "black" }}>
                                                                                            <div className="modal-header">
                                                                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Expensas</h1>
                                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                            </div>
                                                                                            <div className="modal-body">
                                                                                                <form>
                                                                                                    <div className='row'>
                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Nombre</label>
                                                                                                            <input type="text" className="form-control" style={{ border: "1px solid" }} id='name' onChange={(e) => handleInputChange('name', e.target.value)} />
                                                                                                        </div>
                                                                                                        {utilities.map((utility, index) => (
                                                                                                            <div key={index} className="mb-3 col-6">
                                                                                                                <label htmlFor="recipient-name" className="col-form-label">{utility[0].utilityType.type}</label>
                                                                                                                <table style={{ marginLeft: "2.5%", width: "200px", height: "38px" }}>
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td scope="col" key={index} >
                                                                                                                                <select className='services' style={{ border: "1px solid" }} onChange={handleSelectChange}>
                                                                                                                                    {utility.map(utilitiesByTypes => (
                                                                                                                                        <option id={utilitiesByTypes.idUtility} key={utilitiesByTypes.idUtility}>{utilitiesByTypes.description}</option>
                                                                                                                                    ))}
                                                                                                                                </select>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </div>
                                                                                                        ))}

                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Total</label>
                                                                                                            <input value={exp.total} type="number" className="form-control" style={{ border: "1px solid" }} id='total' disabled onChange={handleSelectChange} />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </form>
                                                                                            </div>
                                                                                            <div className="modal-footer">
                                                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                                <button type="button" className="btn btn-primary " onClick={handleSubmit}>Crear Expensa</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-4">
                                                                                <button type="button" className="btn btn-primary btn-actions" data-bs-toggle="modal" data-bs-target="#modalUpdate" onClick={() => handleSelected(expense.idExpense)}>
                                                                                    <i className="bi bi-arrow-repeat"></i>
                                                                                </button>
                                                                                <div className="modal fade" id="modalUpdate" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                                    <div className="modal-dialog">
                                                                                        <div className="modal-content" style={{ color: "black" }}>
                                                                                            <div className="modal-header">
                                                                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Expensas</h1>
                                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                            </div>
                                                                                            <div className="modal-body">
                                                                                                <form>
                                                                                                    <div className='row'>
                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Nombre</label>
                                                                                                            <input defaultValue={expenseSelected.name} type="text" className="form-control" style={{ border: "1px solid" }} id='nameUpdate' onChange={(e) => handleInputChange('name', e.target.value)} />
                                                                                                        </div>
                                                                                                        {utilities.map((utility, index) => (
                                                                                                            <div key={index} className="mb-3 col-6">
                                                                                                                <label htmlFor="recipient-name" className="col-form-label">{utility[0].utilityType.type}</label>
                                                                                                                <table style={{ marginLeft: "2.5%", width: "200px", height: "38px" }}>
                                                                                                                    <tbody>
                                                                                                                        <tr>
                                                                                                                            <td scope="col" key={index} >
                                                                                                                                <select className='services' style={{ border: "1px solid" }} value={exp.utilities[index].description} onChange={handleSelectChange}>
                                                                                                                                    {utility.map(utilitiesByTypes => (
                                                                                                                                        <option id={utilitiesByTypes.idUtility} key={utilitiesByTypes.idUtility}>{utilitiesByTypes.description}</option>
                                                                                                                                    ))}
                                                                                                                                </select>
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </div>
                                                                                                        ))}

                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Total</label>
                                                                                                            <input value={exp.total} type="number" className="form-control" style={{ border: "1px solid" }} id='total' disabled onChange={handleSelectChange} />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </form>
                                                                                            </div>
                                                                                            <div className="modal-footer">
                                                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                                <button type="button" className="btn btn-primary " onClick={() => handleUpdate(expenseSelected.idExpense)}>Actualizar Expensa</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                            <div className="col-4">
                                                                                <button type="button" className="btn btn-primary btn-actions" onClick={() => handleDelete(expense.idExpense)}>
                                                                                    <i className="bi bi-trash3-fill"></i>
                                                                                </button>
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
