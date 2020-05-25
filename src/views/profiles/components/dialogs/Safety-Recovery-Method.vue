<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay persistent transition="dialog-bottom-transition">
        <v-card>

            <v-toolbar dark color="primary">
                <v-btn icon dark @click="closeEditorDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>修改安全性</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                </v-toolbar-items>
            </v-toolbar>

            <v-container class="my-5" v-if="editorType === 'recoveryPhone'">
                <v-stepper v-model="rPhoneStep" vertical>
                    <v-stepper-step :complete="rPhoneStep > 1" step="1">
                        检视当前的辅助手机信息
                    </v-stepper-step>
                    <v-stepper-content step="1">
                        <v-card color="lighten-1" class="mb-12 elevation-0" >
                            <v-flex v-if="rPhone">
                                <v-card-title>请确认将要变更的辅助手机:</v-card-title>
                                <v-card-text>{{rPhone}}</v-card-text>
                            </v-flex>
                            <v-flex v-if="!rPhone">
                                <v-card-title>当前未绑定辅助手机，接下来我们会指引你完成这个操作。</v-card-title>
                            </v-flex>
                        </v-card>
                        <v-btn color="primary" @click="bindStep">下一步</v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="rPhoneStep > 2" step="2">绑定到新手机</v-stepper-step>
                    <v-stepper-content step="2">
                        <v-card color="lighten-1" class="mb-12 elevation-0">
                            <v-card-text>
                                <v-text-field v-model="rPhone"
                                              :counter="16"
                                              label="新手机"
                                              placeholder="新手机"
                                              :rules="[rules.required,rules.phone]"
                                              outlined required></v-text-field>
                            </v-card-text>
                        </v-card>
                        <v-btn color="primary" @click="verifyPhone">下一步</v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="rPhoneStep > 3" step="3">验证你的手机</v-stepper-step>
                    <v-stepper-content step="3">
                        <v-card color="lighten-1" class="mb-12 elevation-0">
                            <v-radio-group v-model="pCodeGroup">
                                <v-radio
                                        v-for="n in 4"
                                        :key="n"
                                        :label="`code ${n}`"
                                        :value="n"
                                ></v-radio>
                            </v-radio-group>
                        </v-card>
                        <v-btn color="primary" @click="rPhoneStep = 4">下一步</v-btn>
                    </v-stepper-content>

                    <v-stepper-step step="4">完成验证</v-stepper-step>
                    <v-stepper-content step="4">
                        <v-card color="lighten-1" class="mb-12 elevation-0">
                            <v-card-title>我们已经完成刚才的操作。</v-card-title>
                        </v-card>
                        <v-btn color="primary" @click="closeEditorDialog">完成</v-btn>
                    </v-stepper-content>
                </v-stepper>
            </v-container>
            <v-container class="my-5" v-if="editorType === 'recoveryEmail'">
                <v-stepper v-model="rEmailStep" vertical>
                    <v-stepper-step :complete="rEmailStep > 1" step="1">
                        检视当前的辅助邮箱信息
                    </v-stepper-step>
                    <v-stepper-content step="1">
                        <v-card color="lighten-1" class="mb-12 elevation-0">
                            <v-flex v-if="rEmail">
                                <v-card-title>请确认将要变更的辅助邮箱:</v-card-title>
                                <v-card-text>{{rEmail}}</v-card-text>
                            </v-flex>
                            <v-flex v-if="!rEmail">
                                <v-card-title>当前未绑定辅助邮箱，接下来我们会指引你完成这个操作。</v-card-title>
                            </v-flex>
                        </v-card>
                        <v-btn color="primary" @click="bindStep">下一步</v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="rEmailStep > 2" step="2">绑定到新邮箱</v-stepper-step>
                    <v-stepper-content step="2">
                        <v-card color="lighten-1" class="mb-12 elevation-0">
                            <v-card-text>
                                <v-text-field v-model="rEmail"
                                              :counter="32"
                                              label="新邮箱"
                                              placeholder="新邮箱"
                                              :rules="[rules.required,rules.email]"
                                              outlined required></v-text-field>
                            </v-card-text>
                        </v-card>
                        <v-btn color="primary" @click="verifyEmail">下一步</v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="rEmailStep > 3" step="3">验证你的邮箱</v-stepper-step>
                    <v-stepper-content step="3">
                        <v-card color="lighten-1" class="mb-12 elevation-0">
                            <v-radio-group v-model="eCodeGroup">
                                <v-radio
                                        v-for="verify in emailVerifyList"
                                        :key="verify.seq"
                                        :label="verify.code"
                                        :value="verify.seq"
                                ></v-radio>
                            </v-radio-group>
                        </v-card>
                        <v-btn color="primary" @click="updateSafetyRecoveryMethod">下一步</v-btn>
                    </v-stepper-content>

                    <v-stepper-step step="4">完成验证</v-stepper-step>
                    <v-stepper-content step="4">
                        <v-card color="lighten-1" class="mb-12 elevation-0">
                            <v-card-title>我们已经完成刚才的操作。</v-card-title>
                        </v-card>
                        <v-btn color="primary" @click="closeEditorDialog">完成</v-btn>
                    </v-stepper-content>
                </v-stepper>
            </v-container>

            <v-divider></v-divider>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapMutations,mapState} from 'vuex'
    import api from "../../../../api";

    export default {
        name: "Safety-Recovery-Method",
        data: function () {
            return{
                rPhoneStep: 1,
                rEmailStep: 1,
                rPhone:"",
                rEmail:"",
                eCodeGroup:1,
                pCodeGroup:1,
                emailVerifyList:[],
                rules:{
                    required: value => !!value || 'Required.',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                    },
                    phone: value => {
                        const pattern = /^\d{11}$/
                        return pattern.test(value) || 'Invalid phone.'
                    }
                }
            }
        },
        methods: {
            ...mapMutations({
                setEditorDialog: 'safety/setSafetyRecoverMethodEditorDialog'
            }),
            closeEditorDialog: function () {
                this.setEditorDialog(false);
            },
            bindStep: function () {
                switch (this.editorType) {
                    case 'recoveryPhone':
                        this.rPhoneStep = 2;
                        this.rPhone = "";
                        break;
                    case 'recoveryEmail':
                        this.rEmailStep = 2;
                        this.rEmail = "";
                        break;
                }
            },
            verifyPhone: function () {
                //正常操作是向后台发请求去验证手机 并返回验证码序列
                //这里因为没有那个能力 所以直接处理为跳过
                this.$dialog.confirm({
                    text: "非常抱歉，我们无法开始验证，本次验证将会跳过。",
                    title: 'CODE [MIKE-01]',
                    actions: {
                        false: {
                            text: '取消',
                            handle: () => {
                                this.rPhoneStep = 1;
                            }
                        },
                        true: {
                            color: 'red',
                            text: '确定',
                            handle: () => {
                                this.updateSafetyRecoveryMethod();
                            }
                        }
                    }
                })
            },
            verifyEmail: function () {
                api.mySafety.verifyRecoveryEmail({
                    recoveryEmail: this.rEmail
                }).then(resp =>{
                    if (resp.data.state === "success"){
                        this.emailVerifyList = resp.data.verifyCodes;
                        this.rEmailStep = 3;
                    }

                })
            },
            updateSafetyRecoveryMethod: function () {
                switch (this.editorType) {
                    case 'recoveryPhone':
                        api.mySafety.updateRecoveryPhone({
                            recoveryPhone: this.rPhone
                        }).then(resp => {
                            if (resp.data.state === "success"){
                                this.rPhoneStep = 4;
                            }else{
                                this.$dialog.notify.error(resp.data.msg);
                            }
                        });
                        break;
                    case 'recoveryEmail':
                        let verifyCode = this.emailVerifyList[this.eCodeGroup - 1];

                        api.mySafety.updateRecoveryEmail({
                            seq: verifyCode.seq,
                            code: verifyCode.code,
                            recoveryEmail: this.rEmail
                        }).then(resp => {
                            if (resp.data.state === "success"){
                                this.rEmailStep = 4;
                            }else{
                                this.$dialog.notify.error(resp.data.msg);
                            }
                        });
                        break;
                }
            },
            loadData:function () {
                this.rPhoneStep = 1;
                this.rEmailStep = 1;
                this.rPhone = "";
                this.rEmail = "";
                this.eCodeGroup = 1;
                this.pCodeGroup = 1;
                this.emailVerifyList = [];

                api.mySafety.mySafety()
                .then(resp => {
                    this.rPhone = resp.data.safety.userAccount.recoveryPhone;
                    this.rEmail = resp.data.safety.userAccount.recoveryEmail;
                })
            }
        },
        computed:{
            ...mapState({
                dialog: state => state.safety.safetyRecoverMethodEditorDialog,
                editorType: state => state.safety.safetyEditorType
            }),

        },
        watch:{
            dialog:function (val) {
                if (val){
                    this.loadData();
                }
            }
        }
    }
</script>

<style scoped>

</style>