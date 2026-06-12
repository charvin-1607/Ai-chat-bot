import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({

  name: "auth",

  initialState: {

    user: null,

    authChecked: false,
    authToken: "",

    signupRequest: {
      loading: false,
      success: false,
      error: null,
      message: ""
    },

    loginRequest: {
      loading: false,
      success: false,
      error: null,
      message: ""
    },

    logoutRequest: {
      loading: false,
      success: false,
      error: null,
      message: "",

    },

    fetchMeRequest: {
      loading: false,
      success: false,
      error: null,
      message: ""
    }

  },

  reducers: {

    // SIGNUP
    signupRequestStart: (state) => {

      state.signupRequest.loading = true;
      state.signupRequest.success = false;
      state.signupRequest.error = null;
      state.signupRequest.message = "";

    },


    signupRequestSuccess: (state, action) => {

      state.signupRequest.loading = false;
      state.signupRequest.success = true;
      state.signupRequest.message = action.payload?.message || "Signup successful";

    },


    signupRequestFail: (state, action) => {
      state.signupRequest.loading = false;
      state.signupRequest.error =
        action.payload || "Signup failed";

    },

    // LOGIN
    loginRequestStart: (state) => {

      state.loginRequest.loading = true;

      state.loginRequest.success = false;

      state.loginRequest.error = null;

      state.loginRequest.message = "";

    },


    loginRequestSuccess: (state, action) => {

      state.loginRequest.loading = false;

      state.loginRequest.success = true;

      state.loginRequest.message =
        action.payload?.message ||
        "Login successful";

      state.user =
        action.payload?.user || null;

      state.authChecked = true;

      state.authToken = action.payload?.token;

    },


    loginRequestFail: (state, action) => {

      state.loginRequest.loading = false;

      state.loginRequest.error =
        action.payload || "Login failed";

    },

    // FETCH ME
    fetchMeRequestStart: (state) => {

      state.fetchMeRequest.loading = true;
      state.fetchMeRequest.success = false;
      state.fetchMeRequest.error = null;
    },


    fetchMeRequestSuccess: (state, action) => {

      state.fetchMeRequest.loading = false;
      state.fetchMeRequest.success = true;
      state.user = action.payload.user;

      // console.log("fetch me success, user insidde authSlice= ", state.user);

      state.message = action.payload?.message || "User data fetched successfully";
      state.authChecked = true;

    },


    fetchMeRequestFail: (state, action) => {

      state.fetchMeRequest.loading = false;
      state.fetchMeRequest.error = action.payload;
      state.authChecked = false;
      state.user = null;


    },



    // logout 


    logoutRequestStart: (state) => {
      state.logoutRequest.loading = true;
      state.logoutRequest.success = false;
      state.logoutRequest.error = null;
      state.logoutRequest.message = "";
    },

    logoutRequestSuccess: (state, action) => {
      state.logoutRequest.loading = false;
      state.logoutRequest.success = true;
      state.logoutRequest.message = action.payload?.message || "Login successful";
      state.user = null;
      state.authToken = "";
      state.authChecked = false;
    },

    logutRequestFail: (state, action) => {
      state.logoutRequest.loading = false;
      state.logoutRequest.error = action.payload || "Login failed";
      console.log("in userslice = ", state.loginRequest.error);
    },




  }

});


export const {

  signupRequestStart,
  signupRequestSuccess,
  signupRequestFail,

  loginRequestStart,
  loginRequestSuccess,
  loginRequestFail,

  fetchMeRequestStart,
  fetchMeRequestSuccess,
  fetchMeRequestFail,

  logoutRequestStart,
  logoutRequestSuccess,
  logutRequestFail

} = authSlice.actions;


export default authSlice.reducer;