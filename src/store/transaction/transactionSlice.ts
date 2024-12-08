import { apiFetch } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ITransaction {
  transaction: [];
  isLoading: boolean;
  error: null;
}

export const initialState: ITransaction = {
  transaction: [],
  isLoading: false,
  error: null,
};

export const transactionFetch = createAsyncThunk("transaction/history", async (param: { limit: number }) => {
  const {limit} = param
  const response = await apiFetch.get(`/transaction/history?limit=${limit}`);
  return response;
});

export const transactionSlice = createSlice({
  name: "transaction/history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(transactionFetch.pending, (state: ITransaction) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(transactionFetch.fulfilled, (state: ITransaction, action: any) => {
        console.log(action);
        state.isLoading = false;
        state.transaction = action?.payload?.data?.data.records;
      })
      .addCase(transactionFetch.rejected, (state: ITransaction, action: any) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default transactionSlice.reducer;
