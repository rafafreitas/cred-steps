import Contato from '../layouts/Contato';
import Finish from '../layouts/Finish';

export default [
    {
        name: 'Formulario',
        path: '/formulario',
        component: Contato,
        meta: {
            auth: false,
            userType: null
        }
    },
    {
      name: 'Formulario2',
      path: '/formulario2',
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
