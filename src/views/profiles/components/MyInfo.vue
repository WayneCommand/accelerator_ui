<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md8>
            <!-- 标题 待优化 -->
            <v-card class="mx-auto my-5 elevation-10">
                <v-flex text-center>
                    <h1 class="font-weight-regular py-3">个人信息</h1>
                    <h4 class="font-weight-light py-3">您在 Accelerator 服务中使用的基本信息，例如您的姓名和照片</h4>
                </v-flex>


            </v-card>

            <!-- 个人资料卡 -->
            <v-card
                    class="mx-auto my-5"
            >
                <v-card-title>个人资料</v-card-title>
                <v-card-text>使用 Accelerator 服务的其他用户可能会看到部分信息。</v-card-text>
                <v-list>
                    <v-list-item @click="">
                        <v-list-item-content>
                            <v-list-item-title>头像</v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-content>
                            <v-list-item-subtitle>更改照片可帮助您个性化账号</v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-avatar size="64">
                            <v-img :src="avatar"></v-img>
                        </v-list-item-avatar>



                    </v-list-item>

                    <v-divider inset></v-divider>

                    <v-list-item @click="openEditor('nickname')">
                        <v-list-item-content>
                            <v-list-item-title>昵称</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-title v-if="nickname">{{nickname}}</v-list-item-title>
                            <v-list-item-subtitle v-if="!nickname">设置你的昵称</v-list-item-subtitle>
                        </v-list-item-content>

                    </v-list-item>

                    <v-divider inset></v-divider>

                    <v-list-item @click="openPasswordEditor">
                        <v-list-item-content>
                            <v-list-item-title>密码</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-title>******</v-list-item-title>
                            <v-list-item-subtitle v-if="passwordModifyTime !== null">上次更改密码: {{passwordModifyTime}}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>

            <!-- 联系信息卡 -->
            <v-card
                    class="mx-auto my-5"
            >
                <v-card-title>联系信息</v-card-title>
                <v-list>
                    <v-list-item @click="openEditor('email')">
                        <v-list-item-content>
                            <v-list-item-title>电子邮件</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-title v-for="email of emails" :key="email">{{email}}</v-list-item-title>
                            <v-list-item-subtitle v-if="emails.length === 0">添加电子邮件</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider inset></v-divider>

                    <v-list-item @click="openEditor('phone')">
                        <v-list-item-content>
                            <v-list-item-title>电话</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-title v-for="phone of phones" :key="phone">{{phone}}</v-list-item-title>
                            <v-list-item-subtitle v-if="phones.length === 0">添加手机号码</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-flex>
        <InfoEditDialog></InfoEditDialog>
        <PasswordEditDialog></PasswordEditDialog>
    </v-layout>
</template>

<script>
    import api from "../../../api";
    import {mapState,mapMutations} from 'vuex'
    import InfoEditDialog from "./dialogs/Info-Edit-Dialog";
    import PasswordEditDialog from "./dialogs/Password-Edit-Dialog";

    export default {
        name: "MyInfo",
        components: {PasswordEditDialog, InfoEditDialog},
        created() {
            new Promise(resolve => {

                api.myInfo.myInfo()
                .then(resp =>{
                    if (resp.data.state === "success"){
                        this.loadData(resp.data.info);
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
            return{
                nickname: "",
                avatar: "",
                passwordModifyTime: "",
                emails: [],
                phones: []
            }
        },
        methods: {
            ...mapMutations({
                setEditorDialog: 'myinfo/setInfoEditorDialog',
                setEditorType: 'myinfo/setInfoEditorType',
                setPasswordEditorDialog: 'account/setPasswordEditorDialog'
            }),
            loadData: function (data) {
                this.nickname = data.userProfile.nickname;
                this.avatar = data.userProfile.avatar;
                this.emails = data.emails;
                this.phones = data.phones;
                this.passwordModifyTime = data.passwordModifyTime;
            },
            openEditor:function (module) {
                this.setEditorType(module);
                this.setEditorDialog(true);
            },
            openPasswordEditor(){
                this.setPasswordEditorDialog(true);
            }

        },
        computed:{
            ...mapState({
                infoNicknameDialog: state => state.myinfo.dialog
            })
        }

    }
</script>

<style scoped>

</style>