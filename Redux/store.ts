import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import UserReducer from "./Slices/UserSlice";
import CartReducer from "./Slices/CartSlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    cart: CartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
