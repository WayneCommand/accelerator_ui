import loginApi from '../../api/login'

const state = {
    username: "",
    password: ""
};

const mutations = {
    setUsername(state, {user}) {
        state.username = user.username;
    },
    setPassword(state,{user}){
        state.password = user.password;
    }
};

export default {
    state,
    mutations
}