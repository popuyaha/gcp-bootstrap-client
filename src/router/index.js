import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home.vue";
import Dashboard from "@/pages/Dashboard.vue";
import SignIn from "@/pages/auth/SignIn.vue";
import SignUp from "@/pages/auth/SignUp.vue";
import SignOut from "@/pages/auth/SignOut.vue";
import ConfirmSignUp from "@/pages/auth/ConfirmSignUp.vue";
import PasswordReset from "@/pages/auth/PasswordReset.vue";
import ChangePassword from "@/pages/auth/ChangePassword.vue";
import ConfirmPasswordReset from "@/pages/auth/ConfirmPasswordReset.vue";
import Board from "@/pages/board/Board.vue";
import Note from "@/pages/note/NoteList.vue";
import NewNote from "@/pages/note/NewNote.vue";
import NewBoard from "@/pages/board/NewBoard.vue";
import ReadBoard from "@/pages/board/ReadBoard.vue";

import store from "@/store";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { title: "Home", auth: false }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { title: "Dashboard", auth: true }
  },
  {
    path: "/board",
    name: "board",
    component: Board,
    meta: { title: "게시판", auth: true },
    props: true
  },
  {
    path: "/board/newboard",
    name: "newboard",
    component: NewBoard,
    meta: { title: "게시판쓰기", auth: true },
    props: true
  },
  {
    path: "/board/readboard",
    name: "readboard",
    component: ReadBoard,
    meta: { title: "게시판읽기", auth: true },
    props: true
  },
  {
    path: "/notelist",
    name: "notelist",
    component: Note,
    meta: { title: "노트", auth: true }
  },
  {
    path: "/notelist/newnote",
    name: "newnote",
    component: NewNote,
    meta: { title: "새노트", auth: true },
    props: true
  },
  {
    path: "/signIn",
    name: "signIn",
    component: SignIn,
    meta: { title: "회원가입", auth: false }
  },
  {
    path: "/signOut",
    name: "signOut",
    component: SignOut,
    meta: { title: "로그아웃", auth: true }
  },
  {
    path: "/signUp",
    name: "signUp",
    component: SignUp,
    meta: { title: "로그인", auth: false }
  },
  {
    path: "/confirmSignUp",
    name: "confirmSignUp",
    component: ConfirmSignUp,
    meta: { title: "로그인 승인", auth: false }
  },
  {
    path: "/changePassword",
    name: "changePassword",
    component: ChangePassword,
    meta: { title: "비밀번호 변경", auth: true }
  },
  {
    path: "/passwordReset",
    name: "passwordReset",
    component: PasswordReset,
    meta: { title: "비밀번호 초기화", auth: false }
  },
  {
    path: "/confirmPasswordReset",
    name: "confirmPasswordReset",
    component: ConfirmPasswordReset,
    meta: { title: "비밀번호 초기화 승인", auth: false }
  }
];

const router = new Router({ mode: "history", routes });

// this routine will ensure that any pages marked as `auth` in the `meta` section are
// protected from access by unauthenticated users.
router.beforeEach((to, from, next) => {
  // Use the page's router title to name the page
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }

  // is there a meta and auth attribute?
  if (to.meta && to.meta.auth !== undefined) {
    // if the page requires auth
    if (to.meta.auth) {
      // and we are authenticated?
      if (store.getters["auth/isAuthenticated"]) {
        next(); // route normally
        return;
      }
      // otherwise off to the sign in page
      router.push({ name: "signIn" });
      return;
    }
    // otherwise are we already authenticated?
    if (store.getters["auth/isAuthenticated"]) {
      // yes we are, so off to dashboard
      router.push({ name: "dashboard" });
      return;
    }
    next(); // route normally
    return;
  }
  next(); // route normally
  return;
});

export default router;
