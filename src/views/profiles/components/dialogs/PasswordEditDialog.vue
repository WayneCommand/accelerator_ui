<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay persistent transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="closeEditorDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>修改密码</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                </v-toolbar-items>
            </v-toolbar>

            <v-container class="my-5">
                <v-stepper v-model="pwdStep" vertical>
                    <v-stepper-step :complete="pwdStep > 1" step="1">
                        验证当前的密码
                    </v-stepper-step>
                    <v-stepper-content step="1">
                        <v-card color="lighten-1" class="mb-12 elevation-0">
                            <v-card-text>
                                <v-form v-model="originPwdValid" ref="originPwdForm">
                                    <v-text-field v-model="originPwd"
                                                  :counter="32"
                                                  label="原密码"
                                                  placeholder="原密码"
                                                  :rules="[rules.min]"
                                                  :error-messages="originPwdErrMsg"
                                                  :append-icon="pw_show ? 'mdi-eye' : 'mdi-eye-off'"
                                                  :type="pw_show ? 'text' : 'password'"
                                                  @click:append="pw_show = !pw_show"
                                                  outlined required></v-text-field>
                                </v-form>
                            </v-card-text>
                        </v-card>
                        <v-btn color="primary" @click="verifyPassword">下一步</v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="pwdStep > 2" step="2">更换新密码</v-stepper-step>
                    <v-stepper-content step="2">
                        <v-card color="lighten-1" class="mb-12 elevation-0">
                            <v-card-text>
                                <v-form v-model="pwdValid" ref="pwdForm">
                                    <v-text-field v-model="newPwd"
                                                  :counter="32"
                                                  label="新密码"
                                                  placeholder="新密码"
                                                  :rules="[rules.min]"
                                                  :append-icon="pw_show ? 'mdi-eye' : 'mdi-eye-off'"
                                                  :type="pw_show ? 'text' : 'password'"
                                                  @click:append="pw_show = !pw_show"
                                                  outlined required></v-text-field>
                                    <v-text-field v-model="newPwdAg"
                                                  :counter="32"
                                                  label="重复新密码"
                                                  placeholder="重复新密码"
                                                  :rules="[rules.pwdAg]"
                                                  :type="pw_show ? 'text' : 'password'"
                                                  outlined required></v-text-field>
                                </v-form>

                            </v-card-text>
                        </v-card>
                        <v-btn color="primary" @click="changePassword">下一步</v-btn>
                    </v-stepper-content>

                    <v-stepper-step step="3">完成</v-stepper-step>
                    <v-stepper-content step="3">
                        <v-card color="lighten-1" class="mb-12 elevation-0">
                            <v-card-title>我们已经完成刚才的操作。</v-card-title>
                        </v-card>
                        <v-btn color="primary" @click="closeEditorDialog">完成</v-btn>
                    </v-stepper-content>
                </v-stepper>
            </v-container>

            <v-divider></v-divider>
        </v-card>

        <!-- loading -->
        <v-dialog
                v-model="loading"
                hide-overlay
                persistent
                width="300"
        >
            <v-card color="primary" dark>
                <v-card-text>
                    Please stand by
                    <v-progress-linear
                            indeterminate
                            color="white"
                            class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-dialog>
</template>

<script>
    import {mapMutations,mapState} from 'vuex'
    import api from "@/api";

    export default {
        name: "password-edit-dialog",
        data:function () {
            return{
                pw_show: false,
                originPwd:"",
                newPwd:"",
                newPwdAg:"",
                pwdStep: 1,
                rules:{
                    min: val => val.length >= 6 || 'Min 6 characters',
                    pwdAg: val => val === this.newPwd || "两次输入的密码不一致"
                },
                originPwdErrMsg: "",
                loading:false,
                pwdValid: true,
                originPwdValid:true

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
                //验证表单
                if(!this.$refs.pwdForm.validate())
                    return

                //提交更新
                api.mySafety.changePassword({
                    password:this.newPwd
                }).then(resp => {
                    if (resp.data.state === "success")
                        this.pwdStep = 3;
                })

            },
            verifyPassword:function () {
                this.openLoading();

                api.mySafety.verifyPassword({
                    password: this.originPwd
                }).then(resp => {
                    if (resp.data.state === "success"){
                        this.pwdStep = 2;
                    }else{
                        this.originPwdErrMsg = "原始密码验证错误";
                    }
                    this.closeLoading();
                })

            },
            openLoading:function () {
                this.loading = true;
            },
            closeLoading:function () {
                this.loading = false;
            }

        },
        computed:{
            ...mapState({
                dialog: state => state.account.passwordEditorDialog,

            }),

        },
        watch:{
            dialog:function () {
                //清空数据
                this.$refs.pwdForm.reset()
                this.$refs.originPwdForm.reset();
                //重置到第一页
                this.pwdStep = 1;
            }
        }

    }
</script>

<style scoped>

</style>