import logo from '../../assets/logo2.png'
import Login from "../features/login.jsx";
import {useDispatch, useSelector} from "react-redux";
import 'materialize-css/dist/css/materialize.min.css';

import {useEffect, useRef, useState} from "react";
import {closeLogin} from "../state/usersSlice.jsx";

const Nav = () => {
    const users = useSelector(state => state.login);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // 🔥 cerrar al hacer click afuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleLogout = () => {
        setOpen(false);
        dispatch(closeLogin());
        localStorage.removeItem("id");
        localStorage.removeItem("login");
        localStorage.removeItem("username");
    };

    const isLogged = users.login || localStorage.getItem("login") === "true";

    return (
        isLogged ? (
            <>
                <nav className="light-blue lighten-5">
                    <div className="nav-wrapper container">

                        <a className="brand-logo left logo" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <img
                                src={logo}
                                alt="Logo"
                                style={{
                                    maxHeight: '90%',
                                    width: 'auto',
                                    verticalAlign: 'middle'
                                }}
                            />
                            <b className="light-blue-text text-darken-4"> Do</b>
                            <b className="teal-text text-darken-1"> Today</b>
                        </a>

                        <ul className="right">
                            <li ref={dropdownRef} style={{ position: "relative" }}>

                                <a
                                    onClick={() => setOpen(!open)}
                                    className=" grey-text text-darken-4"
                                    style={{ display: "flex", alignItems: "center", gap: "5px" }}
                                >
                                    <i className="material-icons">account_circle</i>
                                    {users.username || localStorage.getItem("username")}
                                    <i className="material-icons">arrow_drop_down</i>
                                </a>

                                {open && (
                                    <ul
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            right: 0,
                                            background: "#212121",
                                            borderRadius: "8px",
                                            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                                            minWidth: "180px",
                                            padding: "10px 0",
                                            zIndex: 1000,
                                            listStyle: "none"
                                        }}
                                    >


                                        <li
                                            onClick={handleLogout}
                                            style={{
                                                padding: "10px 20px",
                                                cursor: "pointer",
                                                color: "red"
                                            }}
                                        >
                                            <i className="material-icons left">exit_to_app</i> Cerrar sesión
                                        </li>
                                    </ul>
                                )}

                            </li>
                        </ul>

                    </div>
                </nav>
            </>
        ) : (
            <nav className="light-blue lighten-5">
                <div className="nav-wrapper container">

                    <a className="brand-logo left" style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <img
                            src={logo}
                            alt="Logo"
                            style={{
                                maxHeight: '90%',
                                width: 'auto',
                                verticalAlign: 'middle'
                            }}
                        />
                        <b className="light-blue-text text-darken-4"> Do</b>
                        <b className="teal-text text-darken-1"> Today</b>
                    </a>

                    <ul id="nav-mobile" className="right">
                        <Login />
                    </ul>

                </div>
            </nav>
        )
    )
}

export default Nav;
