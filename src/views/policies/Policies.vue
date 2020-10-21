<template>
  <v-main>
    <v-tabs fixed-tabs
            background-color="grey lighten-3"
            color="grey darken-4"
    >
      <v-tabs-slider color="grey darken-3"></v-tabs-slider>
      <v-tab>概述</v-tab>
      <v-tab>隐私政策</v-tab>
      <v-tab>服务条款</v-tab>
      <v-tab>技术</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <h2>隐私权政策</h2>
            <p>
              说明了我们会收集哪些信息、为什么收集这些信息，以及如何使用、审查并更新这些信息。
            </p>

            <h2>服务条款</h2>
            <p>
              其中介绍了您在使用我们的服务时需要同意的规则。
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <Privacy></Privacy>
      </v-tab-item>
      <v-tab-item>
        <Terms></Terms>
      </v-tab-item>
      <v-tab-item>
        <Technologies></Technologies>
      </v-tab-item>
    </v-tabs>
  </v-main>
</template>

<script>
import Privacy from "./components/Privacy";
import Technologies from "./components/Technologies";
import Terms from "./components/Terms";
export default {
  name: "Policies",
  components: {Terms, Technologies, Privacy}
}
</script>

<style scoped>

</style>