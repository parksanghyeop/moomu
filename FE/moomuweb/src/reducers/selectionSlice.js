import { createSlice } from "@reduxjs/toolkit";

export const selectionSlice = createSlice({
  name: "selectionSlice",
  initialState: { selection: "COMMUTE" },
  reducers: {
    init: (state) => {
      state.selection = "COMMUTE";
    },
    setSelection: (state, action) => {
      console.log(action.payload);
      state.selection = action.payload;
    },
  },
});

export const { init, setSelection } = selectionSlice.actions;
export default selectionSlice.reducer;
