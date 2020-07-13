<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md8>
            <!-- 标题 待优化 -->
            <v-card class="mx-auto my-5 elevation-10">
                <v-flex text-center>
                    <h1 class="font-weight-regular py-3">安全性</h1>
                    <h4 class="font-weight-light py-3">您在 Accelerator 服务中确保您帐号安全的设置和建议</h4>
                </v-flex>
            </v-card>

            <!-- 登陆卡 -->
            <v-card
                    class="mx-auto my-5"
            >
                <v-card-title>登陆 Accelerator</v-card-title>
                <v-list>
                    <v-list-item @click="openPasswordEditor">
                        <v-list-item-content>
                            <v-list-item-title>密码</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-subtitle v-if="passwordModifyTime">上次更改时间：{{passwordModifyTime}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider inset></v-divider>

                    <v-list-item @click="openLoginManagementEditor">
                        <v-list-item-content>
                            <v-list-item-title>使用您的手机登陆</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                            <v-icon :color="phoneToLogin === 1 ? '#1E88E5' : ''">{{switchIconConst[phoneToLogin] || "mdi-alert-circle"}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{switchTextConst[phoneToLogin] || "不可用"}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider inset></v-divider>

                    <v-list-item v-ripple>
                        <v-list-item-content>
                            <v-list-item-title>二步验证</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                            <v-icon>{{switchIconConst[twoStepVerify] || "mdi-alert-circle"}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{switchTextConst[twoStepVerify] || "不可用"}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

            <!-- 我们可用来验证您身份的方式 -->
            <v-card
                    class="mx-auto my-5"
            >
                <v-card-title>我们可用来验证您身份的方式</v-card-title>
                <v-card-text>这些信息可用于验证确实是您本人在登录，也可在您的帐号中有可疑活动时用来与您联系</v-card-text>
                <v-list>
                    <v-list-item @click="openRecoveryMethodEditor('recoveryPhone')">
                        <v-list-item-content>
                            <v-list-item-title>辅助电话号码</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-subtitle v-if="!recoveryPhone">添加辅助电话</v-list-item-subtitle>
                            <v-list-item-title v-if="recoveryPhone">{{recoveryPhone}}</v-list-item-title>
                        </v-list-item-content>

                    </v-list-item>

                    <v-divider inset></v-divider>

                    <v-list-item @click="openRecoveryMethodEditor('recoveryEmail')">
                        <v-list-item-content>
                            <v-list-item-title>辅助邮箱</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-subtitle v-if="!recoveryEmail">添加辅助邮箱</v-list-item-subtitle>
                            <v-list-item-title v-if="recoveryEmail">{{recoveryEmail}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

            <!-- 您的设备 -->
            <v-card
                    class="mx-auto my-5"
            >
                <v-card-title>您的设备</v-card-title>
                <v-card-text>您目前已在以下设备上登录 Accelerator 帐号</v-card-text>
                <v-list>
                    <Device v-for="deviceToken of deviceTokenList"
                            :key="deviceToken.deviceId"
                            :device-type="deviceToken.deviceType"
                            :device-name="deviceToken.deviceName"
                            :addr="deviceToken.location"
                            :current-device="deviceToken.currentDevice"
                            :func="deviceToken.func || function() {} "></Device>
                    <v-list-item v-ripple>
                        <v-list-item-content>管理设备</v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

            <!-- 登录其他网站 -->
            <v-card
                    class="mx-auto my-5"
            >
                <v-card-title>登录其他网站</v-card-title>
                <v-list>
                    <v-list-item v-ripple>
                        <v-list-item-content>
                            <v-list-item-title>使用 Accelerator 登陆</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-subtitle>您使用 Accelerator 账号登陆了1个网站或应用</v-list-item-subtitle>
                        </v-list-item-content>

                    </v-list-item>

                </v-list>
            </v-card>
            <PasswordEditDialog></PasswordEditDialog>
            <SafetyLoginManagement></SafetyLoginManagement>
            <SafetyRecoveryMethod></SafetyRecoveryMethod>
        </v-flex>
    </v-layout>
</template>

<script>
    import Device from "../../componets/profile/Device";
    import api from "../../../api";
    import PasswordEditDialog from "./dialogs/Password-Edit-Dialog";
    import {mapState,mapMutations} from 'vuex'
    import SafetyLoginManagement from "./dialogs/Safety-Login-Management";
    import SafetyRecoveryMethod from "./dialogs/Safety-Recovery-Method";

    export default {
        name: "Safety",
        components: {
            SafetyRecoveryMethod,
            SafetyLoginManagement,
            PasswordEditDialog,
            Device
        },
        created() {
            new Promise(resolve => {

                api.mySafety.mySafety()
                    .then(resp =>{
                        if (resp.data.state === "success"){
                            this.loadData(resp.data.safety);
                        }else {
                            this.$dialog.notify.warning(resp.data.msg, {
                                position: 'top-right',
                                timeout: 3000
                            })
                        }
                        resolve();
                    }).catch(() => {
                    resolve();
                })


            });
        },
        data:function () {
            return {
                passwordModifyTime: "",
                phoneToLogin:0,
                twoStepVerify:0,
                recoveryPhone:"",
                recoveryEmail:"",
                deviceTokenList: [
                    {
                        "deviceType": "windows",
                        "deviceName": "Surface Book 2",
                        "addr": "上海市徐汇区",
                        currentDevice: true,
                    },
                    {
                        "deviceType": "android",
                        "deviceName": "Samsung Note 9",
                        "addr": "日本东京市",
                        currentDevice: false,
                    },
                    {
                        "deviceType": "unknown",
                        "deviceName": "unknown",
                        "addr": null,
                        currentDevice: false,
                        func: () => {}
                    }
                ],
                switchTextConst: {
                    0: "关闭",
                    1: "已开启"
                },
                switchIconConst: {
                    0: "mdi-do-not-disturb",
                    1: "mdi-check-circle"
                },
            };
        },
        methods:{
            ...mapMutations({
                setPasswordEditorDialog: 'account/setPasswordEditorDialog',
                setLoginManagementDialog: 'safety/setSafetyLoginManagementEditorDialog',
                setSafetyEditorType: 'safety/setSafetyEditorType',
                setRecoverMethodEditorDialog: 'safety/setSafetyRecoverMethodEditorDialog'

            }),
            loadData(data){
                this.passwordModifyTime = data.userAccount.passwordModifyTime;
                this.phoneToLogin = data.userAccount.phoneToLogin;
                this.twoStepVerify = data.userAccount.twoStepVerify;
                this.recoveryPhone = data.userAccount.recoveryPhone;
                this.recoveryEmail = data.userAccount.recoveryEmail;
                this.deviceTokenList = data.deviceTokenList;
            },
            openPasswordEditor(){
                this.setPasswordEditorDialog(true);
            },
            openLoginManagementEditor(){
                this.setSafetyEditorType('phoneToLogin');
                this.setLoginManagementDialog(true);
            },
            openRecoveryMethodEditor(module){
                this.setSafetyEditorType(module);
                this.setRecoverMethodEditorDialog(true);
            }
        },
        computed:{
            ...mapState({

            })
        }
    }
</script>

<style scoped>

</style>