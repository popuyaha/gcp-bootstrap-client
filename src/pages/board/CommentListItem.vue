<template>
  <div>
    <div class="comment-list-item">
      <div class="comment-list-item-name">
        <div>{{ commentObj.name }}</div>
        <div>{{ dateFmt(commentObj.created_at) }}</div>
      </div>
      <div class="comment-list-item-context" style="white-space:pre;">{{ commentObj.content }}</div>

      <div class="comment-list-item-button">
        <!-- <b-button variant="info" @click="updateComment(commentObj)">수정</b-button> -->
        <b-button variant="info" @click="updateComment(commentObj)">수정</b-button>
        <b-button variant="info" @click="deleteCommentConfirm(commentObj)">삭제</b-button>
        <b-button variant="info" @click="subCommentToggle">덧글 달기</b-button>
      </div>
    </div>
    <template v-if="subCommentCreateToggle">
      <CommentSubCreate
        :isSubComment="true"
        :commentId="commentObj.commentid"
        :content="commentObj"
        :noteId="noteId"
        :reloadSubComments="reloadSubComments"
        :subCommentToggle="subCommentToggle"
        :reloadSubSubComments="reloadSubSubComments"
      />
    </template>
    <template v-if="subCommentUpdateToggle">
      <CommentUpdate
        :isSubComment="true"
        :commentId="commentObj.commentid"
        :noteId="noteId"
        :content="commentObj"
        :reloadSubComments="reloadSubComments"
        :subUpdateCommentToggle="subUpdateCommentToggle"
      />
    </template>
    <template v-if="subCommentList.length > 0">
      <div
        class="comment-list-item-subcomment-list"
        :key="item.subcomment_id"
        v-for="(item, i) in subCommentList"
      >
        <div class="comment-list-item-name">
          <div>{{ item.name }}</div>
          <div>{{ dateFmt(item.created_at) }}</div>
        </div>
        <div class="comment-list-item-context" style="white-space:pre;">{{ item.content }}</div>
        <div class="comment-list-item-button">
          <b-button variant="info" @click="updateSubComment(item,i)">수정</b-button>
          <b-button variant="info" @click="deleteSubCommentConfirm(item)">삭제</b-button>
        </div>
      </div>
    </template>
    <template v-if="subsubCommentUpdateToggle2">
      <SubCommentUpdate
        :isSubComment="true"
        :commentId="subCommentList"
        :noteId="noteId"
        :content="subsubDatas"
        :replyData="commentObj"
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
import * as firebase from "firebase/app";
import "firebase/firestore";
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
    reloadComment: Function,
    noteId: String
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isAuthenticated: state => state.auth.isAuthenticated
    }),
    
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
    this.rereplyList();
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
      subsubCommentUpdateToggle2: false,
      db: firebase.firestore()
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
      this.rereplyList();
    },

    updateComment() {
      if (this.commentObj.uid != this.user.user.uid) {
        this.$alert("작성자만 수정할 수 있습니다.").then(() => {
          return;
        });
      } else {
        this.subUpdateCommentToggle();
      }
    },
    updateSubComment(data, index) {
      if (data.uid != this.user.user.uid) {
        this.$alert("작성자만 수정할 수 있습니다.").then(() => {
          return;
        });
      } else {
        this.subsubDatas = this.subCommentList[index]
        this.subsubCommentUpdateToggle();
      }
    },
    async deleteCommentConfirm(data) {
      if (data.uid != this.user.user.uid) {
        this.$alert("작성자만 삭제할 수 있습니다.").then(() => {
          return;
        });
      } else {
        this.$confirm("정말 삭제하시겠습니까?").then(() => {
          this.deleteComment(data);
        });
      }
    },
    async deleteSubCommentConfirm(data){
      if (data.uid != this.user.user.uid) {
        this.$alert("작성자만 삭제할 수 있습니다.").then(() => {
          return;
        });
      } else {
        this.$confirm("정말 삭제하시겠습니까?").then(() => {
          this.deleteSubComment(data);
        });
      }
    },
    dateFmt(date) {
      return moment(date).format("YYYY년 MM월 DD일");
    },
    async deleteComment(data){
      try {
        let list
        let id = ''
        list = await this.db.collection("board").doc(this.noteId).collection("reply").where("sort","==",data.sort).get();
        list.forEach(doc => {
          id = doc.id;
        });
        try {
          await this.db.collection("board").doc(this.noteId).collection("reply").doc(id).delete();  
          this.reloadComment();
        } catch (error) {
          console.error(error,"댓글 삭제 에러");
        }
        
      } catch (error) {
        console.error(error,"Error")
      }
      
    },
    async deleteSubComment(data){
      try {
        let list
        let replyList = ''
        let id = ''
        let deleteId = ''
        list = await this.db.collection("board").doc(this.noteId).collection("reply").where("sort","==",this.commentObj.sort).get();
        list.forEach(doc => {
          id = doc.id;
          // console.log(id,doc.id,"댓글아이디");
        });

        replyList = await this.db.collection("board").doc(this.noteId).collection("reply").doc(id).collection("rereply").where("sort","==",data.sort).get();
        replyList.forEach(doc => {
          deleteId = doc.id;
          // console.log(replyId,doc.data(),"댓글아이디");
        });
        
        try {
          await this.db.collection("board").doc(this.noteId).collection("reply").doc(id).collection("rereply").doc(deleteId).delete();
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
    },
    async rereplyList(){
      this.subCommentList = [];
      try {
        let list
        let replyList
        let id = ''
        // let replyId = ''

        list = await this.db.collection("board").doc(this.noteId).collection("reply").where("sort","==",this.commentObj.sort).get();
        list.forEach(doc => {
          id = doc.id;
        });
        replyList = await this.db.collection("board").doc(this.noteId).collection("reply").doc(id).collection("rereply").get();
        replyList.forEach(doc => {
          id = doc.id;
          this.subCommentList.push(doc.data())
        });
        
      } catch (error) {
        console.error(error,"Error")
      }
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
