import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCompanyAsync, deleteCompanyAsync, getAllCompanyAsync, getCompanyByIdAsync, updateCompanyAsync } from "./company.service";

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
        const response = await createCompanyAsync(req)
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
}))


export const getCompanyByIdAction = createAsyncThunk("/company/getById", (async (id, { rejectWithValue }) => {
    try {
        const response = await getCompanyByIdAsync(id)
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
}))

export const updateCompanyAction = createAsyncThunk("/company/edit", (async ({ id, formData }, { rejectWithValue }) => {
    try {
        console.log("ID======>", id)
        const response = await updateCompanyAsync({
            id,
            formData
        })
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
}))


export const deleteCompanyAction = createAsyncThunk("/company/delete", (async (id, { rejectWithValue }) => {
    try {
        const response = await deleteCompanyAsync(id)
        return response
    } catch (error) {
        return rejectWithValue(error)
    }
}))