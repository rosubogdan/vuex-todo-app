import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import modules from './modules';

import { STORE_AUTH_MODULE, STORE_TODOS_MODULE } from '@/constants';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  plugins: [createPersistedState({
    paths: [`${STORE_AUTH_MODULE}.isLoggedIn`, `${STORE_AUTH_MODULE}.user`],
  })],
  modules,
  actions: {
    RESET_ALL({ commit }) {
      Object.keys(modules).forEach((moduleName) => {
        commit(`${moduleName}/RESET_MUTATION`);
      });
    },
  },
});
