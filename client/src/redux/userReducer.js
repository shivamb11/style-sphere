import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  currentUser: null,
  isFetching: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state, action) => {
      state.isFetching = true;
    },
    loginComplete: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    logout: (state, action) => {
      state.isFetching = false;
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { loginStart, loginComplete, logout } = userSlice.actions;

export default userSlice.reducer;
