<template>
  <div class="wrapper">

    <h1>Profile component</h1>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { CONTENT, CONTENT_ROUTES, SIZE } from '@/constants';

  @Component({})
  export default class ProfileComponent extends Vue {
    private SIZE = SIZE;
    private CONTENT = CONTENT;
    private CONTENT_ROUTES = CONTENT_ROUTES;
    constructor() {
      super();
    }
  }
</script>