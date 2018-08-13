import Container from '../layouts/Container';
import {routes as pages} from '../../pages'

export default [
    {
        name: 'Container',
        path: '/',
        component: Container,
        children: [
            ...pages
        ]
    },
]
