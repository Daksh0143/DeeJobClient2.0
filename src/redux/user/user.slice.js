// store/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { loginUserAction, registerUserAction } from './user.middleware';

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
        //LOGIN USER

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
        // REGISTER
        builder
            .addCase(registerUserAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.User = action.payload?.data; // or null if you want user to log in after registering
            })
            .addCase(registerUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.response?.data?.message || "Register failed";
            });

    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
