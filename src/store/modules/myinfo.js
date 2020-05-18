const state = {
    infoEditorDialog: false,
    infoEditorType: "",
};

const mutations = {
    setInfoEditorDialog(state, val) {
        state.infoEditorDialog = val;
    },
    setInfoEditorType(state, val) {
        state.infoEditorType = val;
    }
};

export default {
    namespaced: true,
    state,
    mutations
}