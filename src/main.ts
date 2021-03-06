import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import Vue from 'vue';
import Vuelidate from 'vuelidate';

import App from '@/App.vue';
import BootstrapVue from 'bootstrap-vue';
import VueMoment from 'vue-moment';
import 'vue-loading-overlay/dist/vue-loading.css';

import router from '@/router';
import store from '@/store';

import '@/registerServiceWorker';
import { firebaseConfig } from '@/config/auth.config';

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

Vue.config.productionTip = false;
Vue.use(BootstrapVue, Vuelidate, VueMoment);

let app: any = '';

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');

  }
});
