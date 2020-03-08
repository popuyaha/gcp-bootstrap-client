<template>
  <div class="NewNote col-sm-offset-2 col-sm-5 col-md-8" style="margin:5px">
    <h2 style="margin:10px">{{ items !== undefined ? "글 수정하기" : "글 등록하기" }}</h2>
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

    <!-- <b-form-file
          id="file-small" size="sm"
          v-model="file"
          :state="Boolean(file)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <b-button @click="check(file)">파일 초기화</b-button>
    <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>-->

    <b-button
      variant="primary"
      @click="newNote"
      class="col-md-offset-11 col-md-1"
      style="margin:5px"
    >{{ items !== undefined ? "수정" : "등록" }}</b-button>
    <b-button
      variant="primary"
      @click="back"
      class="col-md-offset-11 col-md-1"
      style="margin:5px"
    >취소</b-button>
    <!-- <pre class="mt-3 mb-0">{{ text }}</pre> -->
  </div>
</template>
<script>
import router from "@/router";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { mapState } from "vuex";

export default {
  data() {
    const items = this.$route.params.item;
    return {
      items: items,
      title: items !== undefined ? items.title : "",
      content: items !== undefined ? items.content : "",
      attachmentURL: null,
      attachment: [],
      db: firebase.firestore()
      // file: items !== undefined ? items.attachment : null
    };
  },
  async created() {
    // if(this.items){
    //     console.log(this.items,"어")
    //     if (this.items.attachment) {
    //         this.attachmentURL = await Storage.vault.get(this.items.attachment);
    //     }
    //     console.log(this.attachmentURL,"this.attachmentURL")
    // }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isAuthenticated: state => state.auth.isAuthenticated
    })
  },
  methods: {
    async newNote() {
      try {
        this.items == undefined
          ? await this.createNote({
              title: this.title,
              content: this.content
            })
          : await this.updateNote({
              item : this.items,
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
    back() {
      router.replace("/notelist");
    },
    async createNote(note) {
      try {
        this.db.collection("note").add({
        title: note.title, content: note.content, uid: this.user.user.uid,
        capital: false, created_at: firebase.firestore.FieldValue.serverTimestamp(),
        name: this.user.user.displayName,
        sort: firebase.firestore.FieldValue.serverTimestamp()});

        router.replace("/notelist");
      } catch (e) {
        this.$alert("error =", e).then(() => {
          return;
        });
        //this.setState({ isLoading: false });
      }
    },
    async updateNote(note) {
      try {
        let data
        let id = ''
        data = await this.db.collection("note").where("sort","==",this.items.sort).get();
        data.forEach(doc => {
          id = doc.id
        });
        await this.db.collection("note").doc(id).update({
          title : note.title,
          content : note.content
        });
        router.replace("/notelist");
      } catch (e) {
        this.$alert("error =", e).then(() => {
          return;
        });
        //this.setState({ isLoading: false });
      }
    }
    // check(file) {
    //   //console.log(file, "체크");
    // }
  }
};
</script>
