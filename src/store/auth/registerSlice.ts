import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiFetch } from "../../utils/api";

const initialState = {
  user: [],
  isLoading: false,
  error: null,
};

export const authRegister = createAsyncThunk(
  "auth/register",
  async (data: any) => {
    const response = await apiFetch.post("/registration", data);
    return response;
  }
);

const registerSlice = createSlice({
  name: "auth/register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authRegister.pending, (state: any) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authRegister.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(authRegister.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      });
  },
});

export default registerSlice.reducer;
