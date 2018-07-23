import '@babel/polyfill'
import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuetify, {
    theme: {
        primary: '#3868c1',
        secondary: '#c55dbb',
        accent: '#41fd4f',
        error: '#b74343'
    }
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
}).$mount('#app')
