<template>
  <div class="wrapper">

    <Loader :is-loading="IS_LOADING" />

    <b-row class="text-center mb-3">
      <b-col sm=12>
        <h3>{{REGISTER.HEADER}}</h3>
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

            <!-- First Name -->
            <section class="firstName">
              <b-input id="firstName"
                       class="mb-3"
                       type="text"
                       v-model.trim="form.firstName"
                       :placeholder="INPUT.FIRST_NAME"
                       :size="SIZE.DEFAULT">
              </b-input>
              <!-- Validation -->
              <div class="errors text-left mb-3"
                   v-if="$v.form.$error">
                <span class="danger"
                      v-if="!$v.form.firstName.required">
                  {{VALIDATION.FIELD_REQUIRED_ERROR(INPUT.FIRST_NAME)}}
                </span>
                <span class="danger"
                      v-if="!$v.form.firstName.alpha">
                  {{VALIDATION.FIELD_ALPHA_ERROR(INPUT.FIRST_NAME)}}
                </span>
              </div>
            </section>

            <!-- Last Name -->
            <section class="lastName">
              <b-input id="lastName"
                       class="mb-3"
                       type="text"
                       v-model.trim="form.lastName"
                       :placeholder="INPUT.LAST_NAME"
                       :size="SIZE.DEFAULT">
              </b-input>
              <!-- Validation -->
              <div class="errors text-left mb-3"
                   v-if="$v.form.$error">
                <span class="danger"
                      v-if="!$v.form.lastName.required">
                  {{VALIDATION.FIELD_REQUIRED_ERROR(INPUT.LAST_NAME)}}
                </span>
                <span class="danger"
                      v-if="!$v.form.lastName.alpha">
                  {{VALIDATION.FIELD_ALPHA_ERROR(INPUT.LAST_NAME)}}
                </span>
              </div>
            </section>

            <!-- Username -->
            <section class="username">
              <b-input id="username"
                       class="mb-3"
                       type="text"
                       v-model.trim="form.username"
                       :placeholder="INPUT.USERNAME"
                       :size="SIZE.DEFAULT">
              </b-input>
            </section>

            <!-- Email -->
            <section class="email">
              <b-input id="email"
                       class="mb-3"
                       type="email"
                       v-model.trim="form.email"
                       :placeholder="INPUT.EMAIL_PLACEHOLDER"
                       :size="SIZE.DEFAULT">
              </b-input>
              <!-- Validation -->
              <div class="errors text-left mb-3"
                   v-if="$v.form.$error">
                <span class="danger"
                      v-if="!$v.form.email.required">
                  {{VALIDATION.FIELD_REQUIRED_ERROR(INPUT.EMAIL)}}
                </span>
                <span class="danger"
                      v-if="!$v.form.email.email">
                  {{VALIDATION.EMAIL_INVALID_ERROR()}}
                </span>
              </div>
            </section>

            <!-- Password -->
            <section class="password">
              <b-input-group class="register-password">
                <b-form-input id="password"
                              class="mb-3"
                              v-model.trim="form.password"
                              :placeholder="INPUT.PASSWORD_PLACEHOLDER"
                              :type="showPassword ? DEFAULT.TYPE.TEXT: DEFAULT.TYPE.PASSWORD"
                              :size="SIZE.DEFAULT">
                </b-form-input>
                <b-input-group-append>
                  <b-button variant="success"
                            class="mb-3"
                            @click="showPassword = !showPassword"
                            :size="SIZE.DEFAULT">
                    <i title="Show"
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
                  {{VALIDATION.FIELD_REQUIRED_ERROR(INPUT.PASSWORD)}}
                </span>
                <span class="text-left danger"
                      v-if="!$v.form.password.minLength">
                  {{VALIDATION.MIN_LENGTH_ERROR(INPUT.PASSWORD,$v.form.password.$params.minLength.min)}}
                </span>
              </div>
            </section>

            <!-- Confirm password -->
            <section class="confirmPassword">
              <b-input-group class="register-confirm-password">
                <b-form-input id="confirm_password"
                              class="mb-3"
                              v-model.trim="form.confirmPassword"
                              :placeholder="INPUT.CONFIRM_PASSWORD_PLACEHOLDER"
                              :type="showConfirmPassword ? DEFAULT.TYPE.TEXT: DEFAULT.TYPE.PASSWORD"
                              :size="SIZE.DEFAULT">
                </b-form-input>
                <b-input-group-append>
                  <b-button variant="success"
                            class="mb-3"
                            :size="SIZE.DEFAULT"
                            @click="showConfirmPassword = ! showConfirmPassword">
                    <i title="Show"
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
                  {{VALIDATION.FIELD_REQUIRED_ERROR(INPUT.CONFIRM_PASSWORD)}}
                </span>
                <span class="text-left danger"
                      v-else-if="!$v.form.confirmPassword.sameAsPassword">
                  {{VALIDATION.PASSWORD_MATCH_EROR()}}
                </span>
              </div>
            </section>

            <!-- Invalid credentials validation -->
            <Alert :variant="ALERT.DANGER"
                   :position="ALERT.BOTTOM"
                   v-if="HAS_ERROR">
              <span class="text-center">{{ERROR_MESSAGE}} </span>
            </Alert>

            <!-- Submit -->
            <b-button variant="success"
                      type="submit"
                      :size="SIZE.DEFAULT">
              {{BUTTON.REGISTER}}
            </b-button>
          </b-form>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
  // * vue
  import { Component, Vue } from 'vue-property-decorator';
  import { mapGetters } from 'vuex';
  import { validationMixin } from 'vuelidate';

  // * validation
  import { RegisterFormValidation, VALIDATION } from '@/validations';

  // * components
  import Loader from '@/common/Loader.component.vue';
  import Alert from '@/common/Alert.component.vue';

  // * models
  import { RegisterForm } from '@/models/forms/registerForm';

  // * actions
  import { REGISTER_ACTION } from '@/store/modules/auth/actions';

  // * getters
  import {
    LOGIN_STATUS,
    IS_LOADING,
    HAS_ERROR,
    ERROR_MESSAGE,
  } from '@/store/modules/auth/getters';


  // * constants
  import {
    REGISTER,
    DEFAULT,
    CONTENT_ROUTES,
    INPUT,
    BUTTON,
    SIZE,
    ALERT,
  } from '@/constants';

  // * component setup
  @Component({
    components: { Loader, Alert },
    mixins: [validationMixin],
    validations: RegisterFormValidation,
    computed: mapGetters({
      IS_LOADING,
      LOGIN_STATUS,
      HAS_ERROR,
      ERROR_MESSAGE,
    }),
  })
  export default class RegisterComponent extends Vue {
    // * private readonly
    private readonly REGISTER: {} = REGISTER;
    private readonly ALERT: {} = ALERT;
    private readonly SIZE: {} = SIZE;
    private readonly INPUT: {} = INPUT;
    private readonly BUTTON: {} = BUTTON;
    private readonly DEFAULT: {} = DEFAULT;
    private readonly VALIDATION: {} = VALIDATION;

    // * private
    private form: RegisterForm = {} as RegisterForm;
    private showPassword: boolean = false;
    private showConfirmPassword: boolean = false;

    private async handleSubmit(): Promise<void> {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        await this.$store.dispatch(REGISTER_ACTION, this.form);
        if (!this.$store.getters[HAS_ERROR]) {
          this.$router.push(CONTENT_ROUTES.LOGIN.path);
        }
      }
    }
  }
</script>
