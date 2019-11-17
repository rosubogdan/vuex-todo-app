<template>
  <div class="REGISTER">
    <RegisterComponent />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import RegisterComponent from "@/components/Auth/Register.component.vue";

  @Component({
    components: {
      RegisterComponent
    }
  })
  export default class Login extends Vue {
    constructor() {
      super();
    }
  }
</script>

