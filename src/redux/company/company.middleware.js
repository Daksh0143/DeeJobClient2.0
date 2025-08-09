import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCompanyAsync } from "./company.service";

export const getAllCompanyAction = createAsyncThunk("/company/get", (async (_, { rejectWithValue }) => {
    try {
        const response = await getAllCompanyAsync()
        return response
    } catch (error) {
        console.error("error", error)
        return rejectWithValue(error)
    }
}))