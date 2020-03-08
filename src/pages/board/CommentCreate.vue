<template>
  <div class="comment-create">
    <b-input-group :prepend="this.user.user.displayName" class="mt-3">
      <b-form-textarea
        id="textarea"
        v-model="content"
        :placeholder="
          isSubComment ? '덧글에 덧글을 달아주세요~!' : '코멘트를 달아주세요~!'
        "
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <b-input-group-append>
        <b-button variant="info" @click="isSubComment ? createSubComment() : createComment()">작성하기</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import * as firebase from "firebase/app";
import "firebase/firestore";
//import CommentCreate from "./CommentCreate";
// import API from "@aws-amplify/api";
import Alert from "@/components/auth/Alert.vue";
// import router from "@/router";

Vue.component("v-alert", Alert);

export default {
  name: "CommentCreate",
  props: {
    contentId: String,
    reloadComment: Function,
    reloadSubComments: Function,
    subCommentToggle: Function,
    isSubComment: Boolean,
    commentId: String,
    noteId: String,
    datas: Object
  },
  data() {
    return {
      name: "",
      content: "",
      subNoteId: "",
      db: firebase.firestore()
    };
  },
  mounted() {
    this.subNoteId = this.commentId;
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isAuthenticated: state => state.auth.isAuthenticated
    })
  },
  methods: {
    async createComment() {
      try {
        this.db.collection("board").doc(this.noteId).collection("reply").add({
        content: this.content, uid: this.user.user.uid,
        name: this.user.user.displayName,
        sort: firebase.firestore.FieldValue.serverTimestamp()});
        this.content = "";
        this.reloadComment();
      } catch (e) {
        this.$alert("error =", e).then(() => {
          return;
        });
        //this.setState({ isLoading: false });
      }
    },
  }
  
};
</script>

<style scoped>
.comment-create {
  display: flex;
  margin-bottom: 1em;
}
</style>
