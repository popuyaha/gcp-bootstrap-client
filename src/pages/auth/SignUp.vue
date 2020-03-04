<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col cols="4">
        <div class="b-form-1">
          <h2>회원 가입</h2>
          <p>회원 가입 양식 입니다.</p>
          <b-form @submit.prevent="signUp">
            <b-form-group label="사용자 ID" label-for="usernameInput">
              <b-form-input
                id="usernameInput"
                type="text"
                v-model="username"
                required
                placeholder="사용자 ID(Email을 적어주세요)"
              />
            </b-form-group>
            <b-form-group label="이름" label-for="nameInput">
              <b-form-input
                id="nameInput"
                type="text"
                v-model="name"
                required
                placeholder="이름을 적어주세요"
              />
            </b-form-group>
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
            <b-button type="submit" variant="primary">가입</b-button>
          </b-form>
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
import router from "@/router";
import { mapGetters } from "vuex";
import Alert from "@/components/auth/Alert.vue";

// import Amplify from "@aws-amplify/core";

// const Logger = Amplify.Logger;

Vue.component("v-alert", Alert);

// const logger = new Logger("SignUpPage");

export default {
  data() {
    return {
      username: "",
      email: "",
      name: "",
      pass: ""
    };
  },
  mounted() {
    // clear existing status message
    this.$store.dispatch("auth/clearAuthenticationStatus");
  },
  computed: {
    ...mapGetters("auth", ["hasAuthenticationStatus"])
  },
  methods: {
    async signUp() {
      // logger.debug("sign-up");
      await this.$store.dispatch("auth/signUp", {
        username: this.username,
        password: this.pass,
        attributes: {
          name: this.name,
          email: this.email
        }
      });

      if (!this.hasAuthenticationStatus) {
        router.push("confirmSignUp");
      }
    }
  }
};
</script>
