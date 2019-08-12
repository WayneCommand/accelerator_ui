<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-fade-transition>
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
                        <v-container>
                            <v-slide-x-transition>
                                <v-card elevation="0" v-if="!usernameHide">
                                    <v-text-field v-model="name" :counter="10" label="用户名"
                                                  placeholder="用户名" outlined required></v-text-field>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" @click="goNextStep" :disabled="name.length === 0">next</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-slide-x-transition>
                            <!-- FIXME 这两个运动效果不和谐 -->
                            <v-slide-x-transition>
                                <v-card elevation="0" v-if="!passwordHide">
                                    <v-text-field
                                            v-if="!passwordHide"
                                            v-model="password"
                                            :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                            :rules="[rules.required, rules.min]"
                                            :type="show1 ? 'text' : 'password'"
                                            name="password"
                                            label="密码"
                                            hint="至少8个字符"
                                            counter
                                            @click:append="show1 = !show1"
                                            placeholder="密码"
                                            outlined></v-text-field>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary">登陆</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-slide-x-transition>
                        </v-container>
                    </v-card>
                </v-fade-transition>

            </v-flex>
        </v-layout>
    </v-container>


</template>

<script>
    export default {
        name: "Login",
        components: {},
        data: function () {
            return {
                usernameHide: false,
                passwordHide: true,
                name: "",
                password: "",
                nextStepFlag: false,
                loadingFlag: false,
                show1: false,
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                },
            };
        },
        methods: {
            goNextStep: function () {
                this.loadingFlag = true;
                this.usernameHide = true;
                this.passwordHide = false;
                this.loadingFlag = false;

            }
        }
    }
</script>

<style scoped>

</style>