<template>
  <div class="LOGIN">
    <LoginComponent />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginComponent from '@/components/Auth/Login.component.vue';

@Component({
  components: {
    LoginComponent,
  },
})
export default class Login extends Vue {
  constructor() {
    super();
  }
}
</script>

