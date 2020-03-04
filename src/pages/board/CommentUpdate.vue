<template>
  <div class="comment-create">
    <b-input-group :prepend="this.user.attributes.name" class="mt-3">
      <b-form-textarea
        id="textarea"
        v-model="context"
        :placeholder="
          '코멘트를 달아주세요~!'
        "
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <b-input-group-append>
        <b-button variant="info" @click="updateComment(context)">수정하기</b-button>
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
  name: "CommentUpdate",
  props: {
    contentId: String,
    reloadComment: Function,
    reloadSubComments: Function,
    content: Object,
    subUpdateCommentToggle: Function,
    isSubComment: Boolean,
    commentId: String,
    noteId: String
  },
  data() {
    return {
      name: "",
      context: this.content.context,
      datas: []
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isAuthenticated: state => state.auth.isAuthenticated
    })
  },
  methods: {
    async updateComment(data) {
      // const params = {
      //   context: data
      // };
      console.log(data,"data");
      // await API.put("reply", "reply/" + this.content.commentId, {
      //   body: params
      // })
      //   .then(response => {
      //     this.reloadSubComments();
      //     this.subUpdateCommentToggle();
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
