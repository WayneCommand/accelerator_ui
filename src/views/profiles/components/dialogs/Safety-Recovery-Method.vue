<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
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
                        <v-card color="grey lighten-1" class="mb-12" height="200px">
                            这里如果已经绑定了辅助手机将会 显示 现有的手机，
                            如果没有绑定 将会显示没有手机绑定
                        </v-card>
                        <v-btn color="primary" @click="rPhoneStep = 2">下一步</v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="rPhoneStep > 2" step="2">绑定到新手机</v-stepper-step>
                    <v-stepper-content step="2">
                        <v-card color="lighten-1" class="mb-12 elevation-0">
                            <v-card-text>
                                <v-text-field v-model="rPhone"
                                              :counter="32"
                                              label="新手机"
                                              placeholder="新手机"
                                              outlined required></v-text-field>
                            </v-card-text>
                        </v-card>
                        <v-btn color="primary" @click="rPhoneStep = 3">下一步</v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="rPhoneStep > 3" step="3">验证你的手机</v-stepper-step>
                    <v-stepper-content step="3">
                        <v-card color="lighten-1" class="mb-12 elevation-0">
                            <v-radio-group v-model="eCodeGroup">
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
                        <v-card color="grey lighten-1" class="mb-12" height="200px">
                            这里如果已经绑定了辅助邮箱将会 显示 现有的邮箱，
                            如果没有绑定 将会显示没有邮箱绑定
                        </v-card>
                        <v-btn color="primary" @click="rEmailStep = 2">下一步</v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="rEmailStep > 2" step="2">绑定到新邮箱</v-stepper-step>
                    <v-stepper-content step="2">
                        <v-card color="lighten-1" class="mb-12 elevation-0">
                            <v-card-text>
                                <v-text-field v-model="rEmail"
                                              :counter="32"
                                              label="新邮箱"
                                              placeholder="新邮箱"
                                              outlined required></v-text-field>
                            </v-card-text>
                        </v-card>
                        <v-btn color="primary" @click="rEmailStep = 3">下一步</v-btn>
                    </v-stepper-content>

                    <v-stepper-step :complete="rEmailStep > 3" step="3">验证你的邮箱</v-stepper-step>
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
                        <v-btn color="primary" @click="rEmailStep = 4">下一步</v-btn>
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
            }
        },
        methods:{
            ...mapMutations({
                setEditorDialog: 'safety/setSafetyRecoverMethodEditorDialog'
            }),
            closeEditorDialog:function () {
                this.setEditorDialog(false);
            }
        },
        computed:{
            ...mapState({
                dialog: state => state.safety.safetyRecoverMethodEditorDialog,
                editorType: state => state.safety.safetyEditorType
            }),

        }
    }
</script>

<style scoped>

</style>