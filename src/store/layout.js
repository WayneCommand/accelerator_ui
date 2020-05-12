const state = {
    menu: true
};

const mutations = {
    setMenu(state, display) {
        state.menu = display;
    }
};

export default {
    namespaced: true,
    state,
    mutations
}