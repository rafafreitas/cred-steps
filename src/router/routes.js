import {routes as Containers} from '../views/containers'
import {routes as Public} from '../views/publics'

export default [
    // {
    //     path: '/',
    //     redirect: {
    //         name: 'Formulario'
    //     }
    // },
    ...Public,
    ...Containers
]
