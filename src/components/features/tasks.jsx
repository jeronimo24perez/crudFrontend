import DeleteTask from "./deleteTask.jsx";
import EditTask from "./editTask.jsx";

const Tasks = ({name, date, topic, id} )=>{
    return (
        <>
            <div className="row container" id={id}>
                {/* Sistema de Grid para responsividad: 12 columnas en móvil, 6 en tablets */}
                <div className="col s12 m12 l12 ">
                    {/* Componente Card con efecto hover para feedback visual */}
                    <div className="card hoverable light-blue lighten-5 " >
                        <div className="card-content">
                            {/* Nombre de la tarea usando Typography y Color */}
                            <span className="card-title light-blue-text text-darken-4">
              <i className="material-icons left">assignment</i>
              <b>{name}</b>
            </span>

                            {/* Fecha de la tarea con Icono */}
                            <p className="grey-text text-darken-2" style={{ display: 'flex', alignItems: 'center' }}>
                                <i className="material-icons tiny left">event</i>
                                {date}
                            </p>

                            {/* Tema o Categoría usando un color de contraste */}
                            <div className="chip teal lighten-5 teal-text text-darken-2" style={{ marginTop: '10px' }}>
                                {topic}
                            </div>
                        </div>

                        {/* Acciones de la tarjeta (Buttons) */}
                        <div className="card-action">
                            <EditTask id={id} currentTask={{
                                name: name,
                                date: date,
                                topic: topic,
                            }} />
                            <DeleteTask id={id} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tasks;