import React, { useState, useEffect } from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function DetailTenants(tenants) {
    let arrayTenants = tenants.tenants;
    const [arrayTenantsShow, setArrayTenantsShow] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [properties, setProperties] = useState([]);
    const [tenantSelected, setTenantSelected] = useState({
        name: '',
        lastName: '',
        dni: '',
        street: '',
        streetNumber: "",
        city: "",
        phoneNumber: "",
        email: "",
        idProperty: 1,
    })
    const [inputsValues, setInputsValues] = useState({
        name: '',
        lastName: '',
        dni: '',
        street: '',
        streetNumber: "",
        city: "",
        phoneNumber: "",
        email: "",
        idProperty: 1,
    });

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
        setArrayTenantsShow(arrayTenants.slice(startIndex, endIndex));
    }



    const handleSubmit = async () => {
        console.log(inputsValues)
        let response = await fetch(`http://localhost:8100/app/tenants`, {
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
            console.log(`creado`)
            window.location.href = "/tenants";
        }
        else {
            console.log("Error")
        }
    };

    const handleUpdate = async (idTenant) => {
        console.log(idTenant)
        let response = await fetch(`http://localhost:8100/app/tenants/${idTenant}`, {
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
            console.log(`Inquilino Actualizado`);
            window.location.href = "/tenants";
        }
        else {
            console.log("Error")
        }
    };

    const handleDelete = async (idTenant) => {
        Swal.fire({
            title: 'Esta seguro?',
            text: "Esta accion no puede revertirse una vez confirmada",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar Inquilino'
        })
            .then(async (willDelete) => { //EL ASYNC DE ACA ES PARA EL AWAIT DE LA RESPUESTA DEL DELETE
                if (willDelete.isConfirmed) {
                    Swal.fire("Inquilino borrado con exito", {
                        icon: "success",
                    });
                    // METO LA FUNCIONALIDAD DENTRO DEL ALERT PARA QUE NO SE DISPARE EL BORRADO SI EL USUARIO SE ARREPIENTE

                    let response = await fetch(`http://localhost:8100/app/tenants/${idTenant}`, {
                        "method": 'DELETE',
                        "headers": {
                            "Accept": 'application/json',
                            "Content-Type": 'application/json',
                            "Origin": 'http://localhost:3000',
                            "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
                        },
                    })
                    if (response.ok) {
                        console.log(`Inquilino Eliminado`);
                        window.location.href = "/tenants";
                    }
                    else {
                        console.log("Error")
                    }
                }
            });
       
    }

    const handleSelected = async (idTenant) => {
        let response = await fetch(`http://localhost:8100/app/tenants/${idTenant}`, {
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
            setTenantSelected(json);
            setInputsValues(json);
        }
        else {
            console.log("Error")
        }
    };

    const handleInputChange = (key, value) => {
        setInputsValues(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleSelectChange = (event) => {
        const selectedId = parseInt(event.target.options[event.target.selectedIndex].id)
        console.log(selectedId)
        //  console.log(event.target.options[event.target.selectedIndex].id) //Con esto agarro el id del option que este seleccionado
        setInputsValues(prevState => ({
            ...prevState,
            idProperty: selectedId
        }));

    };



    async function loadProperties() {
        let response = await fetch("http://localhost:8100/app/properties", {
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
            setInputsValues(prevState => ({
                ...prevState,
                idProperty: json[0].idProperty
            }));
        }
        else {
            console.log(response);
            console.log("Error en la carga de propiedades");
        }
    }
    useEffect(() => {
        loadProperties();
    }, []);
    useEffect(() => {
        paginateTenants(10);
    }, [page, arrayTenants]);

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
                                                count={arrayTenants.length}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                rowsPerPage={rowsPerPage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />
                                            <table className="table table-dark table-bordered mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Nombre</th>
                                                        <th scope="col">Apellido</th>
                                                        <th scope="col">Dni</th>
                                                        <th scope="col">Calle</th>
                                                        <th scope="col">Numero De Calle</th>
                                                        <th scope="col">Ciudad</th>
                                                        <th scope="col">Numero De Telefono</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Propiedades</th>
                                                        <th scope="col">ACTIONS USERS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {arrayTenantsShow.length === 0 ? <tr>
                                                        <td scope="col"><input type="text" placeholder="Nombre" className='text-white' disabled /></td>
                                                        <td scope="col"><input type="text" placeholder="Apellido" className='text-white' disabled /></td>
                                                        <td scope="col"><input type="number" placeholder="Dni" className='text-white' disabled /></td>
                                                        <td scope="col"><input type="text" placeholder="Calle" className='text-white' disabled /></td>
                                                        <td scope="col"><input type="number" placeholder="Numero De Calle" className='text-white' disabled /></td>
                                                        <td scope="col"><input type="text" placeholder="Ciudad" className='text-white' disabled /></td>
                                                        <td scope="col"><input type="number" placeholder="Numero De Telefono" className='text-white' disabled /></td>
                                                        <td scope="col"><input type="text" placeholder="Email" className='text-white' disabled /></td>
                                                        <td scope="col">
                                                            <select className='text-white'>
                                                                {properties.map(property => (
                                                                    <option key={property.idProperty}>{property.name}</option>
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
                                                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Inquilinos</h1>
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
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Apellido</label>
                                                                                                <input type="text" className="form-control" style={{ border: "1px solid" }} id='lastName' onChange={(e) => handleInputChange("lastName", e.target.value)} />
                                                                                            </div>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Dni</label>
                                                                                                <input type="number" className="form-control" style={{ border: "1px solid" }} id='dni' onChange={(e) => handleInputChange("dni", e.target.value)} />
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
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Numero De Telefono</label>
                                                                                                <input type="number" className="form-control" style={{ border: "1px solid" }} id='phoneNumber' onChange={(e) => handleInputChange("phoneNumber", e.target.value)} />
                                                                                            </div>


                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Email</label>
                                                                                                <input type="text" className="form-control" style={{ border: "1px solid" }} id='email' onChange={(e) => handleInputChange("email", e.target.value)} />
                                                                                            </div>

                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Propiedades</label>
                                                                                                <table style={{ marginLeft: "2.5%", width: "200px", height: "38px" }}>
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                <select style={{ border: "1px solid" }} defaultValue={inputsValues.idProperty}>
                                                                                                                    {properties.map(property => (
                                                                                                                        <option id={property.idProperty} key={property.idProperty}>{property.name}</option>
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
                                                                                    <button type="button" className="btn btn-primary " onClick={handleSubmit}>Crear Inquilino</button>
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
                                                        (arrayTenantsShow?.map((tenant) => (
                                                            <tr key={tenant.idTenant}>
                                                                <td scope="col"><input type="text" defaultValue={tenant.name} className='text-white' disabled /></td>
                                                                <td scope="col"><input type="text" defaultValue={tenant.lastName} className='text-white' disabled /></td>
                                                                <td scope="col"><input type="number" defaultValue={tenant.dni} className='text-white' disabled /></td>
                                                                <td scope="col"><input type="text" defaultValue={tenant.street} className='text-white' disabled /></td>
                                                                <td scope="col"><input type="number" defaultValue={tenant.streetNumber} className='text-white' disabled /></td>
                                                                <td scope="col"><input type="text" defaultValue={tenant.city} className='text-white' disabled /></td>
                                                                <td scope="col"><input type="number" defaultValue={tenant.phoneNumber} className='text-white' disabled /></td>
                                                                <td scope="col"><input type="text" defaultValue={tenant.email} className='text-white' disabled /></td>
                                                                <td scope="col">
                                                                    <select className='text-white' defaultValue={tenant.idProperty} onChange={handleSelectChange}>
                                                                        {properties.map(property => (
                                                                            <option value={property.idProperty} id={property.idProperty} key={property.idProperty}>{property.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </td>

                                                                <td scope="col" >
                                                                    <div className='row'>
                                                                        <div className="col-3">
                                                                            <button type="button" className="btn btn-primary btn-actions" data-bs-toggle="modal" data-bs-target="#modalCreate" data-bs-whatever="@getbootstrap">
                                                                                <i className="bi bi-plus-lg"></i>
                                                                            </button>
                                                                            <div className="modal fade" id="modalCreate" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content" style={{ color: "black" }}>
                                                                                        <div className="modal-header">
                                                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Inquilinos</h1>
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
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Apellido</label>
                                                                                                        <input type="text" className="form-control" style={{ border: "1px solid" }} id='lastName' onChange={(e) => handleInputChange("lastName", e.target.value)} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Dni</label>
                                                                                                        <input type="number" className="form-control" style={{ border: "1px solid" }} id='dni' onChange={(e) => handleInputChange("dni", e.target.value)} />
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
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Numero De Telefono</label>
                                                                                                        <input type="number" className="form-control" style={{ border: "1px solid" }} id='phoneNumber' onChange={(e) => handleInputChange("phoneNumber", e.target.value)} />
                                                                                                    </div>


                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Email</label>
                                                                                                        <input type="text" className="form-control" style={{ border: "1px solid" }} id='email' onChange={(e) => handleInputChange("email", e.target.value)} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Propiedades</label>
                                                                                                        <table style={{ marginLeft: "2.5%", width: "200px", height: "38px" }}>
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        <select style={{ border: "1px solid" }} defaultValue={inputsValues.idProperty} onChange={handleSelectChange}>
                                                                                                                            {properties.map(property => (
                                                                                                                                <option id={property.idProperty} key={property.idProperty}>{property.name}</option>
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
                                                                                            <button type="button" className="btn btn-primary " onClick={handleSubmit}>Crear Inquilino</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-3">
                                                                            <button type="button" className="btn btn-primary btn-actions" data-bs-toggle="modal" data-bs-target="#modalUpdate" onClick={() => handleSelected(tenant.idTenant)}>
                                                                                <i className="bi bi-arrow-repeat"></i>
                                                                            </button>
                                                                            <div className="modal fade" id="modalUpdate" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                                <div className="modal-dialog">
                                                                                    <div className="modal-content" style={{ color: "black" }}>
                                                                                        <div className="modal-header">
                                                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Inquilinos</h1>
                                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            <form>
                                                                                                <div className='row'>
                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Nombre</label>
                                                                                                        <input defaultValue={tenantSelected.name} type="text" className="form-control" style={{ border: "1px solid" }} id='name' onChange={(e) => handleInputChange('name', e.target.value)} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Apellido</label>
                                                                                                        <input defaultValue={tenantSelected.lastName} type="text" className="form-control" style={{ border: "1px solid" }} id='lastName' onChange={(e) => handleInputChange("lastName", e.target.value)} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Dni</label>
                                                                                                        <input defaultValue={tenantSelected.dni} type="number" className="form-control" style={{ border: "1px solid" }} id='dni' onChange={(e) => handleInputChange("dni", e.target.value)} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Calle</label>
                                                                                                        <input defaultValue={tenantSelected.street} type="text" className="form-control" style={{ border: "1px solid" }} id='street' onChange={(e) => handleInputChange("street", e.target.value)} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Numero De Calle</label>
                                                                                                        <input defaultValue={tenantSelected.streetNumber} type="number" className="form-control" style={{ border: "1px solid" }} id='streetNumber' onChange={(e) => handleInputChange("streetNumber", e.target.value)} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Ciudad</label>
                                                                                                        <input defaultValue={tenantSelected.city} type="text" className="form-control" style={{ border: "1px solid" }} id='city' onChange={(e) => handleInputChange("city", e.target.value)} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Numero De Telefono</label>
                                                                                                        <input defaultValue={tenantSelected.phoneNumber} type="number" className="form-control" style={{ border: "1px solid" }} id='phoneNumber' onChange={(e) => handleInputChange("phoneNumber", e.target.value)} />
                                                                                                    </div>


                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Email</label>
                                                                                                        <input defaultValue={tenantSelected.email} type="text" className="form-control" style={{ border: "1px solid" }} id='email' onChange={(e) => handleInputChange("email", e.target.value)} />
                                                                                                    </div>

                                                                                                    <div className="mb-3 col-6">
                                                                                                        <label htmlFor="recipient-name" className="col-form-label">Propiedades</label>
                                                                                                        <table style={{ marginLeft: "2.5%", width: "200px", height: "38px" }}>
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td>
                                                                                                                        {/* {console.log(tenantSelected.idProperty)} */}
                                                                                                                        <select style={{ border: "1px solid" }} defaultValue={tenantSelected.idProperty} onChange={handleSelectChange}>
                                                                                                                            {properties.map(property => (
                                                                                                                                <option id={property.idProperty} key={property.idProperty}>{property.name}</option>
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
                                                                                            <button type="button" className="btn btn-primary " onClick={() => handleUpdate(tenantSelected.idTenant)} >Actualizar Inquilino</button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className="col-3">
                                                                            <button type="button" className="btn btn-primary btn-actions" onClick={() => handleDelete(tenant.idTenant)}>
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
