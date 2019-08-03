<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
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
                        <v-text-field v-model="name" :counter="10" :rules="nameRules" label="用户名" required></v-text-field>
                        <v-text-field v-model="password"
                                      :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                      :rules="[rules.required, rules.min]"
                                      :type="show1 ? 'text' : 'password'"
                                      name="password"
                                      label="密码"
                                      hint="至少8个字符"
                                      counter
                                      @click:append="show1 = !show1"></v-text-field>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" disabled>login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>


</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                show1:false,
                rules:{
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    emailMatch: () => ('The email and password you entered don\'t match'),
                }
            }
        }
    }
</script>

<style scoped>

</style>