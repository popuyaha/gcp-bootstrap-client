import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import VModal from 'vue-js-modal'
import firebase from 'firebase'
 
// register jw pagination component globally
import JwPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JwPagination);
Vue.use(VModal );
Vue.use(firebase);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  el: "#app",
  render: h => h(App)
});
