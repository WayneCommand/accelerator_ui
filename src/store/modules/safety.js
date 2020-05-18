const state = {
    safetyLoginManagementEditorDialog: false,
    safetyRecoverMethodEditorDialog: false,
    safetyEditorType: "",
};

const mutations = {
    setSafetyLoginManagementEditorDialog(state, val) {
        state.safetyLoginManagementEditorDialog = val;
    },
    setSafetyRecoverMethodEditorDialog(state, val) {
        state.safetyRecoverMethodEditorDialog = val;
    },
    setSafetyEditorType(state, val) {
        state.safetyEditorType = val;
    }
};

export default {
    namespaced: true,
    state,
    mutations
}