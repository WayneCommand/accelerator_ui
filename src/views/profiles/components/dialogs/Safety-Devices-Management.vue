<template>
    <div>
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
        <v-row justify="center">
            <v-dialog v-model="editNameDialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">编辑设备名</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field label="设备名" required v-model="editDeviceName"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeEditDeviceNameDialog">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="saveDeviceName">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
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
                editNameDialog: false,
                editDeviceId: "",
                editDeviceName: ""
            };
        },
        methods: {
            ...mapMutations({
                setEditorDialog: 'safety/setSafetyDevicesEditorDialog'
            }),
            closeEditorDialog() {
                this.setEditorDialog(false);
            },
            closeEditDeviceNameDialog(){
                this.editNameDialog = false;
                this.loadDevicesData();
            },
            saveDeviceName(){
                api.mySafety.updateDeviceName({
                    deviceId: this.editDeviceId,
                    deviceName: this.editDeviceName
                })
                    .then(() => {
                        this.closeEditDeviceNameDialog();
                    });
            },
            loadDevicesData(){
                api.mySafety.devices()
                    .then(resp => {
                        if (resp.data.state === 'success') {
                            let _devices = resp.data.devices
                            _devices.forEach(dev => {
                                dev.del = dId => {
                                    this.$dialog.confirm({
                                        text: '确定要删除这个设备吗？',
                                        title: '非常危险',
                                        actions: {
                                            false: {
                                                text: '取消',
                                                handle: () => {
                                                    return true;
                                                }
                                            },
                                            true: {
                                                color: 'red',
                                                text: '确定',
                                                handle: () => {
                                                    new Promise(resolve => {
                                                        api.mySafety.deleteDevice({deviceId:dId})
                                                            .then(resp => {
                                                                if (resp.data.state === "success"){
                                                                    resolve();
                                                                    this.$dialog.message.success("已完成请求。")
                                                                }else {
                                                                    this.$dialog.message.error(resp.data.msg ? resp.data.msg : "未能成功执行该操作。");
                                                                }
                                                            })
                                                    })
                                                }
                                            }
                                        }
                                    })
                                }
                                dev.edit = device => {
                                    this.editDeviceId = device.deviceId;
                                    this.editDeviceName = device.deviceName;
                                    this.editNameDialog = true;
                                }
                            })
                            this.devices = _devices;
                        }
                    });
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
                    this.loadDevicesData();
                }
            }
        }
    };
</script>

<style scoped>

</style>