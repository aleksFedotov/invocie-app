import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface IAuthInitialState {
  isLogin: boolean;
  userId: string | null;
  token: string | null;
  tokenExpirationDate: Date | null | string;
}

interface ILoginDAta {
  userId: string;
  token: string;
  tokenExpirationDate: Date | string;
}

const initialState: IAuthInitialState = {
  isLogin: false,
  userId: null,
  token: null,
  tokenExpirationDate: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<ILoginDAta>) {
      const { userId, token, tokenExpirationDate } = action.payload;
      state.isLogin = true;
      state.userId = userId;
      state.token = token;
      state.tokenExpirationDate = tokenExpirationDate;
    },
    logout(state) {
      state.isLogin = false;
      state.userId = null;
      state.token = null;
      state.tokenExpirationDate = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer;
