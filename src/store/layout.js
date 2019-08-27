const state = {
    menu:false
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