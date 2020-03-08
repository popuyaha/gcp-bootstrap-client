<template>
  <div class="comment-create">
    <b-input-group :prepend="this.user.user.displayName" class="mt-3">
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
import * as firebase from "firebase/app";
import "firebase/firestore";
// import router from "@/router";

Vue.component("v-alert", Alert);

export default {
  name: "SubCommentUpdate",
  props: {
    contentId: String,
    reloadComment: Function,
    reloadSubSubComments: Function,
    content: Object,
    subsubCommentUpdateToggle: Function,
    isSubComment: Boolean,
    noteId: String,
    replyData: Object,
  },
  data() {
    return {
      name: "",
      context: this.content.content,
      datas: [],
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
    async updateComment(data) {
      console.log(data,"data")
      console.log(this.noteId,this.content,"노틍ㅇ");
      console.log(this.replyData,"리플데이터");
      try {
        let list
        let replyList = ''
        let id = ''
        let replyId = ''
        list = await this.db.collection("board").doc(this.noteId).collection("reply").where("sort","==",this.replyData.sort).get();
        list.forEach(doc => {
          id = doc.id;
          //console.log(id,doc.id,"댓글아이디");
        });
        replyList = await this.db.collection("board").doc(this.noteId).collection("reply").doc(id).collection("rereply").where("sort","==",this.content.sort).get();
        replyList.forEach(doc => {
          replyId = doc.id;
          console.log(id,doc.data(),"댓글아이디");
        });

        try {
          await this.db.collection("board").doc(this.noteId).collection("reply").doc(id).collection("rereply").doc(replyId).update({
            content : data
          });
          this.subsubCommentUpdateToggle();
          this.reloadSubSubComments();  
        } catch (error) {
          console.error(error,"대댓글 수정 에러");
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
