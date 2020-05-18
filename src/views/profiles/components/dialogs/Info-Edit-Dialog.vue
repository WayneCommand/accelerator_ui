<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>

            <v-toolbar dark color="primary">
                <v-btn icon dark @click="closeEditorDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>修改个人资料</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text @click="">保存</v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-container class="my-5" v-if="EditorType === 'nickname'">
                <v-subheader>定义别人看到你的名字</v-subheader>
                <v-flex sm5 md5 class="mx-5">
                    <v-text-field v-model="nickname"
                                  :counter="16"
                                  label="昵称"
                                  placeholder="昵称"
                                  outlined required></v-text-field>
                </v-flex>
            </v-container>
            <v-container class="my-5" v-if="EditorType === 'email'">
                <v-subheader>添加邮箱</v-subheader>
                <v-flex sm5 md5 class="mx-5">
                    <v-text-field v-model="email"
                                  :counter="16"
                                  label="邮箱"
                                  placeholder="example@inmind.ltd"
                                  outlined required></v-text-field>
                </v-flex>
            </v-container>
            <v-container class="my-5" v-if="EditorType === 'phone'">
                <v-subheader>添加手机</v-subheader>
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
    import {mapMutations,mapState} from 'vuex'

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
            closeEditorDialog:function () {
                this.setEditorDialog(false);
            }
        },
        computed:{
            ...mapState({
                dialog: state => state.myinfo.infoEditorDialog,
                EditorType: state => state.myinfo.infoEditorType,
            })
        }
    }
</script>

<style scoped>

</style>