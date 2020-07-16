export default {
    namespaced: true,
    state: {
        user: {},
        permissions: {},
        roles: {},
        passwordEditorDialog:false,
    },
    mutations: {
        setUser (state, val) {
            console.log(val);
            state.user = val
        },
        setPermissions (state, val) {
            state.permissions = val
        },
        setRoles (state, val) {
            state.roles = val
        },
        setPasswordEditorDialog(state, val){
            state.passwordEditorDialog = val;
        }
    }
}