import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import TODOS from '@/store/modules/todos';
import AUTH from '@/store/modules/auth';

import { STORE_AUTH_MODULE } from '@/constants';
// import { STORE_TODOS_MODULE } from '@/constants';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  plugins: [createPersistedState({
    paths: [`${STORE_AUTH_MODULE}.isLoggedIn`, `${STORE_AUTH_MODULE}.user`],
  })],
  modules: {
    TODOS,
    AUTH,
  },
});
