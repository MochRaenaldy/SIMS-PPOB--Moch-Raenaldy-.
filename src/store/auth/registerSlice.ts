import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiFetch } from "../../utils/api";

const initialState = {
  user: [],
  isLoading: false,
  error: false,
};

export const authRegister = createAsyncThunk(
  "auth/register",
  async (data: any) => {
    try {
      const response = await apiFetch.post("/registration", data);
      
      return response;
    } catch (error) {
      return error;
    }
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
        state.error = false;
      })
      .addCase(authRegister.fulfilled, (state: any, action: any) => {
        if (action.payload.status === 200) {
          state.error = false;
        } else {
          state.error = true;
        }
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(authRegister.rejected, (state: any) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = true;
      });
  },
});

export default registerSlice.reducer;
