import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    username: "?",
    password: "123456",
    email: "example@example.com",
    role: "user",
    adminPassword: null
};

const userSlice = createSlice({
    name: "user",
    initialState: initialValue,
    reducers: {
        updatePassword: (state, actions) => {
            state.password = actions.payload;
        },
        createUser: (state, actions) => {
            state.email = actions.payload.email;
            state.password = actions.payload.password;
            state.username = actions.payload.username;
            state.role=actions.payload.role;
            state.adminPassword=actions.payload.adminPassword;
        },
        logout: (state, actions) => {
            return initialValue;
        }
    }

});

export const { updatePassword, createUser, logout } = userSlice.actions;
export default userSlice.reducer;