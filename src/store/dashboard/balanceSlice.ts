import { apiFetch } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Ibalance {
  balance: [];
  isLoading: boolean;
  error: null;
}

export const initialState: Ibalance = {
  balance: [],
  isLoading: false,
  error: null,
};

export const balanceFetch = createAsyncThunk("balance", async () => {
  const response = await apiFetch.get("/balance");
  return response;
});

export const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(balanceFetch.pending, (state: Ibalance) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(balanceFetch.fulfilled, (state: Ibalance, action: any) => {
        state.isLoading = false;
        state.balance = action?.payload?.data?.data?.balance;
      })
      .addCase(balanceFetch.rejected, (state: Ibalance, action: any) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default balanceSlice.reducer;
