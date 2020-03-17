<template>
  <div class="navigation">
    <b-navbar toggleable="md"
              type="dark"
              variant="dark"
              fixed="top">
      <b-navbar-brand class="logo"
                      :title="APP.TITLE">
        <router-link :to="CONTENT_ROUTES.HOME.path">
          <i class="far fa-check-circle"></i>
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse"
                  is-nav>
        <b-navbar-nav class="ml-auto"
                      v-if="LOGIN_STATUS">
          <b-nav-item v-for="route in LOGGED_IN_ROUTES"
                      :key="route.path"
                      :to="route.path"
                      :title="route.name"
                      exact
                      exact-active-class="active">
            <i :class="route.icon"></i>
            <span class="d-sm-block d-md-none"> {{route.name}}</span>

          </b-nav-item>

          <b-nav-item @click="Logout"
                      :title="CONTENT_ROUTES.LOGOUT.name"
                      exact
                      exact-active-class="active">
            <i class="fas fa-sign-out-alt"></i>
            <span class="d-sm-block d-md-none"> {{CONTENT_ROUTES.LOGOUT.name}}</span>
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto"
                      v-else>
          <b-nav-item v-for="route in LOGGED_OUT_ROUTES"
                      :key="route.path"
                      :to="route.path"
                      :title="route.name"
                      exact
                      exact-active-class="active">
            <i :class="route.icon"></i>
            <span class="d-sm-block d-md-none"> {{route.name}}</span>
          </b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

  </div>
</template>

<script lang="ts">
  // * vue
  import { Component, Vue } from 'vue-property-decorator';
  import { mapGetters } from 'vuex';

  // * actions
  import { LOGOUT_ACTION } from '@/store/modules/auth/actions';

  // * getters
  import { LOGIN_STATUS } from '@/store/modules/auth/getters';

  // * routes
  import { ROUTES } from '@/router/routes';

  // * constants
  import {
    APP,
    CONTENT_ROUTES,
  } from '@/constants';

  // * component setup
  @Component({
    computed: mapGetters({ LOGIN_STATUS }),
  })
  export default class NavigationComponent extends Vue {
    // * private readonly
    private readonly APP: {} = APP;
    private readonly ROUTES: {} = ROUTES;
    private readonly CONTENT_ROUTES: {} = CONTENT_ROUTES;

    // * private
    private LOGGED_IN_ROUTES: any = [];
    private LOGGED_OUT_ROUTES: any = [];

    constructor() {
      super();
    }

    private created(): void {
      this.LOGGED_IN_ROUTES = ROUTES.filter((route: any) => route.meta && route.meta.requiresAuth);
      this.LOGGED_OUT_ROUTES = ROUTES.filter((route: any) => route.meta && !route.meta.requiresAuth);
    }

    private async Logout(e: any): Promise<void> {
      e.preventDefault();
      await this.$store.dispatch(LOGOUT_ACTION);
      await this.$store.dispatch('RESET_ALL');
      this.$router.push(CONTENT_ROUTES.LOGIN.path);
    }
  }
</script>