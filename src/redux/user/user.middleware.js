import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAsync, profileAsync, registerUserAsync } from "./user.service";

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

export const profileAction = createAsyncThunk("get/profile", async (_, { rejectWithValue }) => {
    try {
        const response = await profileAsync();
        return response;
    } catch (error) {
        console.log("ERROR",error)
    }
})