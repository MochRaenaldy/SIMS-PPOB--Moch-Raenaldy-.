import { apiFetch } from "@/utils/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IUploadImage {
  imageUpdate: [];
  isLoading: boolean;
  error: boolean;
}

export const initialState: IUploadImage = {
  imageUpdate: [],
  isLoading: false,
  error: false,
};

export const UpdateImageFetch = createAsyncThunk(
  "imageUpdate",
  async (data: any) => {
    try {
      const response = await apiFetch.put("/profile/image", data, {
          headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    } catch (error) {
      return error
    }
  }
);

export const UpdateImageSlice = createSlice({
  name: "imageUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(UpdateImageFetch.pending, (state: IUploadImage) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(
        UpdateImageFetch.fulfilled,
        (state: IUploadImage, action: any) => {
          if (action.payload.status === 200) {
            state.error = false;
          } else {
            state.error = true;
          }
          state.isLoading = false;
          state.imageUpdate = action?.payload?.data?.data;
        }
      )
      .addCase(
        UpdateImageFetch.rejected,
        (state: IUploadImage, action: any) => {
          state.isLoading = false;
          state.error = true;
        }
      );
  },
});

export default UpdateImageSlice.reducer;
