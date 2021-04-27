<template>
    <v-card class="ma-2" max-width="450px">
        <v-list-item>
            <v-list-item-avatar>
                <v-icon>{{ DEVICE_MODEL[deviceModel] || "mdi-spin mdi-orbit"}}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="headline">设备名: {{deviceName}}</v-list-item-title>
                <v-list-item-subtitle>设备类型：{{deviceType}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-card-text>
            操作系统: {{deviceSystem}} <br>
            设备类型: {{deviceModel}} <br>
            版本号: {{deviceVersion}}  <br>
            IPv4: {{ip}}  <br>
            位置: {{location}}
        </v-card-text>

        <v-card-actions>
            <v-btn
                    text
                    color="red accent-4"
                    @click="del(deviceId)"
            >
                Delete
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                    icon
            @click="edit({deviceId,deviceName})">
                <v-icon>mdi-pen</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
const DEVICE_MODEL = {
  "windows":"mdi-laptop-windows",
  "macbook":"mdi-laptop-mac",
  "ios":"mdi-cellphone-iphone",
  "android":"mdi-cellphone-android",
  "firefox":"mdi-firefox",
  "chrome":"mdi-google-chrome",
  "edge-chromium":"mdi-microsoft-edge",
  "edge":"mdi-microsoft-edge-legacy",
  "safari":"mdi-apple-safari",
}

export default {
    name: "DeviceCard",
    props: {
        deviceId: String,
        deviceName: String,
        deviceType: String,
        deviceModel: String,
        deviceSystem: String,
        deviceVersion: String,
        ip: String,
        location: String,
        del: Function,
        edit: Function
    },
    data () {
        return{
          DEVICE_MODEL
        }
    }
}
</script>

<style scoped>

</style>