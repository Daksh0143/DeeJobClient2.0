import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAsync, registerUserAsync } from "./user.service";

export const loginUserAction = createAsyncThunk("login/user", async (request, { rejectWithValue }) => {
    try {
        const response = await loginUserAsync(request)
        return response
    } catch (error) {

        return rejectWithValue(error)
    }
})

export const registerUserAction = createAsyncThunk("register/user", async (request, { rejectWithValue }) => {
    try {
        const response = await registerUserAsync(request)
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
})

