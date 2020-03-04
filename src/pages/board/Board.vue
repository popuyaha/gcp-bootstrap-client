<template>
  <div>
    <b-table
      striped
      hover
      small
      head-variant="light"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :items="pageOfItems"
      :fields="fields"
      @row-clicked="updateNote"
    ></b-table>
    <div align="right">
      <b-button variant="primary" style="margin:10px" class="btn pull-right" @click="newBoard">글쓰기</b-button>
    </div>
    <div class="card-footer pb-0 pt-3" align="center">
      <jw-pagination :items="items" @changePage="onChangePage"></jw-pagination>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import router from "@/router";
// import API from "@aws-amplify/api";
import Alert from "@/components/auth/Alert.vue";

Vue.component("v-alert", Alert);
export default {
  data() {
    return {
      sortBy: "created_at",
      sortDesc: false,
      pageOfItems: [],
      fields: [
        { key: "title", label: "제목", sortable: true },
        { key: "name", label: "사용자명", sortable: true }
      ],
      items: []
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isAuthenticated: state => state.auth.isAuthenticated
    })
  },
  created() {
    // return API.get("board", "board")
    //   .then(resData => {
    //     this.items = resData;
    //   })
    //   .catch(err => {
    //     this.$alert("error =", err).then(() => {
    //       return;
    //     });
    //   });
  },
  methods: {
    newBoard() {
      router.push("board/newboard");
    },
    updateNote(item) {
      // router.push({ name: "readboard", params: { item } });
      router.push("board/readboard?noteId=" + item.noteId);
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    }
  }
};
</script>
