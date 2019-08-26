<template>
  <v-app>
    <router-view name="navigation"></router-view>
    <router-view name="header"></router-view>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
  }),
  methods:{
  }
};


</script>
