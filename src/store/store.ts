import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./auth/loginSlice";
import registerSlice from "./auth/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import bannerSlice from "./dashboard/bannerSlice";
import serviceSlice from "./dashboard/sevicesSlice";
import balanceSlice from "./dashboard/balanceSlice";
import profileSlice from "./profile/profileSlice";
import transactionSlice from "./transaction/transactionSlice";
import profilUpdateSlice from "./profile/editProfileSlice";
import UpdateImageSlice from "./profile/UploadImgProfilSlice";
import topupSlice from "./topup/topupSlice";
import paymentSlice from "./payment/paymentSlice";

export const store = configureStore({
  reducer: {
    loginState: loginSlice,
    regisState: registerSlice,
    bannerState: bannerSlice,
    serviceState: serviceSlice,
    balanceState: balanceSlice,
    profileState: profileSlice,
    transactionState: transactionSlice,
    editProfileState: profilUpdateSlice,
    uploadImageState: UpdateImageSlice,
    topupState: topupSlice,
    paymentState: paymentSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
