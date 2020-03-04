<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col cols="4">
        <div class="b-form-1">
          <h2>비밀번호 초기화</h2>
          <p>초기화 비밀번호는 Email로 전송됩니다.</p>
          <b-form @submit.prevent="passwordReset">
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
            <b-button type="submit" variant="primary">보내기</b-button>
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

import { mapGetters } from "vuex";
import router from "@/router";
import store from "@/store";

import Alert from "@/components/auth/Alert.vue";

Vue.component("v-alert", Alert);

export default {
  data() {
    return {
      username: ""
    };
  },
  computed: {
    ...mapGetters("auth", ["hasAuthenticationStatus"])
  },
  methods: {
    async passwordReset() {
      await store.dispatch("auth/passwordReset", {
        username: this.username
      });
      if (!this.hasAuthenticationStatus) {
        router.push("confirmPasswordReset");
      }
    }
  }
};
</script>
