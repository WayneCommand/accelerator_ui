const state = {
    menu: true
};

const mutations = {
    setMenuDisplay(state, display) {
        state.menu = display;
    }
};

export default {
    state,
    mutations
}