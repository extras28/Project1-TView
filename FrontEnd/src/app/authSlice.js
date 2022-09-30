import accountApi from "../api/accountApi";
import authApi from "../api/authApi";
import {
  updateAxiosAccessToken
} from "../api/axiosClient";
import PreferenceKeys from "../general/constants/PreferenceKeys";

const {
  createSlice,
  createAsyncThunk
} = require("@reduxjs/toolkit");


export const thunkSignIn = createAsyncThunk('auth/sign-in', async (params) => {
  const res = await authApi.signIn(params);
  return res;
});

export const thunkSignOut = createAsyncThunk(
  "auth/sign-out",
  async (params) => {
    const res = await authApi.signOut(params);
    return res;
  }
);
export const thunkGetAccountInfor = createAsyncThunk(
  "account/get-account-infor",
  async (params, thunkApi) => {
    const res = await accountApi.getProfile(params);
    return res;
  }
);
export const thunkEditProfile = createAsyncThunk(
  "account/edit-profile",
  async (params) => {
    const res = await accountApi.editProfile(params);
    return res;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isGettingInfor: false,
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

    //sign in
    [thunkSignIn.pending]: (state, action) => {
      state.isSigningIn = true;
    },

    [thunkSignIn.rejected]: (state, action) => {
      state.isSigningIn = false;
    },

    [thunkSignIn.fulfilled]: (state, action) => {
      state.isSigningIn = false;
      const {
        account
      } = action.payload;
      if (account) {
        state.loggedIn = true;
        state.currentAccount = account;

        const {
          accessToken,
          expirationDateToken
        } = account;
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
    // log out
    [thunkSignOut.fulfilled]: (state, action) => {
      const {
        result
      } = action.payload;
      if (result === "success") {
        localStorage.removeItem(PreferenceKeys.accessToken);
        localStorage.removeItem(PreferenceKeys.accessTokenExpired);
        state.currentAccount = {};
      }
    },
    //get current account infor
    [thunkGetAccountInfor.pending]: (state, action) => {
      state.isGettingInfor = true;
    },

    [thunkGetAccountInfor.rejected]: (state, action) => {
      state.isGettingInfor = false;
    },

    [thunkGetAccountInfor.fulfilled]: (state, action) => {
      state.isGettingInfor = false;
      const {
        account
      } = action.payload;
      if (account) {
        state.currentAccount = {...account,...state.currentAccount};
        state.loggedIn = true;

        const {
          accessToken,
          expirationDateToken
        } = account;
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

    //edit profile
    [thunkEditProfile.pending]: (state, action) => {
      state.isGettingInfor = true;
    },

    [thunkEditProfile.rejected]: (state, action) => {
      state.isGettingInfor = false;
    },

    [thunkEditProfile.fulfilled]: (state, action) => {
      state.isGettingInfor = false;
      const {
        result,
        account
      } = action.payload;
      if (result === "success") {
        state.currentAccount = {
          ...state.currentAccount,
          ...account
        };
      }
    },
  }
});
const {
  reducer,
  actions
} = authSlice;
export const {
  updateCurrentAccountInfor
} = actions;
export default reducer;