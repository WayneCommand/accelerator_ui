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
            <v-list-item link to="/profile/main">
                <v-list-item-icon>
                    <v-icon>mdi-account-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-title>首页</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/profile/myinfo">
                <v-list-item-icon>
                    <v-icon>mdi-card-account-details</v-icon>
                </v-list-item-icon>
                <v-list-item-title>个人信息</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/profile/safety">
                <v-list-item-icon>
                    <v-icon>mdi-shield-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>安全性</v-list-item-title>
            </v-list-item>
          <v-list-item link to="/policies">
            <v-list-item-icon>
              <v-icon>mdi-shield-account-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>隐私政策</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import {mapMutations,mapState} from "vuex";

    export default {
        name: "Menu",
        computed:{
            drawer:{
                get(){
                    return this.menu;
                },
                set(value){
                    this.setMenuDisplay(value);
                }
            },
            ...mapState({
                menu: state => state.layout.menu
            })
        },
        methods:{
            ...mapMutations({
                setMenuDisplay: 'layout/setMenu'
            }),


        }
    }
</script>

<style scoped>

</style>