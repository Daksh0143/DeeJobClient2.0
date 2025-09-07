import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllCityAsync } from "./city.service";

export const GetAllCityAction = createAsyncThunk("get/allCity", async (_, { rejectWithValue }) => {
    try {
        const response = await GetAllCityAsync()
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
})