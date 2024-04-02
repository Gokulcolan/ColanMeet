import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "user",
  initialState: {
    signInInfo: {},
    signInLoading: false,
    oAuthsignInInfo: {},
    oAuthLoading: false,
    registerInfo: {},
    registerLoading: false,
    forgotOtpInfo: {},
    forgotOtpLoading: false,
    verifyOtpInfo: {},
    verifyOtpLoading: false,
    resetPasInfo: {},
    resetPasLoading: false,
    verifyotp: true,
  },

  reducers: {
    signInAction: (state, { payload }) => {
      state.signInInfo = payload.response;
      state.signInLoading = payload.loading;
    },
    oAuthSignInAction: (state, { payload }) => {
      state.oAuthsignInInfo = payload.response;
      state.oAuthLoading = payload.loading;
    },
    registerAction: (state, { payload }) => {
      state.registerInfo = payload.response;
      state.registerLoading = payload.loading;
    },
    forgotCodeAction: (state, { payload }) => {
      state.forgotOtpInfo = payload.response;
      state.forgotOtpLoading = payload.loading;
      state.verifyotp = false;
    },
    verifycodeAction: (state, { payload }) => {
      state.verifyOtpInfo = payload.response;
      state.verifyOtpLoading = payload.loading;
    },
    resetPassAction: (state, { payload }) => {
      state.resetPasInfo = payload.response;
      state.resetPasLoading = payload.loading;
    },
  },
});

export const {
  signInAction,
  oAuthSignInAction,
  registerAction,
  forgotCodeAction,
  verifycodeAction,
  resetPassAction,
} = authSlice.actions;

export const authSelector = (state) => state.auth;
const authReducer = authSlice.reducer;
export default authReducer;
