// import Auth from "@aws-amplify/auth";
// import Amplify from "@aws-amplify/core";
// import db from '../firestore'

// const Logger = Amplify.Logger;
// Logger.LOG_LEVEL = "DEBUG"; // to show detailed logs from Amplify library
// const logger = new Logger("store:auth");
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

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
    console.log(params, "params");
    // logger.debug("{}로 회원가입", params.username);
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(params.email, params.password);
      if (user.user.emailVerified) {
        context.commit("setUserAuthenticated", user);
      } else {
        const err = { message: "이메일 승인 안됨" }
        context.commit("auth/setAuthenticationError", err, { root: true });
      }
      console.log(user.user.emailVerified, "이메일 승인")

    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  },
  signOut: async context => {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
      console.error(error, "error");
    });
    context.commit("auth/clearAuthentication", null, { root: true });
  },
  signUp: async (context, params) => {
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    var user = null;
    try {
      firebase.auth().createUserWithEmailAndPassword(params.attributes.email, params.password).then(function () {
        // console.log(user,"기존유저");
        user = firebase.auth().currentUser;
        console.log(user, "user")
        user.sendEmailVerification();
      })
        .then(function () {
          user.updateProfile({
            displayName: params.username,
            // photoURL: photoURL
          });
        })
        .catch(err => {
          context.commit("auth/setAuthenticationError", err, { root: true });
          console.error(err, 'err')
        });
      context.commit("auth/clearAuthentication", null, { root: true });
    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  },
  confirmSignUp: async (context, params) => {
    console.log(params, "params");
    // logger.debug("{}로 로그인 승인", params.username);
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    try {
      // await Auth.confirmSignUp(params.username, params.code);
    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  },
  confirmResend: async (context, params) => {
    console.log(params, "params");
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    try {
      // await Auth.resendSignUp(params.username);
    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  },
  passwordReset: async (context, params) => {
    console.log(params, "params");
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    try {
      firebase.auth().sendPasswordResetEmail(params.email).then(function () {
        // Email sent.
      }).catch(function (error) {
        context.commit("auth/setAuthenticationError", error, { root: true });
        // An error happened.
      });
      // await Auth.forgotPassword(params.username);
    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  },
  confirmPasswordReset: async (context, params) => {
    console.log(params, "params");
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
    console.log(params, "params");
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    try {
      firebase.auth().sendPasswordResetEmail(params.email).then(function () {
        // Email sent.
      }).catch(function (error) {
        context.commit("auth/setAuthenticationError", error, { root: true });
        // An error happened.
      });
    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  },
  passwordChange: async (context, params) => {
    console.log(params, "params");
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
  mutations,
  strict: false,
};
