import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCompanyAsync, getAllCompanyAsync } from "./company.service";

export const getAllCompanyAction = createAsyncThunk("/company/get", (async (_, { rejectWithValue }) => {
    try {
        const response = await getAllCompanyAsync()
        return response
    } catch (error) {
        console.error("error", error)
        return rejectWithValue(error)
    }
}))

export const createCompanyAction = createAsyncThunk("/company/post", (async (req, { rejectWithValue }) => {
    try {
        const response = await createCompanyAsync()
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
}))