<template>
  <div id="app">
    <NavigationComponent />
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import NavigationComponent from '@/components/Navigation/Navigation.component.vue';

  @Component({
    components: { NavigationComponent },
  })
  export default class App extends Vue {
    constructor() {
      super();
    }
  }
</script>

<style lang="scss">
  @import '@/assets/scss/app_main.scss';
</style>
