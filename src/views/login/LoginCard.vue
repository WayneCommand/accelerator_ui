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
                                    v-on="on"
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
                                                :rules="[rules.required, rules.min]"
                                                :type="show1 ? 'text' : 'password'"
                                                name="password"
                                                label="密码"
                                                hint="至少6个字符"
                                                counter
                                                @click:append="show1 = !show1"
                                                placeholder="密码"
                                                outlined></v-text-field>
                                    </v-container>
                                    <v-btn
                                            color="primary"
                                            @click="goLogin"
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
    export default {
        name: "LoginCard",
        data: function () {
            return {
                loginStep: 0,
                name: "",
                password: "",
                loadingFlag: false,
                show1: false,
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 6 || 'Min 6 characters',
                },
            };
        },
        methods: {
            goLogin: function () {
                this.loadingFlag = true;
                this.$post("http://localhost:9090/login/byPassword",{"username":this.name,"password":this.password})
                    .then(resp => {
                        console.log(resp);
                        this.loadingFlag = false;
                    })

            }
        }
    }
</script>

<style scoped>

</style>