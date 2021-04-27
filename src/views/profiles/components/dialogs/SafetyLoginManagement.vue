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
                    <v-btn dark text v-ripple>保存</v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-container class="my-5" v-if="editorType === 'phoneToLogin'">
                <v-list three-line subheader>
                    <v-subheader>使用手机登录到Accelerator</v-subheader>
                    <v-list-item>
                        <v-list-item-action>
                            <v-switch v-model="phoneToLoginVal" inset></v-switch>
                        </v-list-item-action>
                        <v-list-item-content>

                            <v-list-item-title>使用手机登录</v-list-item-title>
                            <v-list-item-subtitle>当前绑定的手机为: xxx xxxx xxxx</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-container>
            <v-divider></v-divider>
        </v-card>
    </v-dialog>

</template>

<script>
    import {mapMutations,mapState} from 'vuex'


    export default {
        name: "safety-login-management",
        data:function () {
            return {
                phoneToLoginVal:false,

            }
        },
        methods:{
            ...mapMutations({
                setEditorDialog: 'safety/setSafetyLoginManagementEditorDialog'
            }),
            closeEditorDialog:function () {
                this.setEditorDialog(false);
            }
        },
        computed:{
            ...mapState({
                dialog: state => state.safety.safetyLoginManagementEditorDialog,
                editorType: state => state.safety.safetyEditorType
            }),

        }
    }
</script>

<style scoped>

</style>