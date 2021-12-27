/* eslint-disable indent */
/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ProductPage from '@/pages/ProductPage';

Vue.use(VueRouter);

const routers = [{
    name: 'main',
    component: MainPage,
    path: '/',
  },
  {
    name: 'product',
    component: ProductPage,
    path: '/product/:id',
  },
  {
    name: 'notFound',
    component: NotFoundPage,
    path: '*',
  },

];

const router = new VueRouter({
  routers,
});

export default router;
