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

        },
        data(){
            return{
                dialog: true,
                title: "title",
                text: "oh. nothing :)",
                primaryBtn: "confirm"
            }
        },
        methods: {
            show(cb){
                typeof cb === 'function' && cb.call(this,this)
                return new Promise(resolve=>{
                    this.resolve = resolve
                })
            },
            confirm(){
                this.resolve('confirm')
                this.hide()
            },
            cancel(){
                this.resolve('cancel')
                this.hide()
            },
            hide(){
                this.dialog = false;
                document.body.removeChild(this.$el)
                this.$destroy()
            }
        }
    }
</script>

<style scoped>

    .text-pos{
        padding-top: 0.5em;
    }

</style>