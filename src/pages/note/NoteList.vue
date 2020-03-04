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
      <b-button href="#" variant="primary" @click="deleteNote(item)" style="margin:5px">삭제하기</b-button>
    </b-card>
    <b-button variant="primary" style="margin:10px" class="btn pull-right" @click="newNote">글쓰기</b-button>
  </div>
</template>
<script>
import Vue from "vue";
import { mapState } from "vuex";
import router from "@/router";
// import API from "@aws-amplify/api";
//import Storage from "@aws-amplify/storage";
import Alert from "@/components/auth/Alert.vue";
import VueSimpleAlert from "vue-simple-alert";
import moment from "moment";
import VueMomentJS from "vue-momentjs";

Vue.component("v-alert", Alert);
Vue.use(VueSimpleAlert, VueMomentJS, moment);

export default {
  data() {
    return {
      datas: []
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
  created() {
    this.getNoteList();
  },
  methods: {
    newNote() {
      router.push("notelist/newnote");
    },
    deleteNote(item) {
      console.log(item,"item");
      this.$confirm("정말 삭제하시겠습니까?").then(() => {
        // return API.del("notes", "notes/" + item.noteId)
        //   .then(response => {
        //     this.getNoteList();
        //     //router.replace('/notelist')
        //     return response;
        //   })
        //   .catch(error =>
        //     this.$alert("error =", error).then(() => {
        //       return;
        //     })
        //   );
      });
    },
    updateNote(item) {
      router.push({ name: "newnote", params: { item } });
    },
    dateFmt(date) {
      return moment(date).format("YYYY년 MM월 DD일");
    },
    getNoteList() {
      // return API.get("notes", "notes")
      //   .then(resData => {
      //     this.datas = resData;
      //   })
      //   .catch(err => {
      //     this.$alert("error =", err).then(() => {
      //       return;
      //     });
      //   });
    }
  }
};
</script>
<style scope></style>
