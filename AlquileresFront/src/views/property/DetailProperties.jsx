import React, { useState, useEffect } from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function DetailProperties(properties) {
    let arrayProperties = properties.properties;
    const [arrayPropertiesShow, setArrayPropertiesShow] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [propertyTypes, setPropertyTypes] = useState([]);
    const [propertySelected, setPropertySelected] = useState({})
    const [inputsValues, setInputsValues] = useState({
        name: '',
        rentPrice: '',
        street: '',
        streetNumber: '',
        city: "",
        description: "",
        percentageExpenses: "",
        idType: 1
    });

    //////////////////////// PAGINACION ////////////////////////////////////////////////////////////////////////////

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));
        paginateProperties(parseInt(event.target.value));
        setPage(0);
    };

    function paginateProperties(pages) {
        const pageSize = pages;
        const startIndex = (page) * pageSize;
        const endIndex = startIndex + pageSize;
        setArrayPropertiesShow(arrayProperties.slice(startIndex, endIndex));
    }


    const handleSubmit = async () => {
        let response = await fetch(`http://localhost:8100/app/properties`, {
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
            console.log(`Propiedad Creada`);
            window.location.href = "/properties";
        }
        else {
            console.log("Error")
        }
    };

    const handleUpdate = async (idProperty) => {
        console.log(inputsValues)
        let response = await fetch(`http://localhost:8100/app/properties/${idProperty}`, {
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
            console.log(`Propiedad Actualizada`);
            window.location.href = "/properties";
        }
        else {
            console.log("Error")
        }
    };

    const handleDelete = async (idProperty) => {
        Swal.fire({
            title: 'Esta seguro?',
            text: "Esta accion no puede revertirse una vez confirmada",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar Propiedad'
        })
            .then(async (willDelete) => { //EL ASYNC DE ACA ES PARA EL AWAIT DE LA RESPUESTA DEL DELETE
                if (willDelete.isConfirmed) {
                    Swal.fire("Propiedad borrada con exito", {
                        icon: "success",
                    });
                    // METO LA FUNCIONALIDAD DENTRO DEL ALERT PARA QUE NO SE DISPARE EL BORRADO SI EL USUARIO SE ARREPIENTE

                    let response = await fetch(`http://localhost:8100/app/properties/${idProperty}`, {
                        "method": 'DELETE',
                        "headers": {
                            "Accept": 'application/json',
                            "Content-Type": 'application/json',
                            "Origin": 'http://localhost:3000',
                            "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
                        },
                    })
                    if (response.ok) {
                        console.log(`Propiedad Eliminada`);
                        window.location.href = "/properties";
                    }
                    else {
                        console.log("Error")
                    }
                }
            });
       
    }

    const handleSelected = async (idProperty) => {
        let response = await fetch(`http://localhost:8100/app/properties/${idProperty}`, {
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
            setPropertySelected(json);
            setInputsValues(json);
        }
        else {
            console.log("Error")
        }
    };

    const handleSelectChange = (event) => {
        const selectedId = parseInt(event.target.options[event.target.selectedIndex].id)
        //  console.log(event.target.options[event.target.selectedIndex].id) //Con esto agarro el id del option que este seleccionado
        setInputsValues(prevState => ({
            ...prevState,
            idType: selectedId
        }));
    };

    const handleInputChange = (key, value) => {
        setInputsValues(prevState => ({
            ...prevState,
            [key]: value
        }));
    };


    async function loadTypesProperty() {
        let response = await fetch("http://localhost:8100/app/propertyTypes", {
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
            setInputsValues(prevState => ({
                ...prevState,
                idType: json[0].idType
            }));
        }
        else {
            console.log(response)
            console.log("Error en la carga de tipos de propiedad")
        }
    }
    useEffect(() => {
        loadTypesProperty();
    }, []);
    useEffect(() => {
        paginateProperties(10);
    }, [page, arrayProperties]);
    return (
        <>
            <div className="div-tables">
                <section className="intro">
                    <div className="gradient-custom-2 h-100">
                        <div className="mask d-flex align-items-center h-100">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-12">
                                        <TablePagination
                                            component="div"
                                            count={arrayProperties.length}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            rowsPerPage={rowsPerPage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                        <div className="table-responsive">
                                            <table className="table table-dark table-bordered mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Precio</th>
                                                        <th scope="col">Calle</th>
                                                        <th scope="col">Numero De Calle</th>
                                                        <th scope="col">Ciudad</th>
                                                        <th scope="col">Descripcion</th>
                                                        <th scope="col">Porcentaje De Expensas</th>
                                                        <th scope="col">Tipo De Propiedad</th>
                                                        <th scope="col">ACTIONS USERS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {arrayPropertiesShow.length === 0 ? <tr>
                                                        <td scope="col"><input type="text" placeholder="Nombre" className='text-white' disabled /></td>
                                                        <td scope="col"><input type="number" placeholder="Precio" className='text-white' disabled /></td>
                                                        <td scope="col"><input type="text" placeholder="Calle" className='text-white' disabled /></td>
                                                        <td scope="col"><input type="number" placeholder="Numero De Calle" className='text-white' disabled /></td>
                                                        <td scope="col"><input type="text" placeholder="Ciudad" className='text-white' disabled /></td>
                                                        <td scope="col"><input type="text" placeholder="Descripcion" className='text-white' disabled /></td>
                                                        <td scope="col"><input type="number" placeholder="Porcentaje De Expensas" className='text-white' disabled /></td>
                                                        <td scope="col">
                                                            <select className='text-white'>
                                                                {propertyTypes.map(propertyType => (
                                                                    <option id={propertyType.idType} key={propertyType.idType}>{propertyType.type}</option>
                                                                ))}
                                                            </select>
                                                        </td>

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
                                                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Propiedades</h1>
                                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                    <form>
                                                                                        <div className='row'>
                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Nombre</label>
                                                                                                <input type="text" className="form-control" style={{ border: "1px solid" }} id='name' onChange={(e) => handleInputChange('name', e.target.value)} />
                                                                                            </div>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Precio</label>
                                                                                                <input type="number" className="form-control" style={{ border: "1px solid" }} id='rentPrice' onChange={(e) => handleInputChange("rentPrice", e.target.value)} />
                                                                                            </div>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Calle</label>
                                                                                                <input type="text" className="form-control" style={{ border: "1px solid" }} id='street' onChange={(e) => handleInputChange("street", e.target.value)} />
                                                                                            </div>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Numero De Calle</label>
                                                                                                <input type="number" className="form-control" style={{ border: "1px solid" }} id='streetNumber' onChange={(e) => handleInputChange("streetNumber", e.target.value)} />
                                                                                            </div>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Ciudad</label>
                                                                                                <input type="text" className="form-control" style={{ border: "1px solid" }} id='city' onChange={(e) => handleInputChange("city", e.target.value)} />
                                                                                            </div>
                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Descripcion</label>
                                                                                                <input type="text" className="form-control" style={{ border: "1px solid" }} id='description' onChange={(e) => handleInputChange("description", e.target.value)} />
                                                                                            </div>
                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Porcentaje de Expensas</label>
                                                                                                <input type="number" className="form-control" style={{ border: "1px solid" }} id='percentageExpenses' onChange={(e) => handleInputChange("percentageExpenses", e.target.value)} />
                                                                                            </div>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Tipo De Propiedad</label>
                                                                                                <table style={{ marginLeft: "2.5%", width: "200px", height: "38px" }}>
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <select style={{ border: "1px solid" }} onChange={handleSelectChange}>
                                                                                                                    {propertyTypes.map(propertyType => (
                                                                                                                        <option id={propertyType.idType} key={propertyType.idType}>{propertyType.type}</option>
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
                                                                                    <button type="button" className="btn btn-primary " onClick={handleSubmit}>Crear Propiedades</button>
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
                                                            arrayPropertiesShow?.map((property) => (
                                                                <tr key={property.idProperty}>
                                                                    <td scope="col"><input type="text" defaultValue={property.name} className='text-white' disabled /></td>
                                                                    <td scope="col"><input type="number" defaultValue={property.rentPrice} className='text-white' disabled /></td>
                                                                    <td scope="col"><input type="text" defaultValue={property.street} className='text-white' disabled /></td>
                                                                    <td scope="col"><input type="number" defaultValue={property.streetNumber} className='text-white' disabled /></td>
                                                                    <td scope="col"><input type="text" defaultValue={property.city} className='text-white' disabled /></td>
                                                                    <td scope="col"><input type="text" defaultValue={property.description} className='text-white' disabled /></td>
                                                                    <td scope="col"><input type="number" defaultValue={property.percentageExpenses} className='text-white' disabled /></td>
                                                                    <td scope="col">
                                                                        <select className='text-white' defaultValue={property.idType}>
                                                                            {propertyTypes.map(propertyType => (
                                                                                <option value={propertyType.idType} id={propertyType.idType} key={propertyType.idType}>{propertyType.type}</option>
                                                                            ))}
                                                                        </select>
                                                                    </td>

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
                                                                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Propiedades</h1>
                                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                            </div>
                                                                                            <div className="modal-body">
                                                                                                <form>
                                                                                                    <div className='row'>
                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Nombre</label>
                                                                                                            <input type="text" className="form-control" style={{ border: "1px solid" }} id='name' onChange={(e) => handleInputChange('name', e.target.value)} />
                                                                                                        </div>

                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Precio</label>
                                                                                                            <input type="number" className="form-control" style={{ border: "1px solid" }} id='rentPrice' onChange={(e) => handleInputChange("rentPrice", e.target.value)} />
                                                                                                        </div>

                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Street</label>
                                                                                                            <input type="text" className="form-control" style={{ border: "1px solid" }} id='street' onChange={(e) => handleInputChange("street", e.target.value)} />
                                                                                                        </div>

                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Street Number</label>
                                                                                                            <input type="text" className="form-control" style={{ border: "1px solid" }} id='streetNumber' onChange={(e) => handleInputChange("streetNumber", e.target.value)} />
                                                                                                        </div>

                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Ciudad</label>
                                                                                                            <input type="text" className="form-control" style={{ border: "1px solid" }} id='city' onChange={(e) => handleInputChange("city", e.target.value)} />
                                                                                                        </div>

                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Descripcion</label>
                                                                                                            <input type="text" className="form-control" style={{ border: "1px solid" }} id='description' onChange={(e) => handleInputChange("description", e.target.value)} />
                                                                                                        </div>

                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Porcentaje De Expensas</label>
                                                                                                            <input type="number" className="form-control" style={{ border: "1px solid" }} id='percentagesExpenses' onChange={(e) => handleInputChange("percentageExpenses", e.target.value)} />
                                                                                                        </div>

                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Tipo De Propiedades</label>
                                                                                                            <table style={{ marginLeft: "2.5%", width: "200px", height: "38px" }}>
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td>
                                                                                                                            <select style={{ border: "1px solid" }} defaultValue={inputsValues.idType} onChange={handleSelectChange}>
                                                                                                                                {propertyTypes.map(propertyType => (
                                                                                                                                    <option id={propertyType.idType} key={propertyType.idType}>{propertyType.type}</option>
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
                                                                                                <button type="button" className="btn btn-primary " onClick={handleSubmit}>Crear Propiedad</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-3">
                                                                                <button type="button" className="btn btn-primary btn-actions" data-bs-toggle="modal" data-bs-target="#modalUpdate" onClick={() => handleSelected(property.idProperty)}>
                                                                                    <i className="bi bi-arrow-repeat"></i>
                                                                                </button>
                                                                                <div className="modal fade" id="modalUpdate" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                                    <div className="modal-dialog">
                                                                                        <div className="modal-content" style={{ color: "black" }}>
                                                                                            <div className="modal-header">
                                                                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Propiedades</h1>
                                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                            </div>
                                                                                            <div className="modal-body">
                                                                                                <form>
                                                                                                    <div className='row'>
                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Nombre</label>
                                                                                                            <input defaultValue={propertySelected.name} type="text" className="form-control" style={{ border: "1px solid" }} id='name' onChange={(e) => handleInputChange('name', e.target.value)} />
                                                                                                        </div>

                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Precio</label>
                                                                                                            <input defaultValue={propertySelected.rentPrice} type="number" className="form-control" style={{ border: "1px solid" }} id='rentPrice' onChange={(e) => handleInputChange("rentPrice", e.target.value)} />
                                                                                                        </div>

                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Street</label>
                                                                                                            <input defaultValue={propertySelected.street} type="text" className="form-control" style={{ border: "1px solid" }} id='street' onChange={(e) => handleInputChange("street", e.target.value)} />
                                                                                                        </div>

                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Street Number</label>
                                                                                                            <input defaultValue={propertySelected.streetNumber} type="text" className="form-control" style={{ border: "1px solid" }} id='streetNumber' onChange={(e) => handleInputChange("streetNumber", e.target.value)} />
                                                                                                        </div>

                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Ciudad</label>
                                                                                                            <input defaultValue={propertySelected.city} type="text" className="form-control" style={{ border: "1px solid" }} id='city' onChange={(e) => handleInputChange("city", e.target.value)} />
                                                                                                        </div>

                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Descripcion</label>
                                                                                                            <input defaultValue={propertySelected.description} type="text" className="form-control" style={{ border: "1px solid" }} id='description' onChange={(e) => handleInputChange("description", e.target.value)} />
                                                                                                        </div>

                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Porcentaje De Expensas</label>
                                                                                                            <input defaultValue={propertySelected.percentageExpenses} type="number" className="form-control" style={{ border: "1px solid" }} id='percentagesExpenses' onChange={(e) => handleInputChange("percentageExpenses", e.target.value)} />
                                                                                                        </div>

                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Tipo De Propiedades</label>
                                                                                                            <table style={{ marginLeft: "2.5%", width: "200px", height: "38px" }}>
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td>
                                                                                                                            <select style={{ border: "1px solid" }} defaultValue={inputsValues.idType} onChange={handleSelectChange}>
                                                                                                                                {propertyTypes.map(propertyType => (
                                                                                                                                    <option defaultValue={propertyType.idType} id={propertyType.idType} key={propertyType.idType}>{propertyType.type}</option>
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
                                                                                                <button type="button" className="btn btn-primary " onClick={() => handleUpdate(propertySelected.idProperty)}>Actualizar Propiedad</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-3">
                                                                                <button type="button" className="btn btn-primary btn-actions" onClick={() => handleDelete(property.idProperty)}>
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
