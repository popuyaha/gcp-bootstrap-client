<template>
  <b-container>
    <b-row class="justify-content-md-center">
      <b-col cols="4">
        <div class="b-form-1">
          <h2>비밀번호 변경</h2>
          <p>비밀번호를 변경합니다.</p>
          <b-form @submit.prevent="passwordChange">
            <b-form-group label="현재 비밀번호" label-for="currentPasswordInput">
              <b-form-input
                id="currentPasswordInput"
                type="password"
                v-model="currentPassword"
                required
                placeholder="현재 비밀번호를 입력해 주세요"
              />
            </b-form-group>
            <b-form-group label="새 비밀번호" label-for="newPasswordInput">
              <b-form-input
                id="newPasswordInput"
                type="password"
                v-model="newPassword"
                required
                placeholder="변경할 비밀번호를 입력해 주세요"
              />
            </b-form-group>
            <b-button type="submit" variant="primary">확인</b-button>
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
      currentPassword: "",
      newPassword: ""
    };
  },
  computed: {
    ...mapGetters("auth", ["hasAuthenticationStatus"])
  },
  methods: {
    async passwordChange() {
      await store.dispatch("auth/passwordChange", {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword
      });
      if (!this.hasAuthenticationStatus) {
        router.push("dashboard");
      }
    }
  }
};
</script>
