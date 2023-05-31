import React, { useState } from "react";
import "../styles/index.css"

export default function Index() {
    const LOGIN = window.sessionStorage.getItem("loginOk");
    const [email, setEmail] = useState(""); // Estado para el valor del input de email
    const [password, setPassword] = useState("");

    window.onkeydown = function (event) { // FUNCION QUE SIRVE PARA LOGUEARTE APRETANDO ENTER
        if (event.keyCode == '13') {
            handleLoginClick();
        }
    }

    const handleLoginClick = async () => {
        // Lógica que se ejecutará cuando se haga clic en el botón de login
        console.log("Email:", email);
        console.log("Password:", password);
        let response = await fetch(`http://localhost:8100/app/users/email/${email}`, {
            "method": 'GET',
            "headers": {
                "Accept": 'application/json',
                "Content-Type": 'application/json',
                "Origin": 'http://localhost:3000'
            }
        })
        if (response.ok) {
            let userSearch = await response.json();
            let user = {
                "email": email,
                "password": password
            }
            console.log(user);
            response = await fetch(`http://localhost:8100/app/login`, {
                "method": 'POST',
                "headers": {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json',
                    "Origin": 'http://localhost:3000'
                },
                body: JSON.stringify(user)
            })
            if (response.ok) {
                let token = await response.text();
                console.log(token)
                window.sessionStorage.setItem("loginOk", true);
                window.sessionStorage.setItem("idUser", userSearch.idUser);
                window.sessionStorage.setItem("email", userSearch.email);
                window.sessionStorage.setItem("idRol", userSearch.idRol);
                window.sessionStorage.setItem("token", token);
                window.location.href = "/";
                console.log("Sesion iniciada");
            }
            else {
                console.log("Email o contrasenia invalido");
            }
        }
        else {
            console.log("Email no encontrado");
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

    return (
        <> {LOGIN ? (
            <div className="container-fluid index">
                <p>Esta es una web de alquileres en la cual se pueden cargar propiedades, asociarlas a sus respectivos inquilinos,
                    cargar los servicios que luego se utilizan para crear las expensas y finalmente generar la factura pudiendo
                    descargarla en formato pdf.
                </p>

            </div>

        ) : (
            <div className="div-index">
                <div className="container-fluid d-flex justify-content-center" >
                    <div className="row index" style={{ width: "125%", maxWidth: "420px" }}>
                        <div className="panel border bg-white">
                            <div className="panel-heading">
                                <h3 className="pt-3 font-weight-bold">Login</h3>
                            </div>
                            <div className="panel-body p-3">
                                <form method="POST">
                                    <div className="form-group py-2">
                                        <div className="input-field">
                                            <span className="far fa-user p-2"></span>
                                            <input type="text" placeholder="Username or Email" required value={email} // Asignar el valor del estado al input de email
                                                onChange={handleEmailChange} />
                                        </div>
                                    </div>
                                    <div className="form-group py-1 pb-2">
                                        <div className="input-field">
                                            <span className="fas fa-lock px-2"></span>
                                            <input type="password" placeholder="Enter your Password" required value={password} // Asignar el valor del estado al input de password
                                                onChange={handlePasswordChange} />
                                            <button className="btn bg-white text-muted">
                                                <i className="bi bi-eye-fill"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-inline" style={{ display: "flex", justifyContent: "flex-end" }}>
                                        <input type="checkbox" name="remember" id="remember" />
                                        <label htmlFor="remember" className="text-muted">Remember me</label>
                                        <a href="#" id="forgot" className="font-weight-bold">Forgot password?</a>
                                    </div>
                                    <div className="btn btn-primary btn-block mt-4 " style={{ width: "100%" }} onClick={handleLoginClick}>Login</div>
                                    <div className="text-center pt-4 text-muted">Don't have an account? <a href="/registro">Sign up</a>
                                    </div>
                                </form>
                            </div>
                            <div className="mx-3 my-2 py-2 bordert">
                                <div className="text-center py-3">
                                    <a href="https://wwww.facebook.com" target="_blank" className="px-2">
                                        <img src="https://www.dpreview.com/files/p/articles/4698742202/facebook.jpeg" alt="" />
                                    </a>
                                    <a href="https://www.google.com" target="_blank" className="px-2">
                                        <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                                            alt="" />
                                    </a>

                                    <a href="https://www.github.com" target="_blank" className="px-2">
                                        <img src="https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-github-icon-35.png"
                                            alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )}

        </>

    )
}