<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col cols="4">
        <div class="b-form-1">
          <h2>로그인</h2>
          <p>사이트에 로그인 합니다.</p>
          <b-form @submit.prevent="signIn">
            <b-form-group label="Email" label-for="emailInput">
              <b-form-input
                id="emailInput"
                type="email"
                v-model="email"
                required
                placeholder="Email을 적어주세요"
              />
            </b-form-group>
            <b-form-group label="비밀번호" label-for="passwordInput">
              <b-form-input
                id="passwordInput"
                type="password"
                v-model="pass"
                required
                placeholder="비밀번호를 입력해 주세요"
              />
            </b-form-group>
            <b-button type="submit" variant="primary">로그인</b-button>
          </b-form>
        </div>
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col cols="4">
        <p>
          <b-link to="signUp">계정 생성</b-link> 또는
          <b-link to="passwordReset">비밀번호 초기화</b-link>
        </p>
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
      email: "",
      pass: ""
    };
  },
  computed: {
    ...mapGetters("auth", ["hasAuthenticationStatus"])
  },
  methods: {
    async signIn() {
      await store.dispatch("auth/signIn", {
        email: this.email,
        password: this.pass
      });

      if (!this.hasAuthenticationStatus) {
        router.push("dashboard");
      }
    }
  }
};
</script>

<style></style>
