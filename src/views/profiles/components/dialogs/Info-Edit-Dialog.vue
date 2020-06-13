<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay persistent transition="dialog-bottom-transition">
        <v-card>

            <v-toolbar dark color="primary">
                <v-btn icon dark @click="closeEditorDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>修改个人资料</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text @click="updateProfile">保存</v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-container class="my-5" v-if="editorType === 'nickname'">
                <v-subheader>定义别人看到你的名字</v-subheader>
                <v-flex sm5 md5 class="mx-5">
                    <v-text-field v-model="nickname"
                                  :counter="16"
                                  label="昵称"
                                  placeholder="昵称"
                                  outlined required></v-text-field>
                </v-flex>
            </v-container>
            <v-container class="my-5" v-if="editorType === 'email'">
                <v-subheader>修改邮箱</v-subheader>
                <v-flex sm5 md5 class="mx-5">
                    <v-text-field v-model="email"
                                  :counter="16"
                                  label="邮箱"
                                  placeholder="example@inmind.ltd"
                                  outlined required></v-text-field>
                </v-flex>
            </v-container>
            <v-container class="my-5" v-if="editorType === 'phone'">
                <v-subheader>修改手机</v-subheader>
                <v-flex sm5 md5 class="mx-5">
                    <v-text-field v-model="phone"
                                  :counter="15"
                                  label="手机"
                                  placeholder="手机"
                                  outlined required></v-text-field>
                </v-flex>
            </v-container>
            <v-divider></v-divider>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapMutations,mapState} from 'vuex';
    import api from "../../../../api";

    export default {
        name: "InfoEditDialog",
        data () {
            return {
                nickname: "",
                email:"",
                phone:""
            }
        },
        methods:{
            ...mapMutations({
                setEditorDialog: 'myinfo/setInfoEditorDialog'
            }),
            loadData(){
                api.myInfo.myInfo()
                .then(resp => {
                    let profile = resp.data.info.userProfile;

                    this.nickname = profile.nickname;
                    this.email = profile.email;
                    this.phone = profile.phone;
                })
            },
            closeEditorDialog:function () {
                this.setEditorDialog(false);
            },
            updateProfile:function () {
                let updateEntity = {};

                switch (this.editorType) {
                    case 'nickname' :
                        updateEntity.nickname = this.nickname;
                        break;
                    case 'email':
                        updateEntity.email = this.email;
                        break;
                    case 'phone':
                        updateEntity.phone = this.phone;
                        break;
                }

                api.myInfo.updateProfile(updateEntity)
                    .then(resp => {
                    if (resp.data.state === "success"){
                        this.closeEditorDialog();
                        this.$dialog.notify.success("我们已保存刚才的操作.");
                    }
                })

            }
        },
        computed:{
            ...mapState({
                dialog: state => state.myinfo.infoEditorDialog,
                editorType: state => state.myinfo.infoEditorType,
            })
        },
        watch:{
            dialog:function (val) {
                if (val)
                    this.loadData();
            }
        }
    }
</script>

<style scoped>

</style>