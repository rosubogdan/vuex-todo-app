<template>
  <div class="vld-parent">
    <loading :active="isLoading"
             :is-full-page="LOADER.fullPage"
             :color="LOADER.color"
             :loader="LOADER.loaderType"
             :background-color="LOADER.background"
             :width="LOADER.width"
             :height="LOADER.height"
             :opacity="LOADER.opacity"
             :z-index="LOADER.zIndex"></loading>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  import Loading from 'vue-loading-overlay';
  import { LOADER } from '@/constants';


  @Component({
    components: {
      Loading,
    },
  })
  export default class Loader extends Vue {
    @Prop() private isLoading: any;
    private LOADER = LOADER;
  }
</script>