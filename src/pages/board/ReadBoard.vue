<template>
  <div v-if="this.items">
    <b-card>
      <div class="content-detail-content-info">
        <div class="content-detail-content-info-left">
          <div class="content-detail-content-info-left-number">
            <!-- {{this.contentId}} -->
          </div>
          <div class="content-detail-content-info-left-subject">{{ this.items.title }}</div>
        </div>
        <div class="content-detail-content-info-right">
          <div class="content-detail-content-info-right-user">글쓴이: {{ this.items.name }}</div>
          <div
            class="content-detail-content-info-right-created"
          >등록일: {{ dateFmt(this.items.created_at) }}</div>
        </div>
      </div>
      <div class="content-detail-content" style="white-space:pre;">{{ this.items.content }}</div>
      <div class="content-detail-button" align="right">
        <b-button variant="primary" style="margin:5px" @click="updateData(items)">수정</b-button>
        <b-button variant="success" style="margin:5px" @click="deleteDataConfirm">삭제</b-button>
        <b-button variant="primary" style="margin:5px" @click="back">돌아가기</b-button>
      </div>
      <div class="content-detail-comment">
        <CommentList :noteId="this.item" />
      </div>
    </b-card>
  </div>
</template>
<script>
import Vue from "vue";
import { mapState } from "vuex";
import router from "@/router";
import * as firebase from "firebase/app";
import "firebase/firestore";
import Alert from "@/components/auth/Alert.vue";
import CommentList from "./CommentList";
import VueSimpleAlert from "vue-simple-alert";
import moment from "moment";
import VueMomentJS from "vue-momentjs";

Vue.component("v-alert", Alert);
Vue.use(VueSimpleAlert, VueMomentJS, moment);

export default {
  data() {
    const item = this.$route.query.noteId;
    return {
      item: item,
      items: this.items,
      db: firebase.firestore()
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isAuthenticated: state => state.auth.isAuthenticated
    })
  },
  async mounted() {
    try {
      let data
      // let id = ''
      // let resData = [];
      data = await this.db.collection("board").doc(this.item).get();
      this.items=data.data();
    } catch (error) {
      console.error(error,"error");
    }
  },
  methods: {
    back() {
      router.replace("/board");
    },
    async deleteDataConfirm() {
      if (this.items.uid != this.user.user.uid) {
        // 작성자가 아님
        this.$alert("작성자만 삭제할 수 있습니다.").then(() => {
          return;
        });
      } else {
        this.$confirm("정말 삭제하시겠습니까?").then(() => {
          this.deleteData();
        });
      }
    },
    updateData(item) {
      if (this.items.uid != this.user.user.uid) {
        // 작성자가 아님
        this.$alert("작성자만 수정할 수 있습니다.").then(() => {
          return;
        });
      } else {
        router.push({ name: "newboard", params: { item } });
      }
    },
    dateFmt(date) {
      return moment(date).format("YYYY년 MM월 DD일");
    },
    async deleteData(){
      try {
        let data
        let id = ''
        data = await this.db.collection("board").where("sort","==",this.items.sort).get();
        data.forEach(doc => {
          id = doc.id
        });
        try{
          await this.db.collection("board").doc(id).delete();
          router.replace("/board");
        }catch(e){
          this.$alert("삭제 오류 =", e).then(() => {
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
  },
  components: {
    CommentList
  }
};
</script>
<style scoped>
.content-detail-content-info {
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
}

.content-detail-content-info-left {
  width: 720px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.content-detail-content-info-right {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.content-detail-content {
  border: 1px solid black;
  margin-top: 1rem;
  padding-top: 1rem;
  min-height: 720px;
}

.content-detail-button {
  border: 1px solid black;
  margin-top: 1rem;
  padding: 2rem;
}

.content-detail-comment {
  border: 1px solid black;
  margin-top: 1rem;
  padding: 2rem;
}
</style>
