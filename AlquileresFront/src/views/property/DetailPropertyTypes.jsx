import React, { useState, useEffect } from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function DetailPropertyTypes(propertyTypes) {
    let arrayPropertyTypes = propertyTypes.propertyTypes;
    const [arrayPropertyTypesShow, setArrayPropertyTypesShow] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [typeSelected, setypeSelected] = useState({})
    const [inputsValues, setInputsValues] = useState({
        type: '',
    });

    //////////////////////// PAGINACION ////////////////////////////////////////////////////////////////////////////

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {

        setRowsPerPage(parseInt(event.target.value, 10));
        paginatePropertyTypes(parseInt(event.target.value));
        setPage(0);
    };

    function paginatePropertyTypes(pages) {
        const pageSize = pages;
        const startIndex = (page) * pageSize;
        const endIndex = startIndex + pageSize;
        setArrayPropertyTypesShow(arrayPropertyTypes.slice(startIndex, endIndex));
    }

    const handleSubmit = async () => {
        let response = await fetch(`http://localhost:8100/app/propertyTypes`, {
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
            console.log(`Tipo de propiedad Creada`);
            window.location.href = "/propertyTypes";
        }
        else {
            console.log("Error")
        }
    };

    const handleUpdate = async (idPropertyType) => {
        console.log(idPropertyType)
        let response = await fetch(`http://localhost:8100/app/propertyTypes/${idPropertyType}`, {
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
            console.log(`Tipo de propiedad Actualizada`);
            window.location.href = "/propertyTypes";
        }
        else {
            console.log("Error")
        }
    };

    const handleDelete = async (idPropertyType) => {
        Swal.fire({
            title: 'Esta seguro?',
            text: "Esta accion no puede revertirse una vez confirmada",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar Tipo de Propiedad'
        })
            .then(async (willDelete) => { //EL ASYNC DE ACA ES PARA EL AWAIT DE LA RESPUESTA DEL DELETE
                if (willDelete.isConfirmed) {
                    Swal.fire("Tipo de propiedad borrada con exito", {
                        icon: "success",
                    });
                    // METO LA FUNCIONALIDAD DENTRO DEL ALERT PARA QUE NO SE DISPARE EL BORRADO SI EL USUARIO SE ARREPIENTE

                    let response = await fetch(`http://localhost:8100/app/propertyTypes/${idPropertyType}`, {
                        "method": 'DELETE',
                        "headers": {
                            "Accept": 'application/json',
                            "Content-Type": 'application/json',
                            "Origin": 'http://localhost:3000',
                            "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
                        },
                    })
                    if (response.ok) {
                        console.log(`Tipo de propiedad Eliminada`);
                        window.location.href = "/propertyTypes";
                    }
                    else {
                        console.log("Error")
                    }
                }
            });
        
    }

    const handleSelected = async (idPropertyType) => {
        let response = await fetch(`http://localhost:8100/app/propertyTypes/${idPropertyType}`, {
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
            setypeSelected(json)
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
    useEffect(() => {
        paginatePropertyTypes(10);
    }, [page, arrayPropertyTypes]);
    return (
        <>
            <div className="div-tables">
                <section className="intro">
                    <div className="gradient-custom-2 h-100">
                        <div className="mask d-flex align-items-center h-100 justify-content-center">
                            <div >
                                <div className="row justify-content-center">
                                    <div className="col-12">
                                        <div className="table-responsive">
                                        <TablePagination
                                                component="div"
                                                count={arrayPropertyTypes.length}
                                                page={page}
                                                onPageChange={handleChangePage}
                                                rowsPerPage={rowsPerPage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />
                                            <table className="table table-dark table-bordered mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Tipo De Propiedad</th>
                                                        <th scope="col">ACTIONS USERS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {arrayPropertyTypesShow.length === 0 ? <tr>
                                                        <td scope="col"><input type="text" placeholder="Tipo" className='text-white' disabled /></td>

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
                                                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Tipo De Propiedad</h1>
                                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                </div>
                                                                                <div className="modal-body">
                                                                                    <form>
                                                                                        <div className='row'>
                                                                                            <div className="mb-3 col-6">
                                                                                                <label htmlFor="recipient-name" className="col-form-label">Tipo</label>
                                                                                                <input type="text" className="form-control" style={{ border: "1px solid" }} id='type' onChange={(e) => handleInputChange('type', e.target.value)} />
                                                                                            </div>
                                                                                        </div>
                                                                                    </form>
                                                                                </div>
                                                                                <div className="modal-footer">
                                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                    <button type="button" className="btn btn-primary " onClick={handleSubmit}>Crear Tipo de Propiedad</button>
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
                                                        : (
                                                            arrayPropertyTypesShow?.map((propertyType) => (
                                                                <tr key={propertyType.idPropertyType}>
                                                                    <td scope="col"><input type="text" defaultValue={propertyType.type} className='text-white' id={propertyType.idType} onChange={(e) => handleInputChange('type', e.target.value)} disabled /></td>
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
                                                                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Tipo De Propiedad</h1>
                                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                            </div>
                                                                                            <div className="modal-body">
                                                                                                <form>
                                                                                                    <div className='row'>
                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Tipo</label>
                                                                                                            <input type="text" className="form-control" style={{ border: "1px solid" }} id='type' onChange={(e) => handleInputChange('type', e.target.value)} />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </form>
                                                                                            </div>
                                                                                            <div className="modal-footer">
                                                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                                <button type="button" className="btn btn-primary " onClick={handleSubmit}>Crear Tipo De Propiedad</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-4">
                                                                                <button id={propertyType.idType} type="button" className="btn btn-primary btn-actions" data-bs-toggle="modal" data-bs-target="#modalUpdate" onClick={() => handleSelected(propertyType.idType)}>
                                                                                    <i className="bi bi-arrow-repeat"></i>
                                                                                </button>
                                                                                <div className="modal fade" id="modalUpdate" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                                    <div className="modal-dialog">
                                                                                        <div className="modal-content" style={{ color: "black" }}>
                                                                                            <div className="modal-header">
                                                                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Actualizar</h1>
                                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                            </div>
                                                                                            <div className="modal-body">
                                                                                                <form>
                                                                                                    <div className='row'>
                                                                                                        <div className="mb-3 col-6">
                                                                                                            <label htmlFor="recipient-name" className="col-form-label">Tipo</label>
                                                                                                            <input defaultValue={typeSelected.type} type="text" className="form-control" style={{ border: "1px solid" }} id='type' onChange={(e) => handleInputChange('type', e.target.value)} />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </form>
                                                                                            </div>
                                                                                            <div className="modal-footer">
                                                                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                                                <button type="button" className="btn btn-primary " onClick={() => handleUpdate(typeSelected.idType)}>Actualizar Tipo</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-4">
                                                                                <button id={propertyType.idType} type="button" className="btn btn-primary btn-actions" onClick={() => handleDelete(propertyType.idType)}>
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
