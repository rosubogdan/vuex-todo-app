export const ROUTES = [
  {
    path: '*',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'fas fa-sign-in-alt',
    component: (): any => import('@/views/Login.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'fas fa-users',
    component: (): any => import('@/views/Register.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/',
    name: 'Home',
    icon: 'fas fa-home',
    component: (): any => import('@/views/Home.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/todos',
    name: 'Todos',
    icon: 'far fa-check-circle',
    component: (): any => import('@/views/Todos.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/buy',
    name: 'Buy list',
    icon: 'fas fa-cart-arrow-down',
    component: (): any => import('@/views/Buy.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    icon: 'fas fa-users-cog',
    component: (): any => import('@/views/Profile.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];
