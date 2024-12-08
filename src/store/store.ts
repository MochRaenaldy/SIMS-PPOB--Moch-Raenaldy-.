import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./auth/loginSlice";
import registerSlice from "./auth/registerSlice";
import { useDispatch, useSelector } from "react-redux";
import bannerSlice from "./dashboard/bannerSlice";
import serviceSlice from "./dashboard/sevicesSlice";

export const store = configureStore({
  reducer: {
    loginState: loginSlice,
    regisState: registerSlice,
    bannerState: bannerSlice,
    serviceState: serviceSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
