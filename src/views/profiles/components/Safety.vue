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
                    <v-list-item @click="">
                        <v-list-item-content>
                            <v-list-item-title>密码</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-subtitle>上次更改时间：2020/10/1</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider inset></v-divider>

                    <v-list-item @click="">
                        <v-list-item-content>
                            <v-list-item-title>使用您的手机登陆</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                            <v-icon>mdi-do-not-disturb</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>关闭</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider inset></v-divider>

                    <v-list-item @click="">
                        <v-list-item-content>
                            <v-list-item-title>二步验证</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                            <v-icon>mdi-do-not-disturb</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>关闭</v-list-item-title>
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
                    <v-list-item @click="">
                        <v-list-item-content>
                            <v-list-item-title>辅助电话号码</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-subtitle>添加电话号码</v-list-item-subtitle>
                        </v-list-item-content>

                    </v-list-item>

                    <v-divider inset></v-divider>

                    <v-list-item @click="">
                        <v-list-item-content>
                            <v-list-item-title>辅助邮箱</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-title>shenlanluck@gmail.com</v-list-item-title>
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
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-laptop-windows</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Windows</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-title>
                                <v-icon>mdi-check-circle</v-icon>
                                此设备1
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider inset></v-divider>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-laptop</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>MacBook</v-list-item-title>
                            <v-list-item-subtitle>日本东京都 - 8月20日</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider inset></v-divider>

                    <v-list-item @click="">
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
                    <v-list-item @click="">
                        <v-list-item-content>
                            <v-list-item-title>使用 Accelerator 登陆</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-subtitle>您使用 Accelerator 账号登陆了1个网站或应用</v-list-item-subtitle>
                        </v-list-item-content>

                    </v-list-item>

                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "Safety"
    }
</script>

<style scoped>

</style>