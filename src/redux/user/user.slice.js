// store/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { loginUserAction } from './user.middleware';

const initialState = {
    User: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.User = action.payload?.data; // assuming API returns { data: user }
            })
            .addCase(loginUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data?.message || "Login failed";
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
