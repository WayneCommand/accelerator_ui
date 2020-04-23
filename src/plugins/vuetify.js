import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css'
import Message from "../views/componets/Message";

Vue.use(Vuetify);
Vue.use(Message);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});
