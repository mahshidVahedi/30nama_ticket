import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/default/Default.vue';
import Home from '@/views/Home.vue';
import Cinemas from '@/views/Cinemas.vue'
import Login from '@/components/Login/Login'
import Register from '@/components/Login/Register'
import Verify from '@/components/Login/Verify'
import Cinema from '@/views/Cinema.vue'
import Film from '@/views/Film.vue'
import Payment from '@/views/Payment.vue'
import Ticket from '@/views/Ticket.vue'

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
        path: '/cinemas',
        name: 'Cinemas',
        component: Cinemas,
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
      },
      {
        path: '/register',
        name: 'Register',
        component: Register,
      },
      {
        path: '/verify/:data',
        name: 'Verify',
        component: Verify,
        props: true
      },

      {
        path: '/details/:id',
        name: 'Details',
        component: Cinema,
        props: true
      },
      {
        path: '/details/:cinema/payment',
        name:'Payment',
        component: Payment,
        props:true
      },
      {
        path: '/:film',
        name: 'Film',
        component: Film,
        props: true
      },
      {
        path:'/:film/payment',
        name:'Payment',
        component: Payment,
        props:true
      },{
      path:'/ticket',
      name:'Ticket',
      component:Ticket
      }
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
