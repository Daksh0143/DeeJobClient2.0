import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetCategoriesAsync } from "./categories.service";

export const GetCategoriesAction = createAsyncThunk("get/categories", async (_, { rejectWithValue }) => {
    try {
        const response = await GetCategoriesAsync()
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
})