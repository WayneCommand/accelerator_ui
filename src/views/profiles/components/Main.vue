<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md8>
            <!-- 标题 待优化 -->
            <v-card class="mx-auto my-5 elevation-10">
                <v-flex text-center>
                    <v-avatar size="128" class="my-4">
                        <v-img :src="avatar"></v-img>
                    </v-avatar>
                    <h1 class="font-weight-regular py-3">欢迎使用，{{nickname}}</h1>
                    <h4 class="font-weight-light py-3">管理自己的信息、隐私权和安全，从而让 Accelerator 更好地为您服务。</h4>
                </v-flex>
            </v-card>

            <!-- 发现安全性问题 -->
            <v-card
                    class="mx-auto my-5"
            >
                <v-card-title>发现安全性问题</v-card-title>
                <v-card-text>立即解决这些问题，保护您的帐号。</v-card-text>
                <v-list>
                    <v-list-item v-ripple>
                        <v-list-item-content>
                            <v-list-item-title>确保账号安全</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import api from "../../../api";
    import {mapMutations,mapState} from 'vuex';

    export default {
        name: "Main",
        created() {
            api.myHomePage.myHomePage()
                .then(resp => {
                    if (resp.data.state === "success") {
                        this.setUser(resp.data.homePage.userProfile);

                    } else {
                        this.$dialog.notify.warning(resp.data.msg, {
                            position: 'top-right',
                            timeout: 3000
                        })
                    }
                });
        },
        data: function () {
            return{

            }
        },
        methods:{
            ...mapMutations({
                setUser: 'account/setUser'
            })
        },
        computed:{
            ...mapState({
                nickname: state => state.account.user.nickname,
                avatar: state => state.account.user.avatar,
            })
        }
    }
</script>

<style scoped>

</style>