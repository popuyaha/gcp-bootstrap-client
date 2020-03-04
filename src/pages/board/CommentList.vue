<template>
  <div>
    <div v-bind:key="data.commentId" v-for="data in replyDatas">
      <CommentListItem :commentObj="data" :reloadComment="reloadComment" />
    </div>
    <CommentCreate v-bind:noteId="noteId" :reloadComment="reloadComment" />
  </div>
</template>
<script>
import Vue from "vue";
import { mapState } from "vuex";
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
      datas: []
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
    //글의 Id에 달린 댓글만 필터링
    replyDatas: function() {
      return this.datas.filter(
        data => data.noteId === this.noteId && data.subcomment_id == null
      );
    }
  },
  async created() {
    // return API.get("reply", "reply")
    //   .then(resData => {
    //     this.datas = resData;
    //   })
    //   .catch(err => {
    //     this.$alert("error =", err).then(() => {
    //       return;
    //     });
    //   });
  },
  components: {
    CommentCreate,
    CommentListItem
  },
  methods: {
    commentList(note) {
      console.log(note,"note");
      // return API.get("reply", "reply", {
      //   body: note
      // })
      //   .then(resData => {
      //     this.datas = resData;
      //   })
      //   .catch(err => {
      //     this.$alert("error =", err).then(() => {
      //       return;
      //     });
      //   });
    },

    reloadComment() {
      this.commentList();
    }
  }
};
</script>
