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
  async signIn(context, params) {
    // logger.debug("{}로 회원가입", params.username);
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(params.email, params.password);
      if (user.user.emailVerified) {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
          } else {
            // No user is signed in.
          }
        });
        context.commit("setUserAuthenticated", user);
      } else {
        const err = { message: "이메일 승인 안됨" };
        context.commit("auth/setAuthenticationError", err, { root: true });
      }
    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  },
  async signOut(context) {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
        this.$alert("error =", error).then(() => {
          return;
        });
      });
    context.commit("auth/clearAuthentication", null, { root: true });
  },
  async signUp(context, params) {
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    var user = null;
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          params.attributes.email,
          params.password
        )
        .then(function() {
          user = firebase.auth().currentUser;
          user.sendEmailVerification();
        })
        .then(function() {
          user.updateProfile({
            displayName: params.username
            // photoURL: photoURL
          });
        })
        .catch(err => {
          context.commit("auth/setAuthenticationError", err, { root: true });
          this.$alert("error =", err).then(() => {
            return;
          });
        });
      context.commit("auth/clearAuthentication", null, { root: true });
    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  },
  async googleSignIn(context, params) {
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    console.log(context, params, "이리로");
    try {
      var provider = new firebase.auth.GoogleAuthProvider();
      await firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          console.log(`토큰 : ${token} 유저 : ${user.displayName}`);
          // ...
          context.commit("setUserAuthenticated", user);
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(
            `errorCode : ${errorCode} errorMessage : ${errorMessage}`
          );
          console.log(`email : ${email} credential : ${credential}`);
          // ...
        });
    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  },
  //async confirmSignUp(context, params) {
  //   // logger.debug("{}로 로그인 승인", params.username);
  //   context.commit("auth/clearAuthenticationStatus", null, { root: true });
  //   try {
  //     // await Auth.confirmSignUp(params.username, params.code);
  //   } catch (err) {
  //     context.commit("auth/setAuthenticationError", err, { root: true });
  //   }
  // },
  // confirmResend: async (context, params) => {
  //   context.commit("auth/clearAuthenticationStatus", null, { root: true });
  //   try {
  //     // await Auth.resendSignUp(params.username);
  //   } catch (err) {
  //     context.commit("auth/setAuthenticationError", err, { root: true });
  //   }
  // },
  async passwordReset(context, params) {
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    try {
      firebase
        .auth()
        .sendPasswordResetEmail(params.email)
        .then(function() {
          // Email sent.
        })
        .catch(function(error) {
          context.commit("auth/setAuthenticationError", error, { root: true });
          // An error happened.
        });
      // await Auth.forgotPassword(params.username);
    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  },
  //async confirmPasswordReset(context, params) {
  //   context.commit("auth/clearAuthenticationStatus", null, { root: true });
  //   try {
  //     // await Auth.forgotPasswordSubmit(
  //     // params.username,
  //     // params.code,
  //     // params.password
  //     // );
  //   } catch (err) {
  //     context.commit("auth/setAuthenticationError", err, { root: true });
  //   }
  // },
  async passwordResetResend(context, params) {
    context.commit("auth/clearAuthenticationStatus", null, { root: true });
    try {
      firebase
        .auth()
        .sendPasswordResetEmail(params.email)
        .then(function() {
          // Email sent.
        })
        .catch(function(error) {
          context.commit("auth/setAuthenticationError", error, { root: true });
          // An error happened.
        });
    } catch (err) {
      context.commit("auth/setAuthenticationError", err, { root: true });
    }
  }
  //async passwordChange(context, params) {
  //   // logger.debug("{}의 비밀번호 변경", context.state.user.username);
  //   context.commit("auth/clearAuthenticationStatus", null, { root: true });
  //   try {
  //     var user = firebase.auth().currentUser;
  //     var newPassword = getASecureRandomPassword();
  //     var oldPassword = params.password
  //     user.updatePassword(newPassword).then(function() {

  //       // Update successful.
  //     }).catch(function(error) {
  //       this.$alert("비밀번호 변경 에러 =", error).then(() => {
  //         return;
  //       });
  //     });
  //   } catch (err) {
  //     context.commit("auth/setAuthenticationError", err, { root: true });
  //   }
  // }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  strict: false
};
