import React, { useState } from "react";
import "../styles/register.css"


export default function Registration() {
    const [email, setEmail] = useState(""); // Estado para el valor del input de email
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");

    window.onkeydown = function (event) { // FUNCION QUE SIRVE PARA LOGUEARTE APRETANDO ENTER
        if (event.keyCode == '13') {
            handleRegisterClick();
        }
    }

    const handleRegisterClick = async () => {
        // Lógica que se ejecutará cuando se haga clic en el botón de login
        let emailValidation = /([a-zA-Z0-9])+@([a-zA-Z])+\.[com]/;
        let passwordValidation = /[\w-.@]{8}/;


        if (emailValidation.test(email)) {
            if (passwordValidation.test(password)) {
                if (password == passwordRepeat) {
                    let response = await fetch(`http://localhost:8100/app/users/email/${email}`, {
                        "method": 'GET',
                        "headers": {
                            "Accept": 'application/json',
                            "Content-Type": 'application/json',
                            "Origin": 'http://localhost:3000'
                        }
                    })
                    if (!response.ok) {

                        let newUser = {
                            "email": email,
                            "password": password,
                            "idRol": 1
                        };
                        console.log(newUser)
                        response = await fetch(`http://localhost:8100/app/users`, {
                            "method": 'POST',
                            "headers": {
                                "Accept": 'application/json',
                                "Content-Type": 'application/json',
                                "Origin": 'http://localhost:3000'
                            },
                            body: JSON.stringify(newUser)
                        })
                        if (response.ok) {
                            let user = await response.json();
                            response = await fetch(`http://localhost:8100/app/login`, {
                                "method": 'POST',
                                "headers": {
                                    "Accept": 'application/json',
                                    "Content-Type": 'application/json',
                                    "Origin": 'http://localhost:3000'
                                },
                                body: JSON.stringify(newUser)
                            })
                            if (response.ok) {
                                let token = await response.text() //No va await .Json ya que me retorna un string
                                console.log(token);
                                window.sessionStorage.setItem("loginOk", true);
                                window.sessionStorage.setItem("idUser", user.idUser);
                                window.sessionStorage.setItem("email", user.email);
                                window.sessionStorage.setItem("token", token);
                                window.location.href = "/";
                            }
                            else {
                                console.log("Error en el logueo del usuario");
                            }

                        }
                        else {
                            console.log("Error en el registro del usuario");
                        }

                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'El email ya existe',
                            text: 'Si cree que es un error contactese con soporte',
                        })
                    }
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Las contraseñas no coinciden',
                        text: 'Porfavor vuelva a verificar las contraseñas',
                    })
                }
            } 
            else { 
                Swal.fire({
                    icon: 'error',
                    title: 'Formato de contraseña invalido',
                    text: "La contraseña no debe ser de mas de 20 caracteres",
                })
            }

        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Formato de email invalido',
                text: "El email debe tener el siguiente formato: nombre@(gmail/hotmail/etc).com",
            })
        }

    };
    const handleEmailChange = (event) => {
        // Actualizar el estado del valor del input de email cuando cambie
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        // Actualizar el estado del valor del input de password cuando cambie
        setPassword(event.target.value);
    };

    const handlePasswordRepeatChange = (event) => {
        // Actualizar el estado del valor del input de passwordRepeat cuando cambie
        setPasswordRepeat(event.target.value);
    };

    return (
        <div className="div-sign-up" style={{ marginTop: "6%" }}>
            <section className="vh-100 bg-image">
                <div className="mask d-flex align-items-center h-100 gradient-custom-3 ">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 d-flex justify-content-center" >
                                <div className="card index" style={{ borderRadius: "15px" }} >
                                    <div className="card-body p-5">
                                        <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                                        <form>

                                            <div className="form-outline mb-4">
                                                <input type="email" id="form3Example3cg" className="form-control form-control-lg" value={email}
                                                    onChange={handleEmailChange} />
                                                <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" id="form3Example4cg" className="form-control form-control-lg" value={password}
                                                    onChange={handlePasswordChange} />
                                                <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="password" id="form3Example4cdg" className="form-control form-control-lg" value={passwordRepeat}
                                                    onChange={handlePasswordRepeatChange} />
                                                <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                                            </div>

                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                                                <label className="form-check-label" htmlFor="form2Example3g">
                                                    I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="button"
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={handleRegisterClick}>Register</button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="/"
                                                className="fw-bold text-body"><u>Login here</u></a></p>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}