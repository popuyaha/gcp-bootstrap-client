<template>
  <div>
    <h2 style="margin:10px">내 노트</h2>
    <br />
    <b-card
      v-for="item in datas"
      v-bind:key="item.noteId"
      bg-variant="dark"
      text-variant="white"
      style="margin:10px"
    >
      <b-card-title>{{ item.title }}</b-card-title>
      <b-card-text style="white-space:pre;">{{ item.content }}</b-card-text>
      <b-card-text>
        {{
        item.updateAt !== null
        ? "수정일자 : " + dateFmt(item.updateAt)
        : "등록일자 : " + dateFmt(item.createAt)
        }}
      </b-card-text>

      <b-button href="#" variant="primary" @click="updateNote(item)" style="margin:5px">수정하기</b-button>
      <b-button href="#" variant="primary" @click="deleteNoteConfirm(item)" style="margin:5px">삭제하기</b-button>
    </b-card>
    <b-button variant="primary" style="margin:10px" class="btn pull-right" @click="newNote">글쓰기</b-button>
  </div>
</template>
<script>
import Vue from "vue";
import { mapState } from "vuex";
import * as firebase from "firebase/app";
import "firebase/firestore";
import router from "@/router";
import Alert from "@/components/auth/Alert.vue";
import VueSimpleAlert from "vue-simple-alert";
import moment from "moment";
import VueMomentJS from "vue-momentjs";

Vue.component("v-alert", Alert);
Vue.use(VueSimpleAlert, VueMomentJS, moment);

export default {
  data() {
    return {
      datas: [],
      db: firebase.firestore()
      //attachmentURL : '',
      //attachment: [],
      //file: null
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isAuthenticated: state => state.auth.isAuthenticated
    })
  },
  async created() {
    this.getNoteList();
  },
  methods: {
    newNote() {
      router.push("notelist/newnote");
    },
    async deleteNoteConfirm(item) {
      this.$confirm("정말 삭제하시겠습니까?").then(() => {
        return this.deleteNote(item);
      });
    },
    updateNote(item) {
      router.push({ name: "newnote", params: { item } });
    },
    dateFmt(date) {
      return moment(date).format("YYYY년 MM월 DD일");
    },
    async deleteNote(note) {
      try {
        let data;
        let id = "";
        data = await this.db
          .collection("note")
          .where("sort", "==", note.sort)
          .get();
        data.forEach(doc => {
          id = doc.id;
        });
        try {
          await this.db
            .collection("note")
            .doc(id)
            .delete();
          this.getNoteList();
        } catch (e) {
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
    },
    async getNoteList() {
      let data;
      try {
        data = await this.db
          .collection("note")
          .where("uid", "==", this.user.user.uid)
          .get();
        let noteData = [];
        data.forEach(doc => {
          noteData.push(doc.data());
        });
        this.datas = noteData;
      } catch (error) {
        this.$alert("error =", error).then(() => {
          return;
        });
      }
    }
  }
};
</script>
<style scope></style>
