<template>
  <b-navbar toggleable="md" type="dark">
    <b-navbar-toggle target="nav_collapse" />
    <b-navbar-brand v-if="!isAuthenticated" to="/signIn">Mlog</b-navbar-brand>
    <b-navbar-brand v-if="isAuthenticated" to="/notelist">Mlog</b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item to="/dashboard">Dashboard</b-nav-item>
      <b-nav-item to="/board">Board</b-nav-item>
      <b-nav-item to="/notelist">Note</b-nav-item>
      <b-nav-item to="/image">Test</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item v-if="!isAuthenticated" class="nav-btn" to="/signIn"
        ><span class="nav-username">로그인</span></b-nav-item
      >
      <b-nav-item-dropdown v-if="isAuthenticated" right>
        <template slot="button-content">
          <v-icon name="regular/user-circle" /><strong class="nav-username">{{
            user.user.displayName
          }}</strong>
        </template>
        <b-row class="justify-content-md-center" style="margin:5px">
          <!-- <b-dropdown-item to="/changePassword"
            ><span class="nav-username">비밀번호 변경</span></b-dropdown-item
          > -->
          <b-dropdown-item to="/signOut"
            ><v-icon name="sign-out-alt" /><span class="nav-username"
              >로그아웃</span
            ></b-dropdown-item
          >
        </b-row>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapState } from "vuex";

import "vue-awesome/icons/regular/user-circle";
import "vue-awesome/icons/sign-out-alt";

export default {
  name: "Navbar",
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isAuthenticated: state => state.auth.isAuthenticated
    })
  },
  methods: {
    signIn() {
      this.$store.dispatch("signIn");
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: #563d7c;
}
.navbar-nav .nav-link {
  color: #cbbde2;
}
.nav-username {
  padding-left: 0.5em;
  padding-right: 0.5em;
}
</style>
