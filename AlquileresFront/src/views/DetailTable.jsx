import React, { useState, useEffect } from 'react';
export default function DetailTable(data, relation) {
    console.log(data)
    const [objectValues, setObjectValues] = useState({});
    const PATHNAME = window.location.pathname; //Hago esto teniendo en cuenta que en mi backend la url va a ser igual que en mi front
    const KEYS = [];
    const VALUES = [];
    let dataObjects = [];
    let objectsArrayRelation = data.relation;
    let objectsArrayRelationKeys = [];
    let objectsArrayRelationValues = [];
    let newPATHNAME = PATHNAME.substring(1); //Le saco la /

    dataObjects = data.data; // Recibo un array de objectos y lo defino en dataObjects para poder iterarlo
    dataObjects.map(data => (
        KEYS.push(Object.keys(data))    //Guardo las keys en un array
    ));
    dataObjects.map(data => (
        VALUES.push(Object.values(data)) //Guardo los values en otro array
    ));
    KEYS.forEach(key => {               //Elimino la ante-ultima key si es un objeto(En caso de que tenga relacion)
        if (typeof key === 'object') {
            key.splice(-2, 1);
        }
    });


    VALUES.forEach(valueArray => {      //Elimino el ante-ultimo value si es un objeto(En caso de que tenga relacion)
        if (typeof valueArray === 'object') {
            valueArray.splice(-2, 1);
        }

    });

    const handleInputChange = (key, value) => {
        setObjectValues(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleSubmit = async () => {
        let response = await fetch(`http://localhost:8100/app/${newPATHNAME}`, {
            "method": 'POST',
            "headers": {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "Origin": 'http://localhost:3000',
                "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            },
            body: JSON.stringify(objectValues)
        })
        if (response.ok) {
            console.log(`${PATHNAME} creado`)
        }
        else {
            console.log("Error")
        }
    };

    function dividirPorMayuscula(texto) {
        // console.log(typeof texto)
        const posicion = texto.search(/[A-Z]/);
        if (posicion !== -1) {
            const primeraParte = texto.slice(0, posicion).toLowerCase();
            const segundaParte = texto.slice(posicion).toLowerCase();
            return `${primeraParte.charAt(0).toUpperCase()}${primeraParte.slice(1)} ${segundaParte.charAt(0).toUpperCase()}${segundaParte.slice(1)}`;
        } else {
            return texto.charAt(0).toUpperCase() + texto.slice(1);
        }
    }
    if(objectsArrayRelation != []) {
        objectsArrayRelation.map(object => {
            objectsArrayRelationKeys.push(Object.keys(object));
            objectsArrayRelationValues.push(Object.values(object));
        })
    }


    // console.log(objectsArrayRelationKeys)
    // console.log(objectsArrayRelationValues[0][0])
    return (
        <>
            <thead>
                <tr>
                    {KEYS[0]?.map(key => (
                        <th key={key} scope="col">{dividirPorMayuscula(key)}</th>
                    ))}
                    <th scope="col">ACTIONS USERS</th>
                </tr>
            </thead>
            <tbody>
                {KEYS[0] == undefined ? <tr>
                    <td scope="col" >
                        <div className='row'>
                            <div className="col-3">
                                <button type="button" className="btn btn-primary btn-actions" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
                                    <i className="bi bi-plus-lg"></i>
                                </button>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-primary btn-actions" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
                                    <i className="bi bi-arrow-repeat"></i>
                                </button>
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content" style={{ color: "black" }}>
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">{PATHNAME}</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className='row'>
                                                        {KEYS[0]?.map(key => (
                                                            <div key={key} className="mb-3 col-6">
                                                                <label htmlFor="recipient-name" className="col-form-label">{dividirPorMayuscula(key)}:</label>
                                                                {typeof data[key] === "string" ? (
                                                                    <input type="text" className="form-control" id={key} style={{ border: "1px solid" }} onChange={(e) => handleInputChange(key, e.target.value)} />
                                                                ) : (
                                                                    <input type="number" className="form-control" id={key} style={{ border: "1px solid" }} onChange={(e) => handleInputChange(key, e.target.value)} />
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-primary " onClick={handleSubmit}>Crear {newPATHNAME}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <button type="button" className="btn btn-primary btn-actions" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
                                    <i className="bi bi-trash3-fill"></i>
                                </button>
                            </div>
                        </div>
                    </td>
                </tr> : (
                    VALUES?.map((valueArray, index) => (
                        <tr key={index}>
                            {valueArray.map((value, idx) => (
                                <td key={idx} scope="col">
                                    {typeof value === "string" ? (
                                        <input type="text" defaultValue={value} className='text-white' />
                                    ) : (typeof value === "number" ? (
                                        <input type="number" defaultValue={value} className='text-white' />)
                                        : (
                                            <select className='text-white'>
                                                {objectsArrayRelationValues.map(object => (
                                                        <option key={object[0]}>{object[1]}</option>
                                                    // <option key={objectsArrayRelationValues[0][0]}>{objectsArrayRelationValues[0][1]}</option>
                                                ))}
                                            </select>
                                        )

                                    )}
                                </td>
                            ))}
                            <td scope="col" >
                                <div className='row'>
                                    <div className="col-3">
                                        <button type="button" className="btn btn-primary btn-actions" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
                                            <i className="bi bi-plus-lg"></i>
                                        </button>
                                    </div>
                                    <div className="col-3">
                                        <button type="button" className="btn btn-primary btn-actions" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
                                            <i className="bi bi-arrow-repeat"></i>
                                        </button>
                                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content" style={{ color: "black" }}>
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">{newPATHNAME}</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form>
                                                            <div className='row'>
                                                                {KEYS[0]?.map(key => (
                                                                    <div key={key} className="mb-3 col-6">
                                                                        <label htmlFor="recipient-name" className="col-form-label">{dividirPorMayuscula(key)}:</label>
                                                                        {typeof data[key] === "string" ? (
                                                                            <input type="text" className="form-control" id={key} style={{ border: "1px solid" }} onChange={(e) => handleInputChange(key, e.target.value)} />
                                                                        ) : (
                                                                            <input type="number" className="form-control" id={key} style={{ border: "1px solid" }} onChange={(e) => handleInputChange(key, e.target.value)} />
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" className="btn btn-primary " onClick={handleSubmit}>Crear {newPATHNAME}</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <button type="button" className="btn btn-primary btn-actions" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">
                                            <i className="bi bi-trash3-fill"></i>
                                        </button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    )))}
            </tbody>

        </>
    )
}
