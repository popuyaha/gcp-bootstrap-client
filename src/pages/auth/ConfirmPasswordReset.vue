<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col cols="4">
        <div class="b-form-1">
          <h2>비밀번호 초기화 승인</h2>
          <p>
            이메일로 받은 코드를 사용하여 비밀번호 재설정을 확인하세요.
          </p>
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
          <b-form-group label="비밀번호" label-for="passwordInput">
            <b-form-input
              id="passwordInput"
              type="password"
              v-model="password"
              required
              placeholder="비밀번호를 입력해 주세요"
            />
          </b-form-group>
          <b-button
            type="submit"
            variant="primary"
            @click="confirmPasswordReset"
            >확인</b-button
          >
          <b-button variant="primary" @click="passwordResetResend"
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
      code: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters("auth", ["hasAuthenticationStatus"])
  },
  methods: {
    async confirmPasswordReset() {
      await store.dispatch("auth/confirmPasswordReset", {
        username: this.username,
        code: this.code,
        password: this.password
      });
      if (!this.hasAuthenticationStatus) {
        router.push("signIn");
      }
    },
    async passwordResetResend() {
      await store.dispatch("auth/passwordReset", {
        username: this.username
      });
    }
  }
};
</script>
