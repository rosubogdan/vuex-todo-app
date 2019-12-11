<template>
  <div class="navigation">
    <b-navbar toggleable="md"
              type="dark"
              variant="dark"
              fixed="top">
      <b-navbar-brand class="logo"
                      :title="CONTENT.APP.TITLE">
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
                      exact
                      exact-active-class="active">
            <i :class="route.icon"></i> {{route.name}}
          </b-nav-item>

          <b-nav-item @click="Logout"
                      exact
                      exact-active-class="active">
            {{CONTENT_ROUTES.LOGOUT.name}} <i class="fas fa-sign-out-alt"></i>
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto"
                      v-else>
          <b-nav-item v-for="route in LOGGED_OUT_ROUTES"
                      :key="route.path"
                      :to="route.path"
                      exact
                      exact-active-class="active">
            <i :class="route.icon"></i> {{route.name}}
          </b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { mapGetters } from 'vuex';
  import { LOGOUT_ACTION } from '@/store/modules/auth/actions';
  import { LOGIN_STATUS } from '@/store/modules/auth/getters';
  import { ROUTES } from '@/router/routes';
  import {
    CONTENT,
    CONTENT_ROUTES,
  } from '@/constants';

  @Component({
    computed: mapGetters({ LOGIN_STATUS }),
  })
  export default class NavigationComponent extends Vue {
    private CONTENT = CONTENT;
    private ROUTES = ROUTES;
    private CONTENT_ROUTES = CONTENT_ROUTES;
    private LOGGED_IN_ROUTES: any = [];
    private LOGGED_OUT_ROUTES: any = [];

    constructor() {
      super();
    }

    private created() {
      this.LOGGED_IN_ROUTES = ROUTES.filter((route: any) => route.meta && route.meta.requiresAuth);
      this.LOGGED_OUT_ROUTES = ROUTES.filter((route: any) => route.meta && !route.meta.requiresAuth);
    }

    private async Logout(e: any) {
      e.preventDefault();
      await this.$store.dispatch(LOGOUT_ACTION);
      this.$router.push(CONTENT_ROUTES.LOGIN.path);
    }
  }
</script>

<style scoped lang="scss">
  @import '@/assets/scss/_add.scss';
</style>
