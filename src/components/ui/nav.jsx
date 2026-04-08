import logo from '../../assets/logo2.png'
import Login from "../features/login.jsx";
import {useSelector} from "react-redux";
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import M from 'materialize-css';

import {useEffect, useRef} from "react";


const Nav = () => {
    const users = useSelector(state => state.login);
    const dropdownTriggerRef = useRef(null);
    useEffect(() => {

        // 2. Inicializamos usando la referencia física del elemento
        if (dropdownTriggerRef.current) {
            M.Dropdown.init(dropdownTriggerRef.current, {
                coverTrigger: false,
                constrainWidth: false
            });
        }

    }, [users.login]);

    const handleLogout = () => {
        console.log("Cerrando sesión...");
        // Tu lógica para limpiar el estado/API aquí
    };

    return (
        users.login || localStorage.getItem("login") === "true"?        <>    {/* Estructura del Dropdown [1] */}

            <ul id="user-dropdown" className="dropdown-content">
                <li><a href="#!" className="light-blue-text text-darken-4"><i className="material-icons">edit</i>Editar</a></li>
                <li className="divider"></li>
                <li><a href="#!" className="red-text"><i className="material-icons">exit_to_app</i>Cerrar sesión</a></li>
            </ul>

            <nav className="light-blue lighten-5">
                <div className="nav-wrapper container">

                    <a href="#!" className="brand-logo left" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <img
                            src={logo}
                            alt="Logo"
                            style={{
                                maxHeight: '90%',  // Ajusta este porcentaje para dejar margen arriba y abajo
                                width: 'auto',     // Mantiene la proporción de la imagen
                                verticalAlign: 'middle'
                            }}
                        />
                        <b className="light-blue-text text-darken-4"> Do</b> <b className="teal-text text-darken-1"> Today</b>
                    </a>

                    <ul className="right">
                        <li>
                            <a
                                ref={dropdownTriggerRef} // 3. Vinculamos la referencia
                                className="dropdown-trigger  grey-text text-darken-4"
                                href="#!"
                                data-target="user-dropdown" // 4. DEBE coincidir con el ID de la ul
                            >
                                <i className="material-icons left">account_circle</i>
                                {users.username || localStorage.getItem("username")}
                                <i className="material-icons right">arrow_drop_down</i>
                            </a>
                        </li>
                    </ul>

                </div>
            </nav>

        </>: <><nav className="light-blue lighten-5">
            <div className="nav-wrapper container">

                <a href="#!" className="brand-logo left" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            maxHeight: '90%',  // Ajusta este porcentaje para dejar margen arriba y abajo
                            width: 'auto',     // Mantiene la proporción de la imagen
                            verticalAlign: 'middle'
                        }}
                    />
                    <b className="light-blue-text text-darken-4"> Do</b> <b className="teal-text text-darken-1"> Today</b>
                </a>

                <ul id="nav-mobile" className="right">
                    <Login />
                </ul>

            </div>
        </nav> </>
    )
}
export default Nav