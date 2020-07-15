const state = {
    safetyLoginManagementEditorDialog: false,
    safetyRecoverMethodEditorDialog: false,
    safetyDevicesEditorDialog: false,
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
    },
    setSafetyDevicesEditorDialog(state, val){
        state.safetyDevicesEditorDialog = val;
    }
};

export default {
    namespaced: true,
    state,
    mutations
}