const App = () => import('./App.vue');

const Show = () => import('./components/user/Show.vue');

export const routes = [
    {
        name: 'home',
        path: '/',
        component: App
    },
    {
        name: 'ShowUsers',
        path: '/users',
        component: Show
    }
]