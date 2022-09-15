import authApi from "../api/authApi";
import { updateAxiosAccessToken } from "../api/axiosClient";
import PreferenceKeys from "../general/constants/PreferenceKeys";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const thunkSignIn = createAsyncThunk('auth/sign-in', async (params) => {
  const res = await authApi.signIn(params);
  return res;
})
const authSlice = createSlice({
    name: "auth",
  initialState: {
    loggedIn: false,
    isSigningIn: false,
    currentAccount: {},
  },
  reducers: {
    updateCurrentAccountInfor: (state, action) => {
      return {
        ...state,
        currentAccount: {
          ...state.currentAccount,
          ...action.payload,
        },
      };
    },
  },
  extraReducers: {
    [thunkSignIn.pending]: (state, action) => {
      state.isSigningIn = true;
    },

    [thunkSignIn.rejected]: (state, action) => {
      state.isSigningIn = false;
    },

    [thunkSignIn.fulfilled]: (state, action) => {
      state.isSigningIn = false;
      const { account } = action.payload;
      if (account) {
        state.loggedIn = true;
        state.currentAccount = account;

        const { accessToken, expirationDateToken } = account;
        if (accessToken && expirationDateToken) {
          localStorage.setItem(PreferenceKeys.accessToken, accessToken);
          localStorage.setItem(
            PreferenceKeys.accessTokenExpired,
            expirationDateToken
          );
          updateAxiosAccessToken(accessToken);
        }
      }
    },
  }
});
const { reducer, actions } = authSlice;
export const { updateCurrentAccountInfor } = actions;
export default reducer;