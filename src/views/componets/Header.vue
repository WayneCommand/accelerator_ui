<template>
    <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-layout row justify-center align-center class="rows">
            <v-toolbar-title class="headline text-uppercase">
                <span>一方</span>
                <span class="font-weight-light">通行</span>
            </v-toolbar-title>
            <!--<v-flex shrink>Hello World</v-flex>-->
        </v-layout>
    </v-app-bar>
</template>

<script>
    import {mapMutations,mapState} from "vuex";

    export default {
        name: "Header",
        computed: {
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
        methods: {
            ...mapMutations({
                setMenuDisplay: 'layout/setMenu'
            }),

        }
    }
</script>

<style scoped>

</style>