import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as state from "./usersSlice.jsx";
const initialState = {
    id: null,
    login: false,
    username: null,
    users: null
}
const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action) => {
            state.id = action.payload.id;
            state.login = action.payload.login;
            state.username = action.payload.username;
        },
        closeLogin: (state)=>{
            state.id = null;
            state.login = false;
            state.username = null;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action)=> {
            state.users = action.payload
        })

    }

})
export const getUsers = createAsyncThunk(
    "counter/getUsers",
    async ()=>{
        let users = await fetch("https://crud-backend-eosin.vercel.app/")

        return  await users.json()
    })
export const postUser = createAsyncThunk(
    "counter/postUser",
    async (arg)=>{
        console.log(arg)
        let post = await fetch("https://crud-backend-eosin.vercel.app/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
            username:    arg.username,
            email:    arg.email,
            password:    arg.password,
            })

        })
        return await post.json()
    }
)

export  const {login, closeLogin} = loginSlice.actions;
export default loginSlice.reducer;