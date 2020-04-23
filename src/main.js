import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import request from "./plugins/requests";
import store from './store/index'
import router from "./router";

Vue.prototype.$get = request.get;
Vue.prototype.$post = request.post;

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store ,
  router,
  render: h => h(App),
}).$mount('#app');
