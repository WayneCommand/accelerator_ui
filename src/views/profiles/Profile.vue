<template>
    <v-content>
        <MyInfo></MyInfo>
        <!--<Safety></Safety>-->
        <!--<Main></Main>-->
    </v-content>
</template>

<script>
    import MyInfo from "./components/MyInfo";
    import Safety from "./components/Safety";
    import Main from "./components/Main";
    export default {
        name: "Profile",
        components:{
            MyInfo,
            Safety,
            Main
        }
    }
</script>

<style scoped>

</style>