import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
const initialState = {
    login: false,
    username: null,
    users: null
}
const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action) => {
            state.login = action.payload.login
            state.username = action.payload.username
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
export  const {login} = loginSlice.actions;
export default loginSlice.reducer;