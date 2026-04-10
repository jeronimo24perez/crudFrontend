import {configureStore} from '@reduxjs/toolkit'
import loginReducer from '../state/usersSlice.jsx'
import taskReducer from '../state/taskSlice.jsx'
export const Store = new configureStore({
    reducer: {   login: loginReducer, task: taskReducer }
})