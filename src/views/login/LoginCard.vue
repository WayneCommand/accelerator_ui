<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-20" :loading="loading_show">
                        <v-toolbar flat>
                            <v-toolbar-title>登陆</v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn
                                    text
                                    href="#"
                                    target="_blank"
                            >
                                注册
                            </v-btn>

                        </v-toolbar>
                        <v-stepper v-model="loginStep" class="elevation-0">
                            <v-stepper-items >
                                <v-stepper-content step="1" >
                                    <v-container>
                                        <v-text-field v-model="account"
                                                      :counter="16"
                                                      label="用户名"
                                                      placeholder="用户名"
                                                      @keyup.13="lookupAccount"
                                                      outlined required></v-text-field>
                                    </v-container>
                                    <v-btn
                                            color="primary"
                                            @click="lookupAccount"
                                            :disabled="account.length === 0"
                                    >
                                        下一步
                                    </v-btn>
                                </v-stepper-content>
                                <v-stepper-content step="2">
                                    <v-container>
                                        <v-text-field
                                                v-model="password"
                                                :append-icon="pw_show ? 'visibility' : 'visibility_off'"
                                                :type="pw_show ? 'text' : 'password'"
                                                @click:append="pw_show = !pw_show"
                                                :rules="[rules.required, rules.min]"
                                                name="password"
                                                label="密码"
                                                hint="至少6个字符"
                                                placeholder="密码"
                                                @keyup.13="goLogin"
                                                counter outlined></v-text-field>
                                    </v-container>
                                    <v-btn
                                            color="primary"
                                            @click="goLogin"
                                            :disabled="password.length === 0"
                                    >
                                        Login
                                    </v-btn>
                                    <v-btn text @click="loginStep = 1">上一步</v-btn>
                                </v-stepper-content>
                            </v-stepper-items>
                        </v-stepper>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    import api from '../../api/index'
    import {mapMutations} from 'vuex'

    export default {
        name: "LoginCard",
        data: function () {
            return {
                loginStep: 1,
                account: "",
                password: "",
                loading_show: false,
                pw_show: false,
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 6 || 'Min 6 characters',
                }
            };
        },
        methods: {
            goLogin: function () {
                this.showLoading();

                api.login.loginByPassword({
                    username: this.account,
                    password: this.password
                }).then(resp => {
                    if (resp.data.state === "success") {
                        this.saveLogin(resp.headers['x-auth-token']);
                        this.hideLoading();
                        this.$router.replace("/profile/main")
                    } else {
                        this.$dialog.notify.warning(resp.data.msg, {
                            position: 'top-right',
                            timeout: 3000
                        })
                        this.hideLoading();
                    }
                }).catch(() => {
                    this.hideLoading();
                })

            },
            lookupAccount: function () {
                this.loading_show = true;

                api.login.lookup({
                    username: this.account
                }).then((resp) => {
                    if (resp.data.isExist === "true") {
                        this.loginStep = 2;
                    }else{
                        this.$dialog.notify.warning(resp.data.msg,{
                            position: 'top-right',
                            timeout: 3000
                        })
                    }
                    this.loading_show = false;
                }).catch(() => {
                    this.loading_show = false;
                })

            },
            ...mapMutations({
                setToken: 'account/setToken'
            }),
            saveLogin(token) {
                this.setToken(token);
            },
            showLoading:function () {
                this.loading_show = true;
            },
            hideLoading:function () {
                this.loading_show = false;
            }
        },


    }
</script>

<style scoped>

</style>