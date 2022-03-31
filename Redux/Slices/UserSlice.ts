import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCookies } from "cookies-next";
import { removeCookies } from "cookies-next";

import { IUser } from "../../Interfaces/typings";
import type { RootState } from "../store";

const initialState: IUser = {
  isLoggedIn: false,
  userId: null,
  role: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN_USER: (state, action) => {
      setCookies("token", action.payload?.token, {
        maxAge: 60 * 60 * 24,
      });
      setCookies("userId", action.payload?.userId, {
        maxAge: 60 * 60 * 24,
      });
      setCookies("role", action.payload?.role, {
        maxAge: 60 * 60 * 24,
      });

      state.isLoggedIn = action.payload.isLoggedIn;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    REFRESS_SESSION: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    LOGOUT: () => {
      removeCookies("token");
      removeCookies("userId");
      removeCookies("role");
      return initialState;
    },
  },
});

export const { LOGIN_USER, REFRESS_SESSION, LOGOUT } = userSlice.actions;
export default userSlice.reducer;
