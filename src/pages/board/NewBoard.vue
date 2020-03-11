<template>
  <div class="NewBoard col-sm-offset-2 col-sm-5 col-md-8" style="margin:5px">
    <h2 style="margin:10px">
      {{ items !== undefined ? "글 수정하기" : "글 등록하기" }}
    </h2>
    <b-form-input
      id="title"
      v-model="title"
      type="text"
      required
      placeholder="Enter title"
      style="margin:1px"
    ></b-form-input>

    <b-form-textarea
      id="textarea"
      v-model="content"
      placeholder="Enter something..."
      rows="6"
      max-rows="9"
    ></b-form-textarea>
    <div align="right">
      <b-button
        variant="primary"
        @click="newBoard"
        class="col-md-offset-11 col-md-1"
        style="margin:5px"
        >{{ items !== undefined ? "수정" : "등록" }}</b-button
      >
      <b-button
        variant="primary"
        @click="back"
        class="col-md-offset-11 col-md-1"
        style="margin:5px"
        >취소</b-button
      >
    </div>
    <!-- <pre class="mt-3 mb-0">{{ text }}</pre> -->
  </div>
</template>
<script>
// import API from "@aws-amplify/api";
import router from "@/router";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { mapState } from "vuex";
// import * as cors from 'cors';

// const firebase = require("firebase");
// Required for side-effects
require("firebase/functions");
// const cors = require('cors')({origin: true});

export default {
  data() {
    const items = this.$route.params.item;
    return {
      items: items,
      title: items !== undefined ? items.title : "",
      content: items !== undefined ? items.content : "",
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
    async newBoard() {
      try {
        this.items == undefined
          ? this.createBoard({
              title: this.title,
              content: this.content
            })
          : this.updateBoard({
              title: this.title,
              content: this.content,
              noteId: this.items.noteId
            });
      } catch (e) {
        this.$alert("error =", e).then(() => {
          return;
        });
        //this.setState({ isLoading: false });
      }
    },
    async back() {
      if (this.items) {
        let data;
        let id = "";
        data = await this.db
          .collection("board")
          .where("sort", "==", this.items.sort)
          .get();
        data.forEach(doc => {
          id = doc.id;
        });
        router.replace("/board/readboard?noteId=" + id);
      } else {
        router.replace("/board");
      }
    },
    async createBoard(board) {
      // console.log(`데이터는 ${board}`);
      console.log(board,"아녀?")
      let messageText = board.content;
      var addMessage = firebase.functions().httpsCallable("addMessage");
      addMessage({ text: messageText }).then(function(result) {
        // Read result of the Cloud Function.
        var sanitizedMessage = result.data.text;
        console.log(sanitizedMessage, "메세진");
      });
      // try {
      //   this.db.collection("board").add({
      //     title: board.title,
      //     content: board.content,
      //     uid: this.user.user.uid,
      //     name: this.user.user.displayName,
      //     sort: firebase.firestore.FieldValue.serverTimestamp()
      //   });
      //   this.$nextTick(function() {
      //     router.replace("/board");
      //   });
      // } catch (e) {
      //   this.$alert("error =", e).then(() => {
      //     return;
      //   });
      //   //this.setState({ isLoading: false });
      // }
    },
    async updateBoard(board) {
      try {
        let data;
        let id = "";
        data = await this.db
          .collection("board")
          .where("sort", "==", this.items.sort)
          .get();
        data.forEach(doc => {
          id = doc.id;
        });
        await this.db
          .collection("board")
          .doc(id)
          .update({
            title: board.title,
            content: board.content
          });
        router.replace("/board/readboard?noteId=" + id);
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
