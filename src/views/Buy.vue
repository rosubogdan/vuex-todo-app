<template>
  <div class="BUY">
    <span>Buy view</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Buy extends Vue {
  constructor() {
    super();
  }
}
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_buy.scss";
</style>
