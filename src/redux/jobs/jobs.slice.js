const { createSlice } = require("@reduxjs/toolkit");
const { getAllJobAction } = require("./jobs.middleware");

const initialState = {
    Jobs: null,
    isLoading: false,
    isError: null,
};

const jobsSlice = createSlice({
    name: "Jobs",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllJobAction.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getAllJobAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Jobs = action.payload?.data; // assuming API returns { data: user }
            })
            .addCase(getAllJobAction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload?.response?.data?.message;
            });

    }
})

export default jobsSlice.reducer;
export const jobSelector = (state) => state.Jobs;

