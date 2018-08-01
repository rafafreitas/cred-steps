import Contato from '../layouts/Contato';
import Finish from '../layouts/Finish';

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
    {
        name: 'Finish',
        path: '/Finish',
        component: Finish,
        meta: {
            auth: false,
            userType: null
        }
    }
]
