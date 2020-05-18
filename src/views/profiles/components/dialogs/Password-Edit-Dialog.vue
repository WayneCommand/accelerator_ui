<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="closeEditorDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>修改密码</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text @click="changePassword">保存</v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-list three-line subheader>
                <v-subheader>原密码</v-subheader>
                <v-list-item>
                    <v-list-item-content>
                        <v-flex sm5 md5 class="mx-5">
                            <v-text-field v-model="originPwd"
                                          :counter="32"
                                          label="原密码"
                                          placeholder="原密码"
                                          outlined required></v-text-field>
                        </v-flex>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list three-line subheader>
                <v-subheader>新密码</v-subheader>
                <v-list-item>
                    <v-list-item-content>
                        <v-flex sm5 md5 class="mx-5">
                            <v-text-field v-model="newPwd"
                                          :counter="32"
                                          label="新密码"
                                          placeholder="新密码"
                                          outlined required></v-text-field>
                        </v-flex>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-flex sm5 md5 class="mx-5">
                            <v-text-field v-model="newPwdAg"
                                          :counter="32"
                                          label="重复新密码"
                                          placeholder="重复新密码"
                                          outlined required></v-text-field>
                        </v-flex>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapMutations,mapState} from 'vuex'

    export default {
        name: "Password-Edit-Dialog",
        data:function () {
            return{
                originPwd:"",
                newPwd:"",
                newPwdAg:""
            }
        },
        methods:{
            ...mapMutations({
                setEditorDialog: 'account/setPasswordEditorDialog'
            }),
            closeEditorDialog:function () {
                this.setEditorDialog(false);
            },
            changePassword:function () {

            }
        },
        computed:{
            ...mapState({
                dialog: state => state.account.passwordEditorDialog,
            })
        }

    }
</script>

<style scoped>

</style>