import '@babel/polyfill'
import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import money from  './directives/v-money'
import Validator from './validations'
import VueTheMask from 'vue-the-mask'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from './helpers/mixin'

// Vue.config.productionTip = false
Vue.config.productionTip = process.env.NODE_ENV === 'development'
Vue.use(Validator);
Vue.use(VueTheMask)
Vue.use(money);
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
    mixins: [mixin],
    router,
    store,
    render: h => h(App)
}).$mount('#app')
