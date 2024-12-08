import { apiFetch } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Ibanner {
  banner: [];
  isLoading: boolean;
  error: null;
}

export const initialState: Ibanner = {
  banner: [],
  isLoading: false,
  error: null,
};

export const bannerFetch = createAsyncThunk("banner", async () => {
  const response = await apiFetch.get("/banner");
  return response;
});

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bannerFetch.pending, (state: Ibanner) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(bannerFetch.fulfilled, (state: Ibanner, action: any) => {
        console.log(action)
        state.isLoading = false;
        state.banner = action?.payload?.data?.data;
      })
      .addCase(bannerFetch.rejected, (state: Ibanner, action: any) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});


export default bannerSlice.reducer;
