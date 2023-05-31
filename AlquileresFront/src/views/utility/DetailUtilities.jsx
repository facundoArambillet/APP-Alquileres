import React, { useState, useEffect } from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function DetailUtilities(utilities) {
    let arrayUtilitiesTotal = utilities.utilities;
    const [arrayUtilitiesShow, setArrayUtilitiesShow] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [utilityTypes, setUtilityTypes] = useState([]);
    const [utilitySelected, setUtilitySelected] = useState({ //LO INICIALIZO PARA PODER SPLITEAR LA FECHA
        description: '',
        date: '',
        price: '',
        idType: 1
    })
    const [inputsValues, setInputsValues] = useState({
        description: '',
        date: '',
        price: '',
        idType: 1,
        utilityType: []
    });

    //////////////////////// PAGINACION ////////////////////////////////////////////////////////////////////////////

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        paginateUtilities(parseInt(event.target.value));
        setPage(0);
    };

    function paginateUtilities(pages) {
        const pageSize = pages;
        const startIndex = (page) * pageSize;
        const endIndex = startIndex + pageSize;
        setArrayUtilitiesShow(arrayUtilitiesTotal.slice(startIndex, endIndex));
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleSubmit = async () => {
        let response = await fetch(`http://localhost:8100/app/utilities`, {
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
            window.location.href = "/utilities";
        }
        else {
            console.log("Error")
        }
    };

    const handleUpdate = async (idUtility) => {
        console.log(inputsValues)
        let response = await fetch(`http://localhost:8100/app/utilities/${idUtility}`, {
            "method": 'PUT',
            "headers": {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "Origin": 'http://localhost:3000',
                "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(inputsValues)
        })
        if (response.ok) {
            console.log(`Servicio Actualizado`);
            window.location.href = "/utilities";
        }
        else {
            console.log("Error")
        }
    };

    const handleDelete = async (idUtility) => {
        Swal.fire({
            title: 'Esta seguro?',
            text: "Esta accion no puede revertirse una vez confirmada",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar Servicio'
        })
            .then(async (willDelete) => { //EL ASYNC DE ACA ES PARA EL AWAIT DE LA RESPUESTA DEL DELETE
                if (willDelete.isConfirmed) {
                    Swal.fire("Servicio borrado con exito", {
                        icon: "success",
                    });
                    // METO LA FUNCIONALIDAD DENTRO DEL ALERT PARA QUE NO SE DISPARE EL BORRADO SI EL USUARIO SE ARREPIENTE

                    let response = await fetch(`http://localhost:8100/app/utilities/${idUtility}`, {
                        "method": 'DELETE',
                        "headers": {
                            "Accept": 'application/json',
                            "Content-Type": 'application/json',
                            "Origin": 'http://localhost:3000',
                            "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
                        },
                    })
                    if (response.ok) {
                        console.log(`Servicio Eliminado`);
                        window.location.href = "/utilities";
                    }
                    else {
                        console.log("Error")
                    }
                }
            });
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const handleSelected = async (idUtility) => {
        let response = await fetch(`http://localhost:8100/app/utilities/${idUtility}`, {
            "method": 'GET',
            "headers": {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "Origin": 'http://localhost:3000',
                "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            },
        })
        if (response.ok) {
            let json = await response.json()
            setUtilitySelected(json)
            setInputsValues(json)
        }
        else {
            console.log("Error")
        }
    };

    const handleSelectChange = async (event) => {
        const selectedId = parseInt(event.target.options[event.target.selectedIndex].id)
        let response = await fetch(`http://localhost:8100/app/utilityTypes/${selectedId}`, {
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
            setInputsValues(prevState => ({
                ...prevState,
                idType: selectedId,
                utilityType: json
            }));
        }
        //  console.log(event.target.options[event.target.selectedIndex].id) //Con esto agarro el id del option que este seleccionado

    };

    const handleInputChange = (key, value) => {
        setInputsValues(prevState => ({
            ...prevState,
            [key]: value
        }));
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
            setInputsValues(prevState => ({
                ...prevState,
                idType: json[0].idType,
                utilityType: json[0]
            }));
        }
        else {
            console.log(response);
            console.log("Error en la carga de propiedades");
        }
    }
    useEffect(() => {
        loadUtilityTypes();
    }, []);
    useEffect(() => {
        paginateUtilities(10);
    }, [page, arrayUtilitiesTotal]);

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
                                                count={arrayUtilitiesTotal.length}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                rowsPerPage={rowsPerPage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />
                                            <table className="table table-dark table-bordered mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Tipo De Servicio</th>
                                                        <th scope="col">Descripcion</th>
                                                        <th scope="col">Fecha</th>
                                                        <th scope="col">Precio </th>
                                                        <th scope="col">ACTIONS USERS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {arrayUtilitiesShow.length === 0 ? <tr>
                                                        <td scope="col">
                                                            <select className='text-white'>
                                                                {utilityTypes.map(utilityType => (
                                                                    <option key={utilityType.idType}>{utilityType.type}</option>
                                                                ))}
                                                            </select>
                                                        </td>
                                                        <td scope="col"><input type="text" placeholder="Descripcion" className='text-white' disabled /></td>
                                                        <td scope="col"><input type="text" placeholder="Fecha" className='text-white' disabled /></td>
                                                        <td scope="col"><input type="text" placeholder="Precio" className='text-white' disabled /></td>

                                                        <td scope="col" >
                                                            <div className='row'>
                                                                <div className="col-4">
                                                                    <button type="button" className="btn btn-primary btn-actions" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
                                                                        <i className="bi bi-plus-lg"></i>
                                                                    </button>
                                                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                        <div className="modal-dialog">
                                                                            <div className="modal-content" style={{ color: "black" }}>
                                                                                <div className="modal-header">
                                                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Servicios</h1>
                                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                    <form>
                                                                                        <div className='row'>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Descripcion</label>
                                                                                                <input type="text" className="form-control" style={{ border: "1px solid" }} id='description' onChange={(e) => handleInputChange("description", e.target.value)} />
                                                                                            </div>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Fecha</label>
                                                                                                <input type="date" className="form-control" style={{ border: "1px solid" }} id='date' onChange={(e) => handleInputChange("date", e.target.value)} />
                                                                                            </div>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Precio</label>
                                                                                                <input type="number" className="form-control" style={{ border: "1px solid" }} id='price' onChange={(e) => handleInputChange("price", e.target.value)} />
                                                                                            </div>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Servicio</label>
                                                                                                <table style={{ marginLeft: "2.5%", width: "200px", height: "38px" }}>
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <select style={{ border: "1px solid" }} defaultValue={inputsValues.idType} onChange={handleSelectChange}>
                                                                                                                    {utilityTypes.map(utilityType => (
                                                                                                                        <option id={utilityType.idType} key={utilityType.idType}>{utilityType.type}</option>
                                                                                                                    ))}
                                                                                                                </select>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>

                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                                <div className="modal-footer">
                                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                    <button type="button" className="btn btn-primary " onClick={handleSubmit}>Crear Servicio</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-4">
                                                                    <button type="button" className="btn btn-primary btn-actions" >
                                                                        <i className="bi bi-arrow-repeat"></i>
                                                                    </button>

                                                                </div>
                                                                <div className="col-4">
                                                                    <button type="button" className="btn btn-primary btn-actions">
                                                                        <i className="bi bi-trash3-fill"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                        :
                                                        (arrayUtilitiesShow?.map((utility) => (
                                                            <tr key={utility.idUtility}>
                                                                <td scope="col">
                                                                    <select className='text-white' defaultValue={utility.idType}>
                                                                        {utilityTypes.map(utilityType => (
                                                                            <option value={utilityType.idType} key={utilityType.idType}>{utilityType.type}</option>
                                                                        ))}
                                                                    </select>
                                                                </td>
                                                                <td scope="col"><input type="text" defaultValue={utility.description} className='text-white' disabled /></td>
                                                                {/* Separo la fecha spliteandolo por la T , eso me devuelve un array con 2 elemntos y tomo el primero */}
                                                                <td scope="col"><input type="text" defaultValue={utility.date.split('T')[0]} className='text-white' disabled /></td>
                                                                <td scope="col"><input type="text" defaultValue={utility.price} className='text-white' disabled /></td>

                                                                <td scope="col" >
                                                                    <div className='row'>
                                                                        <div className="col-4">
                                                                            <button type="button" className="btn btn-primary btn-actions" data-bs-toggle="modal" data-bs-target="#modalCreate" >
                                                                                <i className="bi bi-plus-lg"></i>
                                                                            </button>
                                                                            <div className="modal fade" id="modalCreate" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content" style={{ color: "black" }}>
                                                                                        <div className="modal-header">
                                                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Servicios</h1>
                                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            <form>
                                                                                                <div className='row'>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Descripcion</label>
                                                                                                        <input type="text" className="form-control" style={{ border: "1px solid" }} id='description' onChange={(e) => handleInputChange("description", e.target.value)} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Fecha</label>
                                                                                                        <input type="date" className="form-control" style={{ border: "1px solid" }} id='date' onChange={(e) => handleInputChange("date", e.target.value)} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Precio</label>
                                                                                                        <input type="number" className="form-control" style={{ border: "1px solid" }} id='price' onChange={(e) => handleInputChange("price", e.target.value)} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Propiedades</label>
                                                                                                        <table style={{ marginLeft: "2.5%", width: "200px", height: "38px" }}>
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        <select style={{ border: "1px solid" }} defaultValue={inputsValues.idType} onChange={handleSelectChange}>
                                                                                                                            {utilityTypes.map(utilityType => (
                                                                                                                                <option id={utilityType.idType} key={utilityType.idType}>{utilityType.type}</option>
                                                                                                                            ))}
                                                                                                                        </select>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </form>
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                            <button type="button" className="btn btn-primary " onClick={handleSubmit}>Crear Servicio</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-4">
                                                                            <button type="button" className="btn btn-primary btn-actions" data-bs-toggle="modal" data-bs-target="#modalUpdate" onClick={() => handleSelected(utility.idUtility)}>
                                                                                <i className="bi bi-arrow-repeat"></i>
                                                                            </button>
                                                                            <div className="modal fade" id="modalUpdate" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content" style={{ color: "black" }}>
                                                                                        <div className="modal-header">
                                                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Servicios</h1>
                                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            <form>
                                                                                                <div className='row'>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Descripcion</label>
                                                                                                        <input defaultValue={utilitySelected.description} type="text" className="form-control" style={{ border: "1px solid" }} id='description' onChange={(e) => handleInputChange("description", e.target.value)} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Fecha</label>
                                                                                                        <input defaultValue={utilitySelected.date.split('T')[0]} type="date" className="form-control" style={{ border: "1px solid" }} id='date' onChange={(e) => handleInputChange("date", e.target.value)} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Precio</label>
                                                                                                        <input defaultValue={utilitySelected.price} type="number" className="form-control" style={{ border: "1px solid" }} id='price' onChange={(e) => handleInputChange("price", e.target.value)} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Propiedades</label>
                                                                                                        <table style={{ marginLeft: "2.5%", width: "200px", height: "38px" }}>
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        <select style={{ border: "1px solid" }} value={inputsValues.utilityType.type} onChange={handleSelectChange}>
                                                                                                                            {utilityTypes.map(utilityType => (
                                                                                                                                <option id={utilityType.idType} key={utilityType.idType}>{utilityType.type}</option>
                                                                                                                            ))}
                                                                                                                        </select>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </form>
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                            <button type="button" className="btn btn-primary " onClick={() => handleUpdate(utilitySelected.idUtility)}>Actualizar Servicio</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-4">
                                                                            <button type="button" className="btn btn-primary btn-actions" onClick={() => handleDelete(utility.idUtility)}>
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
