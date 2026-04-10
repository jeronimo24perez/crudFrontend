import 'materialize-css/dist/css/materialize.min.css'
import './App.css'
import Nav from "./components/ui/nav.jsx";
import {useDispatch, useSelector} from "react-redux";
import Tasks from "./components/features/tasks.jsx";
import {useEffect} from "react";
import {getTask} from "./components/state/taskSlice.jsx";
import {login} from "./components/state/usersSlice.jsx";
import CreateTask from "./components/features/createTask.jsx";

function App() {
    const task = useSelector(state => state.task);
    const users = useSelector(state => state.login);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTask({
            id: localStorage.getItem("id")}))

        if(localStorage.getItem("login") === "true"){
            dispatch(login({
                username: localStorage.getItem("username"),
                id: localStorage.getItem("id"),
                login: localStorage.getItem("login"),

            }))
        }
    },[users])

  return (
      <>
            <Nav />
          {(task.task.map(e => <Tasks name={e.title} date={e.date} topic={e.theme} key={e.taskId} id={e.taskId} currentTask={{
              name: e.title,
              date: e.date,
              topic: e.theme
          }} />))}
          <CreateTask />
      </>
  )
}

export default App
