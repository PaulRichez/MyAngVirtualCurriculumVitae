import {
    createWebHistory,
    createRouter
} from 'vue-router'

import { myCvData } from '../assets/data/data';

import Home from '../views/home.vue';
import Resume from '../views/resume.vue';
import Portfolio from '../views/portfolio.vue';
import NotFound from '../views/notFound.vue';

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home,
        meta: {
            title: ''
        }
    },
    {
        name: 'resume',
        path: '/resume',
        component: Resume,
        meta: {
            title: ' - CV'
        }
    },
    {
        name: 'portfolio',
        path: '/portfolio',
        component: Portfolio,
        meta: {
            title: ' - Portfolio'
        }
    },
    {
        name:'',
        path: '/:pathMatch(.*)',
        component: NotFound,
        meta: {
            title: ' - Not Found'
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const userName = myCvData.user.lastName + " " + myCvData.user.firstName;

router.afterEach((to) => document.title = userName + to.meta.title);


export default router;