<template>
  <div class="wrapper">
    <b-row class="text-center">
      <b-col sm="12"
             md="6"
             lg="6"
             class="padding-15">
        <div class="card-wrapper">
          <i class="far fa-check-circle"></i>
          <h3>{{CONTENT.HOME.TODO_CARD.TITLE}}</h3>
          <router-link :to="CONTENT_ROUTES.TODOS.path">
            <b-button variant="success">
              {{CONTENT.BUTTON.GO}}
            </b-button>
          </router-link>
        </div>
      </b-col>
      <b-col sm="12"
             md="6"
             lg="6"
             class="padding-15">
        <div class="card-wrapper">
          <i class="fas fa-cart-arrow-down"></i>
          <h3>{{CONTENT.HOME.BUY_CARD.TITLE}}</h3>
          <router-link :to="CONTENT_ROUTES.BUY.path">
            <b-button variant="success">
              {{CONTENT.BUTTON.GO}}
            </b-button>
          </router-link>
        </div>
      </b-col>
    </b-row>

    <b-row class="text-center mt-3">
      <b-col sm="12"
             class="copy">
        <p>{{CONTENT.HOME.COPY}}</p>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { CONTENT, CONTENT_ROUTES } from "@/constants";

  @Component({})
  export default class HomeComponent extends Vue {
    private CONTENT = CONTENT;
    private CONTENT_ROUTES = CONTENT_ROUTES;
    constructor() {
      super();
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_home.scss";
</style>
