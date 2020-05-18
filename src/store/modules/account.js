export default {
    namespaced: true,
    state: {
        token: "",
        expireTime: "",
        user: {},
        permissions: {},
        roles: {},
        passwordEditorDialog:false,
    },
    mutations: {
        setToken (state, val) {
            state.token = val
        },
        setExpireTime (state, val) {
            state.expireTime = val
        },
        setUser (state, val) {
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