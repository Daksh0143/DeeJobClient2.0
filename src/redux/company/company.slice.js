const { createSlice, current } = require("@reduxjs/toolkit");
const { getAllCompanyAction, createCompanyAction, updateCompanyAction, deleteCompanyAction } = require("./company.middleware");

const initialState = {
    Company: [], // This should always be an array
    loading: false,
    error: null,
};

const companySlice = createSlice({
    name: "Company",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET ALL COMPANIES
            .addCase(getAllCompanyAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCompanyAction.fulfilled, (state, action) => {
                state.loading = false;
                // Ensure we're always setting an array
                state.Company = action.payload?.data
            })
            .addCase(getAllCompanyAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data?.message || "Failed to fetch companies";
            })

            // CREATE COMPANY
            .addCase(createCompanyAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCompanyAction.fulfilled, (state, action) => {
                state.loading = false;
                // Ensure Company is an array before pushing
                if (Array.isArray(state.Company)) {
                    state.Company.push(action.payload.data);
                } else {
                    // If for some reason Company is not an array, make it one
                    state.Company = [action.payload.data];
                }
            })
            .addCase(createCompanyAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data?.message || "Failed to create company";
            })

            // UPDATE COMPANY
            .addCase(updateCompanyAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCompanyAction.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload?.data;
                if (updated && Array.isArray(state.Company)) {
                    state.Company = state.Company.map((c) =>
                        c._id === updated._id ? updated : c
                    );
                }
            })
            .addCase(updateCompanyAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data?.message || "Failed to update company";
            })

            // DELETE COMPANY
            .addCase(deleteCompanyAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCompanyAction.fulfilled, (state, action) => {
                state.loading = false;

                const deletedId = action.payload; // now it's directly the ID

                console.log("Deleted ID:", deletedId);
                console.log("Before delete:", current(state.Company));

                state.Company = state.Company.filter((c) => c._id !== deletedId);

                console.log("After delete:", current(state.Company));
            })
            .addCase(deleteCompanyAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data?.message || "Failed to delete company";
            });
    }
});

export default companySlice.reducer;
export const companySelector = (state) => state.Company;