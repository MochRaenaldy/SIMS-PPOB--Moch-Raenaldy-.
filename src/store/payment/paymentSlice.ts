import { apiFetch } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IPayment {
  payment: [];
  isLoading: boolean;
  error: boolean;
}

export const initialState: IPayment = {
  payment: [],
  isLoading: false,
  error: false,
};

export const paymentFetch = createAsyncThunk("payment", async (data: any) => {
  try {
    const response = await apiFetch.post("/transaction", data);
    return response;
  } catch (error) {
    return error
  }
});

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(paymentFetch.pending, (state: IPayment) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(paymentFetch.fulfilled, (state: IPayment, action: any) => {
        if (action.payload.status === 200) {
          state.error = false;
        } else {
          state.error = true;
        }
        state.isLoading = false;
        state.payment = action?.payload?.data;
      })
      .addCase(paymentFetch.rejected, (state: IPayment) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default paymentSlice.reducer;
