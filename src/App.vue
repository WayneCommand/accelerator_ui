<template>

  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>一方</span>
        <span class="font-weight-light">通行</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <Login></Login>
    </v-content>
  </v-app>
</template>

<script>
import Login from "./views/Login";

export default {
  name: 'App',
  components: {
    Login
  },
  data: () => ({
  }),
};
</script>
