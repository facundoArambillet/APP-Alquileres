import React from "react";
import { Link } from "react-router-dom";

import '../styles/footer.css';
// Imagenes de las redes
import instagram from "../assets/redes/instagram.svg";
import twitter from "../assets/redes/twitter.svg";
import youtube from "../assets/redes/youtube.svg";
import facebook from "../assets/redes/facebook.svg";

function Footer() {
    return (
        <footer className="fondo_dark">
            <div className="container">
                <Link to="/">Home</Link>
                <ul className="list-inline">
                    <li className="list-inline-item"><img src={instagram} alt="Instagram" className="img-fluid" /></li>
                    <li className="list-inline-item"><img src={twitter} alt="twitter" className="img-fluid" /></li>
                    <li className="list-inline-item"><img src={youtube} alt="youtube" className="img-fluid" /></li>
                    <li className="list-inline-item"><img src={facebook} alt="facebook" className="img-fluid" /></li>
                </ul>
                <small>© 2023 All Rights Reserved</small>
            </div>
        </footer>
    );
}

export default Footer;