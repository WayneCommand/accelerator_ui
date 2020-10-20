import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store/index'
import router from "./router";
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'

Vue.config.productionTip = false;

// only dev ENV
if (process.env.NODE_ENV === 'development'){
  require('./mock')
}

Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})

new Vue({
  vuetify,
  store ,
  router,
  render: h => h(App),
}).$mount('#app');
