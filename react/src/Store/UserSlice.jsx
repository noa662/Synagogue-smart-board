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
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
    setUser: (state, action) => {
      const { username, email, role, adminPassword } = action.payload;
      state.username = username;
      state.email = email;
      state.role = role;
      state.adminPassword = adminPassword || null;
      state.password = "";
    },
    logout: () => initialValue
  }
});

export const { updatePassword, setUser, logout } = userSlice.actions;
export default userSlice.reducer;