import '@babel/polyfill'
import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'


Vue.config.productionTip = false

Vue.use(Vuetify, {
    theme: {
        primary: '#C1543D',
        secondary: '#b0bec5',
        accent: '#FDC683',
        error: '#b71c1c'
    }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
