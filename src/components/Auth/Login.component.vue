<template>
  <div class="wrapper">

    <Loader :is-loading="IS_LOADING" />

    <Alert :variant="SHOW_ALERT.type"
           :position="SHOW_ALERT.position"
           :show="SHOW_ALERT.show">
      <span class="text-center">{{SHOW_ALERT.message}} </span>
    </Alert>

    <b-row class="text-center mb-3">
      <b-col sm=12>
        <h3>{{LOGIN.HEADER}}</h3>
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
              <b-input-group class="login-password">
                <b-form-input id="password"
                              class="mb-3"
                              v-model.trim="form.password"
                              :placeholder="INPUT.PASSWORD_PLACEHOLDER"
                              :type="show ? DEFAULT.TYPE.TEXT: DEFAULT.TYPE.PASSWORD"
                              :size="SIZE.DEFAULT">
                </b-form-input>
                <b-input-group-append>
                  <b-button variant="success"
                            class="mb-3"
                            @click="toggleShowHide()"
                            :size="SIZE.DEFAULT">
                    <i title="View"
                       :class="[show ? 'fas fa-eye-slash': 'far fa-eye']">
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
              </div>
            </section>

            <!-- Submit -->
            <b-button variant="success"
                      type="submit"
                      :size="SIZE.DEFAULT">
              {{BUTTON.LOGIN}}
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
  import { LoginFormValidation, VALIDATION } from '@/validations';

  // * components
  import Loader from '@/common/Loader.component.vue';
  import Alert from '@/common/Alert.component.vue';

  // * models
  import { LoginForm } from '@/models/forms/loginForm';

  // * actions
  import { LOGIN_ACTION } from '@/store/modules/auth/actions';

  // * getters
  import {
    LOGIN_STATUS,
    IS_LOADING,
    HAS_ERROR,
    ERROR_MESSAGE,
    SHOW_ALERT,
  } from '@/store/modules/auth/getters';


  // * constants
  import {
    LOGIN,
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
    validations: LoginFormValidation,
    computed: mapGetters({
      IS_LOADING,
      LOGIN_STATUS,
      HAS_ERROR,
      SHOW_ALERT,
    }),
  })
  export default class LoginComponent extends Vue {
    // * private readonly
    private readonly LOGIN: {} = LOGIN;
    private readonly ALERT: {} = ALERT;
    private readonly SIZE: {} = SIZE;
    private readonly INPUT: {} = INPUT;
    private readonly BUTTON: {} = BUTTON;
    private readonly DEFAULT: {} = DEFAULT;
    private readonly VALIDATION: {} = VALIDATION;

    // ? private
    private form: LoginForm = {} as LoginForm;
    private show: boolean = false;

    private toggleShowHide(): void {
      this.show = !this.show;
    }

    private async handleSubmit(): Promise<void> {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        await this.$store.dispatch(LOGIN_ACTION, this.form);
        if (this.$store.getters[LOGIN_STATUS]) {
          this.$router.push(CONTENT_ROUTES.HOME.path);
        }
      }
    }
  }
</script>


