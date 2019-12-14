<template>
  <div class="alert-container">
    <b-alert :class="`position-fixed fixed-${position} m-0 rounded-0`"
             :show="timer"
             :variant="variant"
             dismissible>
      <slot></slot>
    </b-alert>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';


  @Component({
  })
  export default class Alert extends Vue {
    @Prop() private variant: any;
    @Prop() private position: string;
    // time until alert is dismissed, ex: 5 seconds
    private timer: number = 5;
  }
</script>