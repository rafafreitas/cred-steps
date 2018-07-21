// import {routes as Container} from '../views/containers'
import {routes as Public} from '../views/publics'

export default [
    {
        path: '/',
        redirect: {
            name: 'Home'
        }
    },
    ...Public
]
