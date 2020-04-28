<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-20" :loading="loadingFlag">
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
                                        <v-text-field v-model="name" :counter="16" label="用户名"
                                                      placeholder="用户名" outlined required></v-text-field>
                                    </v-container>
                                    <v-btn
                                            color="primary"
                                            @click="loginStep = 2"
                                            :disabled="name.length === 0"
                                    >
                                        下一步
                                    </v-btn>
                                </v-stepper-content>
                                <v-stepper-content step="2">
                                    <v-container>
                                        <v-text-field
                                                v-model="password"
                                                :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                                :type="show1 ? 'text' : 'password'"
                                                @click:append="show1 = !show1"
                                                :rules="[rules.required, rules.min]"
                                                name="password"
                                                label="密码"
                                                hint="至少6个字符"
                                                counter
                                                placeholder="密码"
                                                outlined></v-text-field>
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
                name: "",
                password: "",
                loadingFlag: false,
                show1: false,
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 6 || 'Min 6 characters',
                }
            };
        },
        methods: {
            goLogin: function () {
                this.loadingFlag = true;

                api.login.loginByPassword({
                    username: this.name,
                    password:this.password
                }).then(resp => {
                    if (resp.data.state === "success"){
                        this.saveLogin(resp.headers['x-auth-token']);
                        this.loadingFlag = false;
                        this.$router.replace("/profile")
                    }else {
                        this.$dialog.notify.warning(resp.data.msg, {
                            position: 'top-right',
                            timeout: 3000
                        })
                        this.loadingFlag = false;
                    }
                }).catch(() => {
                    this.$dialog.confirm({
                        text: '请重新再试一下, 不行的话就关掉.',
                        title: '发生了错误',
                        actions: {
                            /*false: {
                                text: '取消',
                                handle: () => {
                                    this.loadingFlag = false;
                                }
                            },*/
                            true: {
                                color: 'red',
                                text: '确定',
                                handle: () => {
                                    this.loadingFlag = false;

                                    /*return new Promise(resolve => {
                                        setTimeout(resolve, 500)
                                    })*/
                                }
                            }
                        }
                    })
                })

            },
            ...mapMutations({
                setToken:'account/setToken'
            }),
            saveLogin(token){
                this.setToken(token);
            }

        },


    }
</script>

<style scoped>

</style>