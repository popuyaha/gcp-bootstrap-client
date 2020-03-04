<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col cols="4">
        <div class="b-form-1">
          <h2>가입 승인</h2>
          <b-form-group label="사용자 ID" label-for="usernameInput">
            <b-form-input
              id="usernameInput"
              type="text"
              v-model="username"
              required
              autofocus
              placeholder="사용자 ID(Email을 적어주세요)"
            />
          </b-form-group>
          <b-form-group label="코드" label-for="codeInput">
            <b-form-input
              id="codeInput"
              type="password"
              v-model="code"
              required
              placeholder="전달받은 코드를 입력해 주세요"
            />
          </b-form-group>
          <b-button type="submit" variant="primary" @click="confirmSignUp"
            >확인</b-button
          >
          <b-button variant="primary" @click="confirmResend"
            >코드 재전송</b-button
          >
        </div>
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col cols="4">
        <v-alert />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Vue from "vue";

import { mapGetters } from "vuex";
import router from "@/router";
import store from "@/store";

import Alert from "@/components/auth/Alert.vue";

Vue.component("v-alert", Alert);

export default {
  data() {
    return {
      username: "",
      code: ""
    };
  },
  computed: {
    ...mapGetters("auth", ["hasAuthenticationStatus"])
  },
  methods: {
    async confirmSignUp() {
      await store.dispatch("auth/confirmSignUp", {
        username: this.username,
        code: this.code
      });
      if (!this.hasAuthenticationStatus) {
        router.push("signIn");
      }
    },
    async confirmResend() {
      await store.dispatch("auth/confirmResend", {
        username: this.username
      });
    }
  }
};
</script>
