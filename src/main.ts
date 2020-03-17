// * Firebase
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// * Vue
import Vue from 'vue';
import Vuelidate from 'vuelidate';

// * Dependencies
import BootstrapVue from 'bootstrap-vue';
import VueMoment from 'vue-moment';
import 'vue-loading-overlay/dist/vue-loading.css';

// * Components
import App from '@/App.vue';

import router from '@/router';
import store from '@/store';

import '@/registerServiceWorker';
import { firebaseConfig } from '@/config/auth.config';

firebase.initializeApp(firebaseConfig);
export const db: any = firebase.firestore();

Vue.config.productionTip = false;
Vue.use(BootstrapVue, Vuelidate, VueMoment);

let app: any = '';

firebase.auth().onAuthStateChanged((): void => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');

  }
});
