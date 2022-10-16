import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null
    },
    reducers: {
        login: (state, action) => {
            return {
                ...state,
                user: action.payload
            };
        },
        logout: (state) => {
            return {
                ...state,
                user: null
            };
        },
        default: (state) => {
            return state;
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
