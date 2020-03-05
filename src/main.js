import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import VModal from 'vue-js-modal'
import firebase from 'firebase'
import config from '@/config'
 
// register jw pagination component globally
import JwPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JwPagination);
Vue.use(VModal );
Vue.use(firebase);
Vue.use(BootstrapVue);
firebase.initializeApp(config.config);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  el: "#app",
  render: h => h(App)
});
