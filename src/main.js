import '@babel/polyfill'
import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import money from  './directives/v-money'
import VeeValidate from 'vee-validate';
import VueTheMask from 'vue-the-mask'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from './helpers/mixin'

Vue.config.productionTip = false

Vue.use(VeeValidate);
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
