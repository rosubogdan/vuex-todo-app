<template>
  <div class="Profile">
    <ProfileComponent />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import ProfileComponent from '@/components/Profile/Profile.component.vue';

  @Component({
    components: {
      ProfileComponent,
    },
  })
  export default class Profile extends Vue { }
</script>