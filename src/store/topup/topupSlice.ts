import { apiFetch } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ITopup {
  topup: [];
  isLoading: boolean;
  error: boolean;
}

export const initialState: ITopup = {
  topup: [],
  isLoading: false,
  error: false,
};

export const topupFetch = createAsyncThunk("topup", async (data: any) => {
  try {
    const response = await apiFetch.post("/topup", data);
    return response;
  } catch (error) {
    return error
  }
});

export const topupSlice = createSlice({
  name: "topup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(topupFetch.pending, (state: ITopup) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(topupFetch.fulfilled, (state: ITopup, action: any) => {
        if (action.payload.status === 200) {
          state.error = false;
        } else {
          state.error = true;
        }
        state.isLoading = false;
        state.topup = action?.payload?.data;
      })
      .addCase(topupFetch.rejected, (state: ITopup) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default topupSlice.reducer;
