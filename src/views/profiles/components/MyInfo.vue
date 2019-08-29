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
                            <v-img src="https://blog.inmind.ltd/files/logo"></v-img>
                        </v-list-item-avatar>



                    </v-list-item>

                    <v-divider inset></v-divider>

                    <v-list-item @click="">
                        <v-list-item-content>
                            <v-list-item-title>昵称</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-title>shenlanAZ</v-list-item-title>
                        </v-list-item-content>

                    </v-list-item>

                    <v-divider inset></v-divider>

                    <v-list-item @click="">
                        <v-list-item-content>
                            <v-list-item-title>密码</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-title>******</v-list-item-title>
                            <v-list-item-subtitle>上次更改密码:2020/10/1</v-list-item-subtitle>
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
                    <v-list-item @click="">
                        <v-list-item-content>
                            <v-list-item-title>电子邮件</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-title>shenlanluck@gmail.com</v-list-item-title>
                            <v-list-item-title>shenlan@inhyper.com</v-list-item-title>
                        </v-list-item-content>

                    </v-list-item>

                    <v-divider inset></v-divider>

                    <v-list-item @click="">
                        <v-list-item-content>
                            <v-list-item-title>电话</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-content>
                            <v-list-item-title>1230000000</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "MyInfo"
    }
</script>

<style scoped>

</style>