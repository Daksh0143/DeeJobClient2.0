import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getAllJobAsync } from "./jobs.service";
import { responsiveFontSizes } from "@mui/material";

export const getAllJobAction = createAsyncThunk("/job/getAll", async (params, { rejectWithValue }) => {
    try {
        const response = await getAllJobAsync(params)
        return response
    } catch (error) {
        console.log("ERROR", error)
        return rejectWithValue(error.message)
    }
})