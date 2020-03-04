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
// import API from "@aws-amplify/api";
import router from "@/router";
//import config from "../../config"
// import { s3Upload } from "../../libs/awsLib";
// import Storage from "@aws-amplify/storage";

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
  methods: {
    async newNote() {
      // if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
      //     alert(`${config.MAX_ATTACHMENT_SIZE/1000000} MB. 보다 작은 파일을 선택해 주세요`);
      //     return;
      // }
      try {
        // if (this.file) {
        //     this.attachment = await s3Upload(this.file);
        // }
        // const attachment = this.file ? await s3Upload(this.file) : null;

        this.items == undefined
          ? await this.createNote({
              title: this.title,
              content: this.content
              // attachment
            })
          : await this.updateNote({
              title: this.title,
              content: this.content,
              noteId: this.items.noteId
              // attachment
            });

        //this.props.history.push("/");
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
