import {useDispatch, useSelector} from "react-redux";
import {getUsers, login} from "../state/usersSlice.jsx";
import M from 'materialize-css';
import {useEffect, useState} from "react";

const Login = ()=>{
    const users = useSelector(state => state.login)
    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false);
    const [registed, setRegisted] = useState(true);
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    })


    useEffect(() => {
        const elem = document.querySelector('.modal');
        M.Modal.init(elem, {});
    }, []);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleChange = (e)=>{
        setForm({...form, [e.target.id]: e.target.value});
    }
    const fetcher =  ( username, email ,password)=>{
        if(username){
            console.log('hay que registrar')
        }else{
            dispatch(getUsers())
            const userFinder = users.users.find(user => user.user.email === email)

            if(userFinder.user.password === password){
                dispatch(login({
                    login: true,
                    username: userFinder.user.username,
                }))
                localStorage.setItem("username", userFinder.user.username)
                localStorage.setItem("login", "true")
                const elem = document.querySelector('#modal-login');
                const instance = M.Modal.getInstance(elem);
                if (instance) {
                    instance.close();
                }
            }
        }
    }
    return (
        <>
            <li>
                <a href="#modal-login" className= "modal-trigger waves-effect grey-text text-darken-4 " onClick={()=>
                    dispatch(getUsers())
                }>
                    <i className="material-icons left">account_circle</i>
                    Iniciar sesion
                </a>
            </li>

            {/*Modal*/}
            <div id="modal-login" className="modal">
                <div className="modal-content light-blue-text text-darken-4 light-blue lighten-5 ">

                    {/* Título corregido */}
                    <h4 className="center-align">
                        {registed ? "Iniciar Sesion" : "Registrarse"}
                    </h4>

                    <div className="row">
                        <form className="col s12">

                            {/* username (solo en registro) */}
                            {
                                !registed ? (
                                    <div className="row">
                                        <div className="input-field  col s12">
                                            <i className="material-icons prefix">person_2</i>
                                            <input id="username" value={form.username} onChange={handleChange} type="text" className="validate" />
                                            <label htmlFor="username" className="blue-grey-text darken-4">
                                                Nombre de usuario
                                            </label>
                                        </div>
                                    </div>
                                ) : null
                            }

                            {/* email */}
                            <div className="row">
                                <div className="input-field  col s12">
                                    <i className="material-icons prefix">email</i>
                                    <input id="email" type="email" value={form.email} onChange={handleChange} className="validate" />
                                    <label htmlFor="email" className="blue-grey-text darken-4">
                                        Correo Electrónico
                                    </label>
                                </div>
                            </div>

                            {/* password */}
                            <div className="row">
                                <div className="input-field col s12">
                                    <i className="material-icons prefix">lock</i>
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        className="validate"
                                        value={form.password} onChange={handleChange}
                                    />
                                    <label className="blue-grey-text darken-4" htmlFor="password">
                                        Contraseña
                                    </label>
                                    <i
                                        className="material-icons"
                                        onClick={togglePassword}
                                        style={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '15px',
                                            cursor: 'pointer',
                                            zIndex: 2,
                                            color: '#757575'
                                        }}
                                    >
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </i>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>

                {/* footer */}
                <div className="modal-footer light-blue lighten-5">
                    <a
                        onClick={()=> setRegisted(!registed)}
                        className="teal-text registed left"
                    >
                        {
                            registed
                                ? "No estas registrado? ,registrate"
                                : "Estas registrado?, iniciar sesion"
                        }
                    </a>

                    <a href="#!" className="modal-close waves-effect waves-red btn-flat">
                        Cancelar
                    </a>

                    <button className="waves-effect waves-light btn light-blue darken-4" onClick={()=>{
                        if(registed && form.email.length > 3 && form.password.length > 3){
                            fetcher(null , form.email, form.password)
                        }else if(form.username.length > 3 && form.email.length > 3 && form.password.length > 3){
                            fetcher(form.username, form.email, form.password)
                        }else{
                            alert('campos faltantes')
                        }

                    }} type="submit">
                        {registed ? "Iniciar Sesion" : "Registrarse"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login
