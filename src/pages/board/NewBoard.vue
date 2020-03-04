<template>
  <div class="NewBoard col-sm-offset-2 col-sm-5 col-md-8" style="margin:5px">
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
      v-model="context"
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
      >{{ items !== undefined ? "수정" : "등록" }}</b-button>
      <b-button
        variant="primary"
        @click="back"
        class="col-md-offset-11 col-md-1"
        style="margin:5px"
      >취소</b-button>
    </div>
    <!-- <pre class="mt-3 mb-0">{{ text }}</pre> -->
  </div>
</template>
<script>
// import API from "@aws-amplify/api";
import router from "@/router";
import { mapState } from "vuex";

export default {
  data() {
    const items = this.$route.params.item;
    return {
      items: items,
      title: items !== undefined ? items.title : "",
      context: items !== undefined ? items.context : ""
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
          ? await this.createBoard({
              title: this.title,
              context: this.context,
              username: this.user.username,
              name: this.user.attributes.name
              // attachment
            })
          : await this.updateBoard({
              title: this.title,
              context: this.context,
              noteId: this.items.noteId
              // attachment
            });
      } catch (e) {
        this.$alert("error =", e).then(() => {
          return;
        });
        //this.setState({ isLoading: false });
      }
    },
    back() {
      if (this.items) {
        router.replace("/board/readboard?noteId=" + this.items.noteId);
      } else {
        router.replace("/board");
      }
    },
    createBoard(board) {
      console.log(board,"board");
      // return API.post("board", "board", {
      //   body: board
      // })
      //   .then(response => {
      //     router.replace("/board");
      //     return response;
      //   })
      //   .catch(error =>
      //     this.$alert("error =", error).then(() => {
      //       return;
      //     })
      //   );
    },
    updateBoard(board) {
      console.log(board,"board");
      // return API.put("board", "board/" + board.noteId, {
      //   body: board
      // })
      //   .then(response => {
      //     router.replace("/board");
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
