import {useDispatch, useSelector} from "react-redux";
import {deleteTask} from "../state/taskSlice.jsx";
import Alert from "../ui/alert.jsx";

const DeleteTask = ({id})=>{
    const dispatch = useDispatch();
    const users = useSelector((state) => state.login);
    const task = useSelector((state) => state.task);
    const userId = users.id

    return(
        <>
            <button className={` btn red darken-4 task-action`} onClick={
                (e)=>{
                    dispatch(deleteTask({
                        userId: userId,
                        taskId: id
                    }));
                    Alert("tarea eliminada correctamente")
                }

            } >Eliminar</button>

        </>
    )
}

export default DeleteTask;