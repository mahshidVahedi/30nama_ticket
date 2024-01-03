import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/layouts/default/Default.vue';
import Home from '@/views/Home.vue';
import Cinemas from '@/views/Cinemas.vue'
import Login from '@/components/Login/Login'
import Register from '@/components/Login/Register'
import Cinema from '@/views/Cinema.vue'
import Film from '@/views/Film.vue'
import Payment from '@/views/Payment.vue'
import Ticket from '@/views/Ticket.vue'
import SeatSelect from '@/components/common/SeatSelect.vue'
import VerifyLogin from '@/components/Login/VerifyLogin'
import VerifySignUp from '@/components/Login/VerifySignUp'


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
        path: '/cinema-list',
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
        path: '/verify_login/:uuid',
        name: 'VerifyLogin',
        component: VerifyLogin,
        props: true
      },
      {
        path: '/verify_signUp/:uuid',
        name: 'VerifySignUp',
        component: VerifySignUp,
        props: true
      },
      {
        path: '/cinemas/:id',
        name: 'Details',
        component: Cinema,
        props: true
      },
      {
        path: '/cinemas/:id/payment',
        name:'Payment',
        component: Payment,
        props:true
      },
      {
        path: '/:id',
        name: 'Film',
        component: Film,
        props: true
      },
      {
        path:'/:id/payment',
        name:'Payment',
        component: Payment,
        props:true
      },{
      path:'/ticket',
      name:'Ticket',
      component:Ticket
      },
      {
        path: '/:id/seatSelect',
        name: 'SeatSelect',
        component: SeatSelect,
        props: true
      },
      {
        path: '/cinemas/:id/SeatSelect',
        name: 'SeatSelect',
        component: SeatSelect,
        props: true
      }

    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
