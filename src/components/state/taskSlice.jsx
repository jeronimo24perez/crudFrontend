import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

const initialState = {
    task: []
}
const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getTask.fulfilled, (state, action) => {
            state.task = action.payload.tasks;
        }).addCase(getTask.rejected, (state, action) => {
            state.task = []
        }).addCase(addTask.fulfilled, (state, action) => {
           state.task = action.payload.tasks;
        }).addCase(deleteTask.fulfilled, (state, action) => {
            state.task = action.payload.tasks;
        })
    }
})
export const getTask = createAsyncThunk(
    "task/getTask",
    async (arg ) => {
        const task = await fetch(`https://crud-backend-eosin.vercel.app/${arg.id}`);
        return await task.json();
    }
)

export const addTask = createAsyncThunk(
    "task/addTask",
    async (arg ) => {
        const task = await fetch(`https://crud-backend-eosin.vercel.app/${arg.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
            title:    arg.name,
            date:    arg.date,
            theme:    arg.theme,
        })
        })

        return  await task.json();

    }
)
export const deleteTask = createAsyncThunk(
    "task/deleteTask",
    async (arg ) => {
        const taskId = arg.taskId;
        const userId = arg.userId;
        const task = await fetch(`https://crud-backend-eosin.vercel.app/${userId}/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        return await task.json();
    }
)

export default  taskSlice.reducer;