import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import account from "./modules/account";

Vue.use(Vuex);


export default new Vuex.Store({
    modules:{
        login,
        account
    }
})