import Page404 from '../layouts/Page404';
import Home from '../layouts/Home';

export default [
    {
        name: 'Home',
        path: '/',
        component: Home,
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
