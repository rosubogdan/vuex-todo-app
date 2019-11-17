<template>
  <div class="wrapper">
    <b-row class="text-center mb-3">
      <b-col sm=12>
        <h3>{{CONTENT.HEADER}}</h3>
      </b-col>
    </b-row>
    <b-row class="text-center mb-3">
      <b-col sm="12"
             md="8"
             lg="6"
             offset-md="2"
             offset-lg="3">
        <div class="content">
          <b-form @submit.prevent="handleSubmit"
                  novalidate>

            <!-- Email -->
            <section class="email">

              <label class="sr-only"
                     for="email">{{CONTENT.EMAIL_LABEL}}</label>
              <b-input id="email"
                       class="mb-3"
                       type="email"
                       size="lg"
                       required
                       :placeholder="CONTENT.EMAIL_PLACEHOLDER"
                       v-model="form.email"></b-input>
              <!-- Validation -->
              <div class="errors text-left mb-3"
                   v-if="$v.form.$error">
                <span class="danger"
                      v-if="!$v.form.email.required">{{CONTENT.FIELD_REQUIRED_ERROR}}</span>
                <span class="danger"
                      v-if="!$v.form.email.email">{{CONTENT.EMAIL_INVALID_ERROR}}</span>
              </div>
            </section>

            <!-- Password -->
            <section class="password">

              <label class="sr-only"
                     for="password">{{CONTENT.PASSWORD_LABEL}}</label>

              <b-input-group class="login-password">
                <b-form-input id="password"
                              :placeholder="CONTENT.PASSWORD_LABEL"
                              :type="show ? 'text': 'password'"
                              size="lg"
                              v-model="form.password"
                              class="mb-3"></b-form-input>
                <b-input-group-append>
                  <b-button variant="success"
                            size="lg"
                            class="mb-3"
                            @click="toggleShowHide()">
                    <i class="show-password"
                       :class="[show ? 'fas fa-eye-slash': 'far fa-eye']"
                       title="View"></i>
                  </b-button>
                </b-input-group-append>
              </b-input-group>

              <!-- Validation -->
              <div class="errors text-left mb-3"
                   v-if="$v.form.$error">

                <span class="text-left danger"
                      v-if="!$v.form.password.required">{{CONTENT.FIELD_REQUIRED_ERROR}}</span>
              </div>
            </section>

            <!-- Invalid credentials validation -->
            <div class="errors text-left mb-3"
                 v-if="loginError">

              <span class="text-left danger">{{loginError}}</span>
            </div>

            <!-- Submit -->
            <b-button variant="success"
                      type="submit">{{CONTENT.LOGIN_BUTTON}}</b-button>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { mapGetters } from "vuex";
  import { validationMixin } from "vuelidate";
  import { LoginValidation } from "@/validations/loginForm.validation";
  import { CONTENT, CONTENT_ROUTES } from "@/constants";

  import { LOGIN_STATUS, LOGIN_MESSAGE } from "@/store/modules/auth/getters";
  import { LOGIN_ACTION } from "@/store/modules/auth/actions";
  import { LoginForm } from "@/models/forms/loginForm";

  @Component({
    mixins: [validationMixin],
    validations: LoginValidation,
    computed: mapGetters({ LOGIN_STATUS, LOGIN_MESSAGE })
  })
  export default class LoginComponent extends Vue {
    private CONTENT = CONTENT.LOGIN;
    private form: LoginForm = <LoginForm>{};
    private loginError = null;
    private show: boolean = false;

    private toggleShowHide() {
      this.show = !this.show;
    }

    private async handleSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        await this.$store.dispatch(LOGIN_ACTION, this.form);
        this.loginError = this.$store.getters[LOGIN_MESSAGE];
        if (this.$store.getters[LOGIN_STATUS])
          this.$router.push({ path: CONTENT_ROUTES.HOME.path });
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/scss/_login.scss";
</style>


