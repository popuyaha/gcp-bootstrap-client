// import Auth from "@aws-amplify/auth";
// import Amplify from "@aws-amplify/core";
import firebase from 'firebase'
// import db from '../firestore'

// const Logger = Amplify.Logger;
// Logger.LOG_LEVEL = "DEBUG"; // to show detailed logs from Amplify library
// const logger = new Logger("store:auth");

// initial state
const state = {
  user: null,
  isAuthenticated: false,
  authenticationStatus: null
};

const getters = {
  authenticatedUser: state => state.user,
  isAuthenticated: state => state.isAuthenticated,
  authenticationStatus: state => {
    return state.authenticationStatus
      ? state.authenticationStatus
      : { variant: "secondary" };
  },
  hasAuthenticationStatus: state => {
    return !!state.authenticationStatus;
  }
};

const mutations = {
  setAuthenticationError(state, err) {
    // logger.debug("인증 에러: {}", err);
    state.authenticationStatus = {
      state: "failed",
      message: err.message,
      variant: "danger"
    };
  },
  clearAuthenticationStatus: state => {
    state.authenticationStatus = null;
  },
  setUserAuthenticated(state, user) {
    state.user = user;
    state.isAuthenticated = true;
  },
  clearAuthentication(state) {
    state.user = null;
    state.userId = null;
    state.isAuthenticated = false;
  }
};

const actions = {
  clearAuthenticationStatus: context => {
    context.commit("clearAuthenticationStatus", null);
  },
  signIn: async (context, params) => {
    console.log(params,"params");
    // logger.debug("{}로 회원가입", params.username);
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    try { 
      // const user = await Auth.signIn(params.username, params.password);
      // context.commit("setUserAuthenticated", user);
    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  },
  signOut: async context => {
    try {
      // await Auth.signOut();
    } catch (err) {
      // logger.error("{}로 로그아웃 도중 에러", err);
      console.error(err,"err");
    }
    context.commit("auth/clearAuthentication", null, { root: true });
  },
  signUp: async (context, params) => {
    console.log(params.username,"params");
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    const email = toString(params.email);
    const password = toString(params.password);
    console.log(email, password ,"비번메일");
    try {
      firebase.auth().createUserWithEmailAndPassword(params.email, params.password).then(user =>{
        console.log(user);
      })
      .catch(err => {
        console.error(err, 'err')
      });
      context.commit("auth/clearAuthentication", null, { root: true });
    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  },
  confirmSignUp: async (context, params) => {
    console.log(params,"params");
    // logger.debug("{}로 로그인 승인", params.username);
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    try {
      // await Auth.confirmSignUp(params.username, params.code);
    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  },
  confirmResend: async (context, params) => {
    console.log(params,"params");
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    try {
      // await Auth.resendSignUp(params.username);
    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  },
  passwordReset: async (context, params) => {
    console.log(params,"params");
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    try {
      // await Auth.forgotPassword(params.username);
    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  },
  confirmPasswordReset: async (context, params) => {
    console.log(params,"params");
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    try {
      // await Auth.forgotPasswordSubmit(
        // params.username,
        // params.code,
        // params.password
      // );
    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  },
  passwordResetResend: async (context, params) => {
    console.log(params,"params");
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    try {
      // await Auth.passwordResetResend(params.username);
    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  },
  passwordChange: async (context, params) => {
    console.log(params,"params");
    // logger.debug("{}의 비밀번호 변경", context.state.user.username);
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    try {
      // const user = await Auth.currentAuthenticatedUser();
      // await Auth.changePassword(
        // user,
        // params.currentPassword,
        // params.newPassword
      // );
    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
