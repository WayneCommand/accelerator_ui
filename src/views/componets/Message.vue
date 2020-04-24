<template>
    <div class="text-center">
        <v-dialog
                v-model="dialog"
                width="350"
        >
            <v-card>
                <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                >
                    {{ title }}
                </v-card-title>

                <v-card-text class="text-pos">
                    {{ text }}
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="primary"
                            text
                            @click="confirm"
                    >
                        {{ primaryBtn }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "Message",
        props:{
            dialog: Boolean,
            title: String,
            text: String,
            primaryBtn: String,
            confirmCall:Function
        },
        data(){
            return{



            }
        },
        methods: {
            confirm:function () {
                this.confirmCall();
            }
        }
    }
</script>

<style scoped>

    .text-pos{
        padding-top: 0.5em;
    }

</style>