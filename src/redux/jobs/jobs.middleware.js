import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createJobAsync, findOneJobAsync, getAllJobAsync, ownJobsAsync, updateJobAsync } from "./jobs.service";
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


export const createJobAction = createAsyncThunk("/job/create", async (request, { rejectWithValue }) => {
    try {
        const response = await createJobAsync(request)
        console.log("REQUEST", request)
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const findOneJobAction = createAsyncThunk("/job/findOne", async (id, { rejectWithValue }) => {
    try {
        const response = await findOneJobAsync(id)
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const findOwnJobsAction = createAsyncThunk("/job/myJobs", async (params, { rejectWithValue }) => {
    try {
        const response = await ownJobsAsync(params)
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
})


export const updateJobsAction = createAsyncThunk("/job/update", async ({ id, req }, { rejectWithValue }) => {
    try {
        const response = await updateJobAsync({ id, req })
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
})