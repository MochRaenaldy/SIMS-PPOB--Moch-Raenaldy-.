import { apiFetch } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IProfil {
  profile: IProfileData;
  isLoading: boolean;
  error: null;
}

interface IProfileData {
    email: string
    first_name: string
    last_name: string
    profile_image: string
}

export const initialState: IProfil = {
  profile: {
    email: "",
    first_name: "",
    last_name: "",
    profile_image: "",
  },
  isLoading: false,
  error: null,
};

export const profileFetch = createAsyncThunk("profile", async () => {
  const response = await apiFetch.get("/profile");
  return response;
});

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profileFetch.pending, (state: IProfil) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(profileFetch.fulfilled, (state: IProfil, action: any) => {
        console.log(action);
        state.isLoading = false;
        state.profile = action?.payload?.data?.data;
      })
      .addCase(profileFetch.rejected, (state: IProfil, action: any) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
