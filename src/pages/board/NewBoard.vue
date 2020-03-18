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

    <editor
      v-model="content"
      :options="editorOptions"
      :html="editorHtml"
      :visible="editorVisible"
      previewStyle="vertical"
      height="500px"
      mode="markdown"  
      />
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
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'codemirror/lib/codemirror.css';
import { Editor } from '@toast-ui/vue-editor'

// import boardFunctions from "@/functions/index.js";
// import * as cors from 'cors';

// const firebase = require("firebase");
// Required for side-effects
// const boardFunctions = require("firebase/functions");
// const cors = require('cors')({origin: true});
export default {
  components:{
    'editor': Editor
  },
  data() {
    const items = this.$route.params.item;
    return {
      editorOptions: {
          hideModeSwitch: true,
          hooks:{
            'addImageBlobHook': function(file, callback) {
              console.log(file,"블롭으로 들어오나?")
              console.log(callback,"콜백")
              var storage = firebase.storage();
              // Create a storage reference from our storage service
              var storageRef = storage.ref();
              storageRef.child('image/2020-02-29_400x400.png').getDownloadURL().then(function(url) {
              // `url` is the download URL for 'images/stars.jpg'

              // Or inserted into an <img> element:
              console.log(url,"url")
              callback(url,file.name)
              }).catch(function(error) {
            switch (error.code) {
                case 'storage/object-not-found':
                // File doesn't exist
                break;

                case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

                case 'storage/canceled':
                // User canceled the upload
                break;

                case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;
            }
            })
              
            //run callback
            //callback('Image URL');
        }
          }
      },
      editorHtml: '',
      editorVisible: true,
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
  created: { 
    
  
  },
  methods: {
    newBoard() {
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
      try {
        this.db.collection("board").add({
          title: board.title,
          content: board.content,
          uid: this.user.user.uid,
          name: this.user.user.displayName,
          sort: firebase.firestore.FieldValue.serverTimestamp()
        });
        this.$nextTick(function() {
          router.replace("/board");
        });
      } catch (e) {
        this.$alert("error =", e).then(() => {
          return;
        });
        //this.setState({ isLoading: false });
      }
    },
    async updateBoard(board) {
      try {
        console.log(board,"보드")
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
