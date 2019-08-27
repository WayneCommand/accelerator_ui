<template>
    <v-app>
        <v-fade-transition>
            <router-view name="navigation"></router-view>
        </v-fade-transition>
        <v-fade-transition>
            <router-view name="header"></router-view>
        </v-fade-transition>
        <v-fade-transition>
            <router-view></router-view>
        </v-fade-transition>
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
