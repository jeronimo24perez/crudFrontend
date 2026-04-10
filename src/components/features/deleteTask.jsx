import {useDispatch, useSelector} from "react-redux";
import {deleteTask} from "../state/taskSlice.jsx";
import Alert from "../ui/alert.jsx";

const DeleteTask = ({id})=>{
    const dispatch = useDispatch();
    const users = useSelector((state) => state.login);
    const userId = users.id

    return(
        <>
            <button className={` btn red darken-4 task-action`} onClick={
                ()=>{
                    dispatch(deleteTask({
                        userId: userId,
                        taskId: id
                    }));
                    Alert("tarea eliminada correctamente")
                }

            } > <i className="material-icons left">delete</i> Eliminar</button>

        </>
    )
}

export default DeleteTask;