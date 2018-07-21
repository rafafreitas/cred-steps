import Contato from '../layouts/Contato';
import Page404 from '../layouts/404';

export default [
    {
        name: 'Contato',
        path: '/contato',
        component: Contato,
        meta: {
            auth: false,
            userType: null
        }
    },
    { // Always leave this as last one
        path: '*',
        component: Page404
    }
]
