import {configureStore} from '@reduxjs/toolkit'
import loginReducer from '../state/usersSlice.jsx'
export const Store = new configureStore({
    reducer: {   login: loginReducer }
})