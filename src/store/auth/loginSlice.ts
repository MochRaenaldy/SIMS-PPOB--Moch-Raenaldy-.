import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiFetch } from "../../utils/api";

export interface ILogin {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: ILogin = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authLogin = createAsyncThunk("/login", async (data: any) => {
  const response = await apiFetch.post("/login", data);
  console.log(response);
  return response;
});

const loginSlice = createSlice({
  name: "auth/login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state: ILogin) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authLogin.fulfilled, (state: ILogin, action: any) => {
        console.log(action);
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload?.data?.token;
      })
      .addCase(authLogin.rejected, (state: ILogin, action: any) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      });
  },
});

export default loginSlice.reducer;
