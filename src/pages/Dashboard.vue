<template>
  <b-container>
    <div class="b-main-content">
      <h2>이름 확인</h2>
      <p>{{ user }}로 로그인 중</p>
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
//import router from "@/router";

export default {
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isAuthenticated: state => state.auth.isAuthenticated
    })
  }
};
</script>
