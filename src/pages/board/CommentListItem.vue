<template>
  <div>
    <div class="comment-list-item">
      <div class="comment-list-item-name">
        <div>{{ commentObj.name }}</div>
        <div>{{ dateFmt(commentObj.created_at) }}</div>
      </div>
      <div class="comment-list-item-context" style="white-space:pre;">{{ commentObj.context }}</div>

      <div class="comment-list-item-button">
        <!-- <b-button variant="info" @click="updateComment(commentObj)">수정</b-button> -->
        <b-button variant="info" @click="updateComment(commentObj)">수정</b-button>
        <b-button variant="info" @click="deleteComment(commentObj)">삭제</b-button>
        <b-button variant="info" @click="subCommentToggle">덧글 달기</b-button>
      </div>
    </div>
    <template v-if="subCommentCreateToggle">
      <CommentSubCreate
        :isSubComment="true"
        :commentId="commentObj.commentid"
        :content="commentObj"
        :reloadSubComments="reloadSubComments"
        :subCommentToggle="subCommentToggle"
        :reloadSubSubComments="reloadSubSubComments"
      />
    </template>
    <template v-if="subCommentUpdateToggle">
      <CommentUpdate
        :isSubComment="true"
        :commentId="commentObj.commentid"
        :content="commentObj"
        :reloadSubComments="reloadSubComments"
        :subUpdateCommentToggle="subUpdateCommentToggle"
      />
    </template>
    <template v-if="rereplyDatas.length > 0">
      <div
        class="comment-list-item-subcomment-list"
        :key="item.subcomment_id"
        v-for="(item, i) in rereplyDatas"
      >
        <div class="comment-list-item-name">
          <div>{{ item.name }}</div>
          <div>{{ dateFmt(item.created_at) }}</div>
        </div>
        <div class="comment-list-item-context" style="white-space:pre;">{{ item.context }}</div>
        <div class="comment-list-item-button">
          <b-button variant="info" @click="updateSubComment(item,i)">수정</b-button>
          <b-button variant="info" @click="deleteComment(item)">삭제</b-button>
        </div>
      </div>
    </template>
    <template v-if="subsubCommentUpdateToggle2">
      <SubCommentUpdate
        :isSubComment="true"
        :commentId="rereplyDatas[0].commentid"
        :content="subsubDatas"
        :reloadSubSubComments="reloadSubSubComments"
        :subsubCommentUpdateToggle="subsubCommentUpdateToggle"
      />
    </template>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import Alert from "@/components/auth/Alert.vue";
import moment from "moment";
// import CommentCreate from "./CommentCreate";
import CommentUpdate from "./CommentUpdate";
import CommentSubCreate from "./CommentSubCreate";
import SubCommentUpdate from "./SubCommentUpdate";
// import API from "@aws-amplify/api";

Vue.component("v-alert", Alert);
export default {
  name: "CommentListItem",
  props: {
    commentObj: Object,
    reloadComment: Function
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isAuthenticated: state => state.auth.isAuthenticated
    }),
    rereplyDatas: function() {
      return this.subCommentList.filter(
        data =>
          data.subcomment_id != null &&
          this.commentObj.commentId == data.key_comment_id
      );
    }
  },
  components: {
    CommentSubCreate,
    CommentUpdate,
    SubCommentUpdate
  },
  created() {
    // return API.get("reply", "reply")
    //   .then(resData => {
    //     this.subCommentList = resData;
    //   })
    //   .catch(err => {
    //     this.$alert("error =", err).then(() => {
    //       return;
    //     });
    //   });
  },
  data() {
    return {
      content: "",
      modalParams: [],
      is_show: false,
      subCommentList: [],
      subsubDatas: [],
      subCommentCreateToggle: false,
      subCommentUpdateToggle: false,
      subsubCommentUpdateToggle2: false
    };
  },
  methods: {
    subCommentToggle() {
      this.subCommentCreateToggle = !this.subCommentCreateToggle;
    },
    subUpdateCommentToggle() {
      this.subCommentUpdateToggle = !this.subCommentUpdateToggle;
    },
    subsubCommentUpdateToggle() {
      this.subsubCommentUpdateToggle2 = !this.subsubCommentUpdateToggle2;
    },
    reloadSubComments() {
      this.reloadComment();
    },
    reloadSubSubComments() {
      // return API.get("reply", "reply")
      //   .then(resData => {
      //     this.subCommentList = resData;
      //   })
      //   .catch(err => {
      //     this.$alert("error =", err).then(() => {
      //       return;
      //     });
      //   });
    },

    updateComment(data) {
      if (this.user.username != data.username) {
        this.$alert("작성자만 수정할 수 있습니다.").then(() => {
          return;
        });
      } else {
        this.subUpdateCommentToggle();
      }
    },
    updateSubComment(data, index) {
      if (this.user.username != data.username) {
        this.$alert("작성자만 수정할 수 있습니다.").then(() => {
          return;
        });
      } else {
        this.subsubDatas = this.rereplyDatas[index]
        this.subsubCommentUpdateToggle();
      }
    },
    deleteComment(data) {
      if (this.user.username != data.username) {
        this.$alert("작성자만 삭제할 수 있습니다.").then(() => {
          return;
        });
      } else {
        this.$confirm("정말 삭제하시겠습니까?").then(() => {
          // return API.del("reply", "reply/" + data.commentId)
          //   .then(response => {
          //     this.reloadComment();
          //     this.reloadSubSubComments();
          //     return response;
          //   })
          //   .catch(error =>
          //     this.$alert("error =", error).then(() => {
          //       return;
          //     })
          //   );
        });
      }
    },
    dateFmt(date) {
      return moment(date).format("YYYY년 MM월 DD일");
    },
    async updateReply(data) {
      console.log(data,"data");
      // await API.put("reply", "reply/" + data.commentId, {
      //   body: data
      // })
      //   .then(response => {
      //     this.reloadComment();
      //     this.hide_modal();
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
.comment-list-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
}

.comment-list-item-name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid black;
  padding: 1em;
}

.comment-list-item-context {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50em;
  border: 0.5px solid black;
}

.comment-list-item-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.5px solid black;
  padding: 1em;
}

.btn {
  margin-bottom: 1em;
}

.comment-list-item-subcomment-list {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
  margin-left: 10em;
}
</style>
