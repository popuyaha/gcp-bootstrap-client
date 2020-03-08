<template>
  <div>
    <div v-bind:key="data.sort" v-for="data in this.datas">
      <CommentListItem :commentObj="data" :noteId="noteId" :reloadComment="reloadComment" />
    </div>
    <CommentCreate v-bind:noteId="noteId" :reloadComment="reloadComment" />
  </div>
</template>
<script>
import Vue from "vue";
import { mapState } from "vuex";
import * as firebase from "firebase/app";
import "firebase/firestore";
import CommentCreate from "./CommentCreate";
import CommentListItem from "./CommentListItem";
// import API from "@aws-amplify/api";
import Alert from "@/components/auth/Alert.vue";
// import moment from "moment";

Vue.component("v-alert", Alert);

export default {
  name: "CommentList",
  data() {
    return {
      datas: [],
      db: firebase.firestore()
      // comments = datas.
    };
  },
  props: {
    noteId: String
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isAuthenticated: state => state.auth.isAuthenticated
    }),
  },
  created() {
    
    this.commentList();
  },
  components: {
    CommentCreate,
    CommentListItem
  },
  methods: {
    async commentList() {
      try {
        this.datas = [];
        let data
        data = await this.db.collection("board").doc(this.noteId).collection("reply").get();
        data.forEach(doc => {
          this.datas.push(doc.data());
        });
      } catch (e) {
        this.$alert("error =", e).then(() => {
          return;
        });
        //this.setState({ isLoading: false });
      }
    },

    reloadComment() {
      this.commentList();
    }
  }
};
</script>
