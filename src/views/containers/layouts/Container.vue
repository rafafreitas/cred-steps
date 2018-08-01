<template>
    <div>
        <v-toolbar app class="toolbar-main">
            <img class="toolbar-img" src="../../../assets/clinical.jpg">
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-content>
            <v-slide-y-transition mode="out-in">
                <router-view/>
            </v-slide-y-transition>
        </v-content>
    </div>
</template>

<script>
    export default {
        name: "container",
        data () {
            return {
                title: ''
            }
        }
    }
</script>

<style scoped lang="scss">
    .toolbar-main{
        color: #fff;
        /*background-color: #02a099;*/
        background-color: #154456;
    }
    .toolbar-img{
        max-width: 169px;
    }
</style>