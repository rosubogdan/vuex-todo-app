<template>
  <div class="wrapper text-left">

    <b-row class="text-center mb-3">
      <b-col sm=12>
        <h3>
          <i class="fas fa-users-cog"></i> Profile
        </h3>
      </b-col>
    </b-row>

    <b-card class="profile-card">

      <template v-slot:header>
        <h2 class="card-title font-weight-bold">Profile info</h2>
        <i class="fas fa-user-edit action-icon"
           title="Edit"
           @click="openModal">
        </i>
      </template>

      <div class="profile-content">
        <p class="card-subtitle mb-2">First name: Bogdan</p>
        <p class="card-subtitle mb-2">Last name: Rosu</p>
        <p class="card-subtitle mb-2">Username: Test username</p>
        <p class="card-subtitle mb-2">Email: bogdan.rosu@email.com</p>
      </div>
    </b-card>

    <b-row class="mt-3 text-center">
      <b-col sm="12">
        <p>Email is not verified - Send verification email</p>
      </b-col>
      <b-col sm="12">
        <p>Send password reset email</p>
      </b-col>
    </b-row>

    <b-modal id="update-profile-modal"
             title="Update profile info"
             header-bg-variant="dark"
             header-text-variant="light"
             body-bg-variant="dark"
             body-text-variant="light"
             :hide-footer="true"
             centered>
      <p class="my-4">Hello from modal!</p>
    </b-modal>

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

    private openModal() {
      this.$bvModal.show('update-profile-modal');
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_profile.scss';
</style>