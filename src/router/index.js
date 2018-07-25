import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import routes from './routes'

Vue.use(VueRouter)

const Router = new VueRouter({
    // mode: 'history',
    routes
})


Router.beforeEach((to, from, next) => {
    console.log('Check Routers')
    console.log('Store - isAuth', store.getters.isAuth)

    let requiresAuth = to.meta.auth
    let currentUser = store.getters.isAuth;

    if (requiresAuth && currentUser) {
        console.log('Authorized route')
        next()

    } else if (requiresAuth && !currentUser) {
        console.log('Unauthorized route')
        next({path: '/login'})

    }else {
        console.log('Authorized route')
        next()
    }

})

export default Router
