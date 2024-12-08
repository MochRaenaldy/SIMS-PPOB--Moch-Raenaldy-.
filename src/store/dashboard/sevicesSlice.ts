import { apiFetch } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IService {
  services: [];
  isLoading: boolean;
  error: null;
}

export const initialState: IService = {
  services: [],
  isLoading: false,
  error: null,
};

export const serviceFetch = createAsyncThunk("services", async () => {
  const response = await apiFetch.get("/services");
  return response;
});

export const serviceSlice = createSlice({
  name: "sevices",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(serviceFetch.pending, (state: IService) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(serviceFetch.fulfilled, (state: IService, action: any) => {
        state.isLoading = false;
        state.services = action?.payload?.data?.data;
      })
      .addCase(serviceFetch.rejected, (state: IService, action: any) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default serviceSlice.reducer;
