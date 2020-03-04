<template>
  <div class="comment-create">
    <b-input-group :prepend="this.user.attributes.name" class="mt-3">
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
        <b-button variant="info" @click="isSubComment ? createSubComment() : createComment()">작성하기</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
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
      context: "",
      subNoteId: ""
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
      await this.createComment2({
        context: this.context,
        username: this.user.username,
        noteId: this.noteId,
        name: this.user.attributes.name,
        flag: false
      });
    },
    createComment2(board) {
      console.log(board,"board");
      // return API.post("reply", "reply", {
      //   body: board
      // })
      //   .then(response => {
      //     this.context = "";
      //     this.reloadComment();
      //     return response;
      //   })
      //   .catch(error =>
      //     this.$alert("error =", error).then(() => {
      //       return;
      //     })
      //   );
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
