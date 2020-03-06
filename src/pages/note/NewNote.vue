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
      attachment: []
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
      // if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      //     alert(`${config.MAX_ATTACHMENT_SIZE/1000000} MB. 보다 작은 파일을 선택해 주세요`);
      //     return;
      // }
      try {
       
        console.log(this.user.user.uid,"들어오니");
        var db = firebase.firestore();
        // const noteRef = db.doc("/note/noteData/noteList/");
        // let data
        // data = await noteRef.get();

        // if (data.exists){
        //   console.log("데이터는 ? ", data.data());
        // }else{
        //   console.log("데이터가없어?");
        // }

        // const noteRef = db.collection('note');
        let data
        data = await db.collection("note").get();
        let noteData = [];
        data.forEach(doc => {
          noteData.push(doc.data());
          console.log(doc.id, " => " , doc.data());
        });
        console.log(noteData,"노트데이터")
        // .then(function(querySnapshot) {
        //     querySnapshot.forEach(function(doc) {
        //         // doc.data() is never undefined for query doc snapshots
        //         console.log(doc.id, " => ", doc.data());
        //     });
        // })
        // .catch(function(error) {
        //     console.log("Error getting documents: ", error);
        // });

        // 노트 샘플데이터
        // noteRef.doc().set({
        //     title: "San Francisco", content: "1번내용", uid: this.user.user.uid,
        //     capital: false, created_at: firebase.firestore.FieldValue.serverTimestamp(),
        //     name: "popuyaha",
        //     regions: ["west_coast", "norcal"],
        //     sort: firebase.firestore.FieldValue.serverTimestamp()});
        // noteRef.doc().set({
        //     title: "San Francisco", content: "2번내용", uid: this.user.user.uid,
        //     capital: false, created_at: firebase.firestore.FieldValue.serverTimestamp(),
        //     name: "nlknlk0",
        //     regions: ["west_coast", "socal"], 
        //     sort: firebase.firestore.FieldValue.serverTimestamp()});
        // noteRef.doc().set({
        //     title: "San Francisco", content: "3번내용", uid: this.user.user.uid,
        //     capital: false, created_at: firebase.firestore.FieldValue.serverTimestamp(),
        //     name: "nlnlk2",
        //     regions: ["east_coast"], 
        //     sort: firebase.firestore.FieldValue.serverTimestamp()});
        // noteRef.doc().set({
        //     title: "San Francisco", content: "4번내용", uid: this.user.user.uid,
        //     capital: false, created_at: firebase.firestore.FieldValue.serverTimestamp(),
        //     name: "popuyaha",
        //     regions: ["kanto", "honshu"], 
        //     sort: firebase.firestore.FieldValue.serverTimestamp()});
        // noteRef.doc().set({
        //     title: "San Francisco", content: "5번내용", uid: this.user.user.uid,
        //     capital: false, created_at: firebase.firestore.FieldValue.serverTimestamp(),
        //     name: "popuyaha",
        //     regions: ["jingjinji", "hebei"], 
        //     sort: firebase.firestore.FieldValue.serverTimestamp()});
        // noteRef.doc().set({
        //     title: "San Francisco", content: "6번내용", uid: this.user.user.uid,
        //     capital: false, created_at: firebase.firestore.FieldValue.serverTimestamp(),
        //     name: "popuyaha",
        //     regions: ["jingjinji", "hebei"], 
        //     sort: firebase.firestore.FieldValue.serverTimestamp()});
        // noteRef.doc().set({
        //     title: "San Francisco", content: "7번내용", uid: this.user.user.uid,
        //     capital: false, created_at: firebase.firestore.FieldValue.serverTimestamp(),
        //     name: "popuyaha",
        //     regions: ["jingjinji", "hebei"], 
        //     sort: firebase.firestore.FieldValue.serverTimestamp()});
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
    createNote(note) {
      console.log(note,"note");
      // return API.post("notes", "notes", {
      //   body: note
      // })
      //   .then(response => {
      //     router.replace("/notelist");
      //     return response;
      //   })
      //   .catch(error =>
      //     this.$alert("error =", error).then(() => {
      //       return;
      //     })
      //   );
    },
    updateNote(note) {
      console.log(note,"note");
      // return API.put("notes", "notes/" + note.noteId, {
      //   body: note
      // })
      //   .then(response => {
      //     router.replace("/notelist");
      //     return response;
      //   })
      //   .catch(error =>
      //     this.$alert("error =", error).then(() => {
      //       return;
      //     })
      //   );
    }
    // check(file) {
    //   //console.log(file, "체크");
    // }
  }
};
</script>
