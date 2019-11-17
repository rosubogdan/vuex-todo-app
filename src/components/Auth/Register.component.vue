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

              <b-input-group class="register-password"
                             ref="password">
                <b-form-input id="password"
                              :placeholder="CONTENT.PASSWORD_LABEL"
                              :type="showPassword ? 'text': 'password'"
                              size="lg"
                              v-model="form.password"
                              class="mb-3"></b-form-input>
                <b-input-group-append>
                  <b-button variant="success"
                            size="lg"
                            class="mb-3"
                            @click="showPassword = !showPassword">
                    <i class="show-password"
                       :class="[showPassword ? 'fas fa-eye-slash': 'far fa-eye']"></i>
                  </b-button>
                </b-input-group-append>
              </b-input-group>

              <!-- Validation -->
              <div class="errors text-left mb-3"
                   v-if="$v.form.$error">

                <span class="text-left danger"
                      v-if="!$v.form.password.required">{{CONTENT.FIELD_REQUIRED_ERROR}}</span>
                <span class="text-left danger"
                      v-if="!$v.form.password.minLength">{{CONTENT.MIN_LENGTH_ERROR(CONTENT.PASSWORD_LABEL,$v.form.password.$params.minLength.min )}}</span>
              </div>
            </section>

            <!-- Confirm password -->
            <section class="confirmPassword">
              <label class="sr-only"
                     for="confirm_password">{{CONTENT.CONFIRM_PASSWORD_LABEL}}</label>

              <b-input-group class="register-confirm-password"
                             ref="'confirm'">
                <b-form-input id="confirm_password"
                              :placeholder="CONTENT.CONFIRM_PASSWORD_LABEL"
                              :type="showConfirmPassword ? 'text': 'password'"
                              size="lg"
                              v-model="form.confirmPassword"
                              class="mb-3"></b-form-input>
                <b-input-group-append>
                  <b-button variant="success"
                            size="lg"
                            class="mb-3"
                            @click="showConfirmPassword = ! showConfirmPassword">
                    <i class="show-password"
                       :class="[showConfirmPassword ? 'fas fa-eye-slash': 'far fa-eye']"></i>
                  </b-button>
                </b-input-group-append>
              </b-input-group>

              <!-- Validation -->
              <div class="errors text-left mb-3"
                   v-if="$v.form.$error">

                <span class="text-left danger"
                      v-if="!$v.form.confirmPassword.required">{{CONTENT.FIELD_REQUIRED_ERROR}}</span>
                <span class="text-left danger"
                      v-else-if="!$v.form.confirmPassword.sameAsPassword">{{CONTENT.PASSWORD_MATCH_EROR}}</span>
              </div>
            </section>

            <!-- Invalid credentials validation -->
            <div class="errors text-left mb-3"
                 v-if="registerError">

              <span class="text-left danger">{{registerError}}</span>
            </div>

            <!-- Submit -->
            <b-button variant="success"
                      type="submit">{{CONTENT.REGISTER_BUTTON}}</b-button>
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
  import { RegisterValidation } from "@/validations/registerForm.validation";
  import { CONTENT, CONTENT_ROUTES } from "@/constants";

  import {
    REGISTER_STATUS,
    REGISTER_MESSAGE
  } from "@/store/modules/auth/getters";
  import { REGISTER_ACTION } from "@/store/modules/auth/actions";
  import { RegisterForm } from "@/models/forms/registerForm";

  @Component({
    mixins: [validationMixin],
    validations: RegisterValidation,
    computed: mapGetters({ REGISTER_STATUS, REGISTER_MESSAGE })
  })
  export default class RegisterComponent extends Vue {
    private CONTENT = CONTENT.REGISTER;
    private form: RegisterForm = <RegisterForm>{};
    private registerError = null;
    private showPassword: boolean = false;
    private showConfirmPassword: boolean = false;

    constructor() {
      super();
    }

    private async handleSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        await this.$store.dispatch(REGISTER_ACTION, this.form);
        this.registerError = this.$store.getters[REGISTER_MESSAGE];
        if (this.$store.getters[REGISTER_STATUS])
          this.$router.push({ path: CONTENT_ROUTES.LOGIN.path });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/scss/_register.scss";
</style>
