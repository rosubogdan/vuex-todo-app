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
  },
  {
    path: '/register',
    name: 'Register',
    icon: 'fas fa-users',
    component: () => import('@/views/Register.vue'),
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

export const CONTENT_ROUTES = {
  REGISTER: {
    path: '/register',
    name: 'Register',
  },
  LOGIN: {
    path: '/login',
    name: 'Login',
  },
  LOGOUT: {
    path: '/logout',
    name: 'Logout',
  },
  HOME: {
    path: '/',
    name: 'Home',
  },
  TODOS: {
    path: '/todos',
    name: 'Todos',
  },
  BUY: {
    path: '/buy',
    name: 'Buy list',
  },
};

export const LOGGED_IN_ROUTES = ROUTES.filter(
  (route) => route.path !== CONTENT_ROUTES.LOGIN.path && route.path !== CONTENT_ROUTES.REGISTER.path && route.path !== '*',
);

export const LOGGED_OUT_ROUTES = ROUTES.filter(
  (route) => route.path === CONTENT_ROUTES.LOGIN.path || route.path === CONTENT_ROUTES.REGISTER.path,
);
