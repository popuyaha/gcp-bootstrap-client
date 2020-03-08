<template>
  <div class="comment-create">
    <b-input-group :prepend="this.user.user.displayName" class="mt-3">
      <b-form-textarea
        id="textarea"
        v-model="context"
        :placeholder="
          isSubComment ? '덧글에 덧글을 달아주세요~!' : '코멘트를 달아주세요~!'
        "
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <b-input-group-append>
        <b-button variant="info" @click="createSubComment">작성하기</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
//import CommentCreate from "./CommentCreate";
import * as firebase from "firebase/app";
import "firebase/firestore";
import Alert from "@/components/auth/Alert.vue";
// import router from "@/router";

Vue.component("v-alert", Alert);

export default {
  name: "CommentSubCreate",
  props: {
    contentId: String,
    reloadComment: Function,
    reloadSubSubComments: Function,
    subCommentToggle: Function,
    isSubComment: Boolean,
    commentId: String,
    content: Object,
    noteId: String,
    datas: Object
  },
  data() {
    return {
      name: "",
      context: "",
      db: firebase.firestore()
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isAuthenticated: state => state.auth.isAuthenticated
    })
  },
  methods: {
    async createSubComment() {
      try {
        let list;
        let id = "";

        list = await this.db
          .collection("board")
          .doc(this.noteId)
          .collection("reply")
          .where("sort", "==", this.content.sort)
          .get();
        list.forEach(doc => {
          id = doc.id;
        });
        try {
          await this.db
            .collection("board")
            .doc(this.noteId)
            .collection("reply")
            .doc(id)
            .collection("rereply")
            .add({
              content: this.context,
              uid: this.user.user.uid,
              name: this.user.user.displayName,
              sort: firebase.firestore.FieldValue.serverTimestamp()
            });
          this.context = "";
          this.subCommentToggle();
          this.reloadSubSubComments();
        } catch (error) {
          this.$alert("error =", error).then(() => {
            return;
          });
        }
      } catch (e) {
        this.$alert("error =", e).then(() => {
          return;
        });
        //this.setState({ isLoading: false });
      }
    }
  }
};
</script>

<style scoped>
.comment-create {
  display: flex;
  margin-bottom: 1em;
}
</style>
