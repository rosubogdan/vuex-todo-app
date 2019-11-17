<template>
  <div class="HOME">
    <HomeComponent />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import HomeComponent from "@/components/Home/Home.component.vue";

  @Component({
    components: {
      HomeComponent
    }
  })
  export default class Home extends Vue {}
</script>