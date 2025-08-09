const { createSlice } = require("@reduxjs/toolkit");
const { getAllCompanyAction } = require("./company.middleware");



const initialState = {
    Company: [],
    loading: false,
    error: null,
};
const companySlice = createSlice({
    name: "company",
    initialState,
    reducers,
    extraReducers: (builder) => {
        builder
            .addCase(getAllCompanyAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCompanyAction.fulfilled, (state, action) => {
                state.loading = false;
                state.Company = action.payload?.data; // assuming API returns { data: user }
            })
            .addCase(getAllCompanyAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data?.message || "Login failed";
            });
    }
})