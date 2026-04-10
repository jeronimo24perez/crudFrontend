import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import {useDispatch} from "react-redux";
import {addTask} from "../state/taskSlice.jsx";
import Alert from "../ui/alert.jsx";

const CreateTask = ()=>{
    const [taskData, setTaskData] = useState({ name: '', date: '', topic: '' });
    const dispatch = useDispatch();
    useEffect(() => {
        // 1. Inicialización única del Modal
        const modalElems = document.querySelectorAll('.modal');
        M.Modal.init(modalElems, {});

        // 2. Inicialización única del DatePicker
        const dateElems = document.querySelectorAll('.datepicker');
        M.Datepicker.init(dateElems, {
            format: 'dd mmm, yyyy',
            container: document.body,
            onSelect: (date) => {
                // Usamos la función de actualización (prev) para evitar la dependencia
                setTaskData(prev => ({ ...prev, date: date.toLocaleDateString() }));
            },
            i18n: { cancel: 'Cancelar', done: 'Ok' }
        });

        // IMPORTANTE: El arreglo de dependencias debe estar vacío
    }, []);
    const handleAddTask = (e) => {
        e.preventDefault();

        if(localStorage.getItem("login") !== "true"){
            Alert("Debes iniciar sesion para agregar tareas", "red darken-4")
        }else{
            if (taskData.name && taskData.date && taskData.topic) {
                // Feedback al usuario con Toast integrado
                dispatch(addTask({
                    id: localStorage.getItem('id'),
                    name: taskData.name,
                    date: taskData.date,
                    theme: taskData.topic,
                }))
                Alert("Tarea agregada correctamente", "green darken-3")
                // Cerrar modal programáticamente
                const instance = M.Modal.getInstance(document.querySelector('#modal-add-task'));
                instance.close();
            } else {
                M.toast({ html: 'Por favor completa todos los campos', classes: 'red darken-2' });
            }
        }

    };
    return (
        <>
            <div className="container" style={{ marginTop: '20px' }}>
                {/* Botón flotante para agregar (Floating Action Button) */}
                <div className="center-align">
                    <a className="waves-effect waves-light btn-large light-blue darken-4 modal-trigger" href="#modal-add-task">
                        <i className="material-icons left">add</i> Nueva Tarea
                    </a>
                </div>

                {/* Estructura del Modal de Tareas */}
                <div id="modal-add-task" className="modal">
                    <div className="modal-content">
                        <h4 className="light-blue-text text-darken-4">Agregar Nueva Tarea</h4>
                        <div className="row">
                            <form className="col s12">
                                {/* Campo: Nombre de la Tarea (Text Inputs) */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">assignment</i>
                                        <input
                                            id="task_name"
                                            type="text"
                                            className="validate"
                                            onChange={(e) => setTaskData({...taskData, name: e.target.value})}
                                        />
                                        <label htmlFor="task_name">Nombre de la tarea</label>
                                    </div>
                                </div>

                                {/* Campo: Fecha (Pickers) */}
                                <div className="row container">
                                    <div className="input-field col m6 s12">
                                        <i className="material-icons prefix">today</i>
                                        <input id="task_date" type="text" className="datepicker" />
                                        <label htmlFor="task_date">Fecha límite</label>
                                    </div>

                                    {/* Campo: Tema (Text Inputs / Icons) */}
                                    <div className="input-field col m6 s12">
                                        <i className="material-icons prefix">label</i>
                                        <input
                                            id="task_topic"
                                            type="text"
                                            onChange={(e) => setTaskData({...taskData, topic: e.target.value})}
                                        />
                                        <label htmlFor="task_topic">Tema / Categoría</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-red btn-flat">Cancelar</a>
                        <button
                            className="waves-effect waves-light btn teal"
                            onClick={handleAddTask}
                        >
                            Guardar Tarea
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateTask;