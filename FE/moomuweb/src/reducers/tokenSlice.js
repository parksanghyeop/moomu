import { createSlice } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
var isEmpty = function (val) {
  if (val === "" || val === undefined || val === null || (val !== null && typeof val === "object" && !Object.keys(val).length)) {
    return true;
  } else {
    return false;
  }
};

export const tokenSlice = createSlice({
  name: "tokenSlice",
  initialState: { rawToken: "", isToken: false, decoded: {} },
  reducers: {
    logout: (state) => {
      state.rawToken = "";
      state.decoded = "";
      state.isToken = false;
    },
    login: (state, action) => {
      // let jwt = require("jsonwebtoken");
      state.rawToken = action.payload;
      state.isToken = !isEmpty(state.rawToken);
      console.log(state.token);
      state.decoded = jwt(state.rawToken.access_token);
      console.log(state.decoded);
    },
  },
});

export const { logout, login } = tokenSlice.actions;
// export const tokenSelector = (state) => state.token.token;
export default tokenSlice.reducer;
