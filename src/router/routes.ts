export const ROUTES = [
  {
    path: '*',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'fas fa-sign-in-alt',
    component: () => import('@/views/Login.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'fas fa-users',
    component: () => import('@/views/Register.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/',
    name: 'Home',
    icon: 'fas fa-home',
    component: () => import('@/views/Home.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/todos',
    name: 'Todos',
    icon: 'far fa-check-circle',
    component: () => import('@/views/Todos.vue'),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/buy',
    name: 'Buy list',
    icon: 'fas fa-cart-arrow-down',
    component: () => import('@/views/Buy.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];
