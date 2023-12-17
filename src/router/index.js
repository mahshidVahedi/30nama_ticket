import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/default/Default.vue';
import Home from '@/views/Home.vue';
import CinemaList from '../components/cinemas/CinemaList.vue';
// import NotFound from '@/views/NotFound.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: '/cinemaList',
        name: 'CinemaList',
        component: CinemaList,
      },
      // {
      //   path: '/:catchAll(.*)', // 404 error route
      //   name: 'NotFound',
      //   component: NotFound,
      // },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
