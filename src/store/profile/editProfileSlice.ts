import { apiFetch } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IProfilUpdate {
  profilUpdate: [];
  isLoading: boolean;
  error: boolean;
}

export const initialState: IProfilUpdate = {
  profilUpdate: [],
  isLoading: false,
  error: false,
};

export const profilUpdateFetch = createAsyncThunk("profilUpdate", async (data: any) => {
  try {
    const response = await apiFetch.put("/profile/update", data);
    return response;
  } catch (error) {
    return error
  }
});

export const profilUpdateSlice = createSlice({
  name: "profilUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profilUpdateFetch.pending, (state: IProfilUpdate) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(profilUpdateFetch.fulfilled, (state: IProfilUpdate, action: any) => {
        console.log(action)
       if (action.payload.status === 200) {
         state.error = false;
       } else {
         state.error = true;
       }
        state.isLoading = false;
        state.profilUpdate = action?.payload?.data?.data;
      })
      .addCase(profilUpdateFetch.rejected, (state: IProfilUpdate, action: any) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export default profilUpdateSlice.reducer;
