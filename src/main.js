import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueSession from 'vue-session'
import DatePicker from "vue2-datepicker";
import SuiVue from 'semantic-ui-vue';
import Axios from 'axios'
import 'semantic-ui-css/semantic.min.css';
import './css/app.css';
import './css/all.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(VueSession)
Vue.use(SuiVue);
Vue.component('date-picker', DatePicker)

Axios.defaults.baseURL = `${process.env.VUE_APP_API_PATH}api`
Vue.prototype.$http = Axios;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')