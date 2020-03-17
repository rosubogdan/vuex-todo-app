import firebase from 'firebase/app';
import Vue from 'vue';
import Router from 'vue-router';
import { ROUTES } from './routes';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...ROUTES,
  ],
});

router.beforeEach((to, from, next): void => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some((record): boolean => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next({ path: '/login' });
  } else if (requiresAuth && !currentUser) {
    next({ path: '/' });
  } else { next(); }
});

export default router;
