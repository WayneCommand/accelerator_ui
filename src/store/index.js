import Vue from 'vue'
import Vuex from 'vuex'
import account from "./modules/account";
import layout from "./modules/layout";

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        account: account,
        layout: layout
    }
})