import { createSlice } from "@reduxjs/toolkit";
export const tokenSlice = createSlice({
  name: "tokenSlice",
  initialState: { token: "" },
  reducers: {
    logout: (state) => {
      state.token = "";
    },
    login: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { logout, login } = tokenSlice.actions;
// export const tokenSelector = (state) => state.token.token;
export default tokenSlice.reducer;
