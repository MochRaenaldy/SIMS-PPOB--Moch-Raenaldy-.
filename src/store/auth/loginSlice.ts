import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiFetch } from "../../utils/api";

export interface ILogin {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: boolean;
}

const initialState: ILogin = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: false,
};

export const authLogin = createAsyncThunk("/login", async (data: any) => {
  try {
    const response = await apiFetch.post("/login", data);
    return response;
  } catch (error) {
    return error;
  }
});

const loginSlice = createSlice({
  name: "auth/login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authLogin.pending, (state: ILogin) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(authLogin.fulfilled, (state: ILogin, action: any) => {
       if (action.payload.status === 200) {
         state.error = false;
         state.isAuthenticated = true;
         state.token = action.payload?.data?.data?.token;
       } else {
         state.error = true;
         state.isAuthenticated = false;
         state.token = null;
       }
        state.isLoading = false;
        
        
      })
      .addCase(authLogin.rejected, (state: ILogin, action: any) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = true;
      });
  },
});

export default loginSlice.reducer;
