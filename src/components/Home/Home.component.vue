<template>
  <div class="wrapper">
    <b-row class="text-center">
      <b-col sm="12"
             md="6"
             lg="6"
             class="padding-15">
        <div class="card-wrapper">
          <router-link :to="CONTENT_ROUTES.TODOS.path">
            <i class="far fa-check-circle"></i>
            <h3>{{HOME.TODO_CARD.TITLE}}</h3>
            <b-button variant="success"
                      :size="SIZE.DEFAULT">
              {{BUTTON.GO}}
            </b-button>
          </router-link>
        </div>
      </b-col>
      <b-col sm="12"
             md="6"
             lg="6"
             class="padding-15">
        <div class="card-wrapper">
          <router-link :to="CONTENT_ROUTES.BUY.path">
            <i class="fas fa-cart-arrow-down"></i>
            <h3>{{HOME.BUY_CARD.TITLE}}</h3>
            <b-button variant="success"
                      :size="SIZE.DEFAULT">
              {{BUTTON.GO}}
            </b-button>
          </router-link>
        </div>
      </b-col>
    </b-row>

    <b-row class="text-center mt-3">
      <b-col sm="12"
             class="copy">
        <p>{{HOME.COPY}}</p>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
  // * vue
  import { Component, Vue } from 'vue-property-decorator';

  // * constants
  import {
    HOME,
    BUTTON,
    SIZE,
    CONTENT_ROUTES,
  } from '@/constants';

  // * component setup
  @Component({})
  export default class HomeComponent extends Vue {
    // * private readonly
    private readonly HOME: {} = HOME;
    private readonly SIZE: {} = SIZE;
    private readonly BUTTON: {} = BUTTON;
    private readonly CONTENT_ROUTES: {} = CONTENT_ROUTES;

    constructor() {
      super();
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_home.scss';
</style>
