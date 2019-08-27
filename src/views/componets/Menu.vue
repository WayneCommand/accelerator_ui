<template>
    <v-navigation-drawer
            clipped
            app
            expand-on-hover
            v-model="drawer"
    >
        <v-list
                nav
                dense
        >
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-account-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-title>首页</v-list-item-title>
            </v-list-item>
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-account-card-details</v-icon>
                </v-list-item-icon>
                <v-list-item-title>个人信息</v-list-item-title>
            </v-list-item>
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-shield-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>安全性</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "Menu",
        computed:{
            drawer:{
                get(){
                    return this.$store.state.layout.menu;
                },
                set(value){
                    this.$store.commit("setMenuDisplay", value);
                }
            }
        }
    }
</script>

<style scoped>

</style>