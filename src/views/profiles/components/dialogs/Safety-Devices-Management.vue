<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay persistent transition="dialog-bottom-transition">
        <v-card>

            <v-toolbar dark color="primary">
                <v-btn icon dark @click="closeEditorDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>管理设备</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                </v-toolbar-items>
            </v-toolbar>

            <v-container fluid>
                <v-card class="d-flex align-content-start flex-wrap"
                        flat
                        tile
                        min-height="200">
                    <DeviceCard v-for="device in devices"
                                :key="device.deviceId"
                                :device-id="device.deviceId"
                                :device-name="device.deviceName"
                                :device-version="device.deviceVersion"
                                :device-system="device.deviceSystem"
                                :device-type="device.deviceType"
                                :device-model="device.deviceModel"
                                :ip="device.ip"
                                :location="device.location"
                                :del="device.del"
                                :edit="device.edit"
                    ></DeviceCard>
                </v-card>
            </v-container>
            <v-divider></v-divider>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapMutations,mapState} from 'vuex'
    import DeviceCard from "../../../componets/profile/DeviceCard";
    import api from "../../../../api";

    export default {
        name: "Safety-Devices-Management",
        components: {DeviceCard},
        created() {
        },
        data: function () {
            return {
                devices: [],
            };
        },
        methods: {
            ...mapMutations({
                setEditorDialog: 'safety/setSafetyDevicesEditorDialog'
            }),
            closeEditorDialog() {
                this.setEditorDialog(false);
            }
        },
        computed: {
            ...mapState({
                dialog: state => state.safety.safetyDevicesEditorDialog,
            }),
        },
        watch:{
            dialog(val){
                if (val){
                    api.mySafety.devices()
                        .then(resp => {
                            if (resp.data.state === 'success') {
                                let _devices = resp.data.devices
                                _devices.forEach(dev => {
                                    dev.del = () => {
                                    }
                                    dev.edit = () => {
                                    }
                                })
                                this.devices = _devices;
                            }
                        });
                }
            }
        }
    };
</script>

<style scoped>

</style>