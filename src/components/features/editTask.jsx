import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../state/taskSlice.jsx";
import M from 'materialize-css';
import Alert from "../ui/alert.jsx";

const EditTask = ({ id, currentTask }) => {
    const dispatch = useDispatch();
    const modalRef = useRef(null);
    const users = useSelector((state) => state.login);
    const userId = users.id
    const [taskData, setTaskData] = useState({
        name: currentTask?.name || '',
        date: currentTask?.date || '',
        topic: currentTask?.topic || ''
    });

    useEffect(() => {
        if (modalRef.current) {
            M.Modal.init(modalRef.current, { dismissible: true });
        }

        const dateElems = document.querySelectorAll(`.datepicker-edit-${id}`);
        M.Datepicker.init(dateElems, {
            format: 'dd mmm, yyyy',
            container: document.body,
            onSelect: (date) => setTaskData(prev => ({ ...prev, date: date.toLocaleDateString() })),
            i18n: { cancel: 'Cancelar', done: 'Ok' }
        });
    }, [id]);

    const handleOpenModal = () => {
        const instance = M.Modal.getInstance(modalRef.current);
        if (instance) instance.open();
    };

    const handleSave = () => {
        if (taskData.name && taskData.date && taskData.topic) {
            dispatch(editTask({
                userId: userId,
                taskId: id,
                name: taskData.name,
                date: taskData.date,
                theme: taskData.topic
            }));

            // Feedback visual mediante Toast [2, 3]
            Alert("Tarea actualizada", "green darken-3")

            const instance = M.Modal.getInstance(modalRef.current);
            if (instance) instance.close();
        } else {
           Alert("completa los campos requeridos", "red darken-4")
        }
    };

    return (
        <>
            {/* Botón que dispara la edición */}
            <button className="btn blue darken-4 task-action" onClick={handleOpenModal}>
                <i className="material-icons left">edit</i>Editar
            </button>

            {/* Estructura del Modal de Edición [3] */}
            <div ref={modalRef} id={`modal-edit-${id}`} className="modal">
                <div className="modal-content">
                    <h4 className="light-blue-text text-darken-4">Editar Tarea</h4>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">assignment</i>
                            <input
                                id={`edit_name_${id}`}
                                type="text"
                                value={taskData.name}
                                onChange={(e) => setTaskData({...taskData, name: e.target.value})}
                            />
                            <label className="active" htmlFor={`edit_name_${id}`}>Nombre de la tarea</label>
                        </div>

                        <div className="input-field col s12">
                            <i className="material-icons prefix">today</i>
                            <input
                                id={`edit_date_${id}`}
                                type="text"
                                className={`datepicker-edit-${id}`}
                                defaultValue={taskData.date}
                            />
                            <label className="active" htmlFor={`edit_date_${id}`}>Fecha límite</label>
                        </div>

                        <div className="input-field col s12">
                            <i className="material-icons prefix">label</i>
                            <input
                                id={`edit_topic_${id}`}
                                type="text"
                                value={taskData.topic}
                                onChange={(e) => setTaskData({...taskData, topic: e.target.value})}
                            />
                            <label className="active" htmlFor={`edit_topic_${id}`}>Tema</label>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-red btn-flat">Cancelar</button>
                    <button className="waves-effect waves-light btn teal" onClick={handleSave}>
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditTask;