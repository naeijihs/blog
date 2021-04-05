import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/user',
    name: 'User',
    component: () =>
      import(/* webpackChunkName: "user" */ '../views/User.vue'),
  },
  {
    path: '/add',
    name: 'Add',
    component: () =>
      import(/* webpackChunkName: "add" */ '../views/Add.vue'),
  },
  {
    props:true,
    path: '/modify/:id',
    name: 'Modify',
    component: () =>
      import(/* webpackChunkName: "modify" */ '../views/Modify.vue'),
  },
  {
    props:true,
    path: '/detail/:id',
    name: 'Detail',
    component: () =>
      import(/* webpackChunkName: "detail" */ '../views/Detail.vue'),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
