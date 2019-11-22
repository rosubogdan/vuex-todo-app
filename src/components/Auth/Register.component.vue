<template>
  <div class="wrapper">
    <b-row class="text-center mb-3">
      <b-col sm=12>
        <h3>{{CONTENT.REGISTER.HEADER}}</h3>
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
              <b-input id="email"
                       class="mb-3"
                       type="email"
                       v-model.trim="form.email"
                       :placeholder="CONTENT.INPUT.EMAIL_PLACEHOLDER"
                       :size="SIZE">
              </b-input>
              <!-- Validation -->
              <div class="errors text-left mb-3"
                   v-if="$v.form.$error">
                <span class="danger"
                      v-if="!$v.form.email.required">
                  {{VALIDATION.FIELD_REQUIRED_ERROR(CONTENT.INPUT.EMAIL)}}
                </span>
                <span class="danger"
                      v-if="!$v.form.email.email">
                  {{VALIDATION.EMAIL_INVALID_ERROR()}}
                </span>
              </div>
            </section>

            <!-- Password -->
            <section class="password">
              <b-input-group class="login-password">
                <b-form-input id="password"
                              class="mb-3"
                              v-model.trim="form.password"
                              :placeholder="CONTENT.INPUT.PASSWORD_PLACEHOLDER"
                              :type="showPassword ? CONTENT.DEFAULT.TYPE.TEXT: CONTENT.DEFAULT.TYPE.PASSWORD"
                              :size="SIZE">
                </b-form-input>
                <b-input-group-append>
                  <b-button variant="success"
                            class="mb-3"
                            @click="showPassword = !showPassword"
                            :size="SIZE">
                    <i title="View"
                       class="show-password"
                       :class="[showPassword ? 'fas fa-eye-slash': 'far fa-eye']">
                    </i>
                  </b-button>
                </b-input-group-append>
              </b-input-group>
              <!-- Validation -->
              <div class="errors text-left mb-3"
                   v-if="$v.form.$error">

                <span class="text-left danger"
                      v-if="!$v.form.password.required">
                  {{VALIDATION.FIELD_REQUIRED_ERROR(CONTENT.INPUT.PASSWORD)}}
                </span>
                <span class="text-left danger"
                      v-if="!$v.form.password.minLength">
                  {{VALIDATION.MIN_LENGTH_ERROR(CONTENT.INPUT.PASSWORD,$v.form.password.$params.minLength.min)}}
                </span>
              </div>
            </section>

            <!-- Confirm password -->
            <section class="confirmPassword">
              <b-input-group class="register-confirm-password">
                <b-form-input id="confirm_password"
                              class="mb-3"
                              v-model.trim="form.confirmPassword"
                              :placeholder="CONTENT.INPUT.CONFIRM_PASSWORD_PLACEHOLDER"
                              :type="showConfirmPassword ? CONTENT.DEFAULT.TYPE.TEXT: CONTENT.DEFAULT.TYPE.PASSWORD"
                              :size="SIZE">
                </b-form-input>
                <b-input-group-append>
                  <b-button variant="success"
                            class="mb-3"
                            :size="SIZE"
                            @click="showConfirmPassword = ! showConfirmPassword">
                    <i class="show-password"
                       :class="[showConfirmPassword ? 'fas fa-eye-slash': 'far fa-eye']">
                    </i>
                  </b-button>
                </b-input-group-append>
              </b-input-group>

              <!-- Validation -->
              <div class="errors text-left mb-3"
                   v-if="$v.form.$error">

                <span class="text-left danger"
                      v-if="!$v.form.confirmPassword.required">
                  {{VALIDATION.FIELD_REQUIRED_ERROR(CONTENT.INPUT.CONFIRM_PASSWORD)}}
                </span>
                <span class="text-left danger"
                      v-else-if="!$v.form.confirmPassword.sameAsPassword">
                  {{VALIDATION.PASSWORD_MATCH_EROR()}}
                </span>
              </div>
            </section>

            <!-- Invalid credentials validation -->
            <div class="errors text-left mb-3"
                 v-if="registerError">

              <span class="text-left danger">{{registerError}}</span>
            </div>

            <!-- Submit -->
            <b-button variant="success"
                      type="submit">
              {{CONTENT.BUTTON.REGISTER}}
            </b-button>
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
  import { RegisterFormValidation, VALIDATION } from "@/validations";
  import { CONTENT, CONTENT_ROUTES, SIZE } from "@/constants";

  import {
    REGISTER_STATUS,
    REGISTER_MESSAGE
  } from "@/store/modules/auth/getters";
  import { REGISTER_ACTION } from "@/store/modules/auth/actions";
  import { RegisterForm } from "@/models/forms/registerForm";

  @Component({
    mixins: [validationMixin],
    validations: RegisterFormValidation,
    computed: mapGetters({ REGISTER_STATUS, REGISTER_MESSAGE })
  })
  export default class RegisterComponent extends Vue {
    private SIZE = SIZE.DEFAULT;
    private CONTENT = CONTENT;
    private VALIDATION = VALIDATION;

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
