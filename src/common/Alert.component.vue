<template>
  <div class="alert-container">
    <b-alert :class="`position-fixed fixed-${position} m-0 rounded-0`"
             :show="show"
             :variant="variant"
             dismissible>
      <slot></slot>
    </b-alert>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';
  @Component({})
  export default class Alert extends Vue {
    @Prop() private variant: any;
    @Prop() private position: string;
    @Prop() private show: number;
    // ? time until alert is dismissed, ex: 5 seconds
    private timer: number | boolean = 5;

    private mounted() {
      //   if (this.variant === 'danger') { this.timer = true; }
      // this.timer = this.show;
    }
  }
</script>