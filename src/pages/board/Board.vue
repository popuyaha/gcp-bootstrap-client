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
import * as firebase from "firebase/app";
import "firebase/firestore";
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
      items: [],
      db: firebase.firestore()
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      isAuthenticated: state => state.auth.isAuthenticated
    })
  },
  async created() {
    let data
    try {
      data = await this.db.collection("board").get();
      let noteData = [];
      data.forEach(doc => {
        noteData.push(doc.data());
      });
      this.items = noteData;  
    } catch (error) {
      console.error(error,"error");
    }
    
  },
  methods: {
    newBoard() {
      router.push("board/newboard");
    },
    async updateNote(item) {
      let data
      let id = ''
      data = await this.db.collection("board").where("sort","==",item.sort).get();
      data.forEach(doc => {
        id = doc.id
      });
      this.$nextTick(function() {
          router.push("board/readboard?noteId=" + id);
      });
      
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    }
  }
};
</script>
