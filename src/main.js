import '@babel/polyfill'
import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VeeValidate from 'vee-validate';
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VeeValidate);
Vue.use(Vuetify, {
    theme: {
        primary: '#02a099',
        secondary: '#154456',
        accent: '#02a099',
        error: '#b74343'
    }
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
}).$mount('#app')
