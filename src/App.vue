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
import {deviceId} from './components/utils/access-utils'
export default {
    name: 'App',
    components: {},
    data: () => ({}),
    methods: {},
    created() {
        setTimeout(() => {
            deviceId().then(id => {
                localStorage.setItem("deviceId", id);
            })
        }, 500);
    }
};
</script>
