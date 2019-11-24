<template>
  <div class="wrapper">
    <b-row class="text-center mb-3">
      <b-col sm=12>
        <h3>{{CONTENT.LOGIN.HEADER}}</h3>
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
                       :size="SIZE.DEFAULT">
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
                              :type="show ? CONTENT.DEFAULT.TYPE.TEXT: CONTENT.DEFAULT.TYPE.PASSWORD"
                              :size="SIZE.DEFAULT">
                </b-form-input>
                <b-input-group-append>
                  <b-button variant="success"
                            class="mb-3"
                            @click="toggleShowHide()"
                            :size="SIZE.DEFAULT">
                    <i title="View"
                       class="show-password"
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
                  {{VALIDATION.FIELD_REQUIRED_ERROR(CONTENT.INPUT.PASSWORD)}}
                </span>
              </div>
            </section>

            <!-- Invalid credentials validation -->
            <div class="errors text-left mb-3"
                 v-if="loginError">
              <span class="text-left danger">{{loginError}}</span>
            </div>

            <!-- Submit -->
            <b-button variant="success"
                      type="submit">
              {{CONTENT.BUTTON.LOGIN}}
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
  import { LoginFormValidation, VALIDATION } from "@/validations";

  import { CONTENT, CONTENT_ROUTES, SIZE } from "@/constants";

  import { LOGIN_STATUS, LOGIN_MESSAGE } from "@/store/modules/auth/getters";
  import { LOGIN_ACTION } from "@/store/modules/auth/actions";

  import { LoginForm } from "@/models/forms/loginForm";

  @Component({
    mixins: [validationMixin],
    validations: LoginFormValidation,
    computed: mapGetters({ LOGIN_STATUS, LOGIN_MESSAGE })
  })
  export default class LoginComponent extends Vue {
    private SIZE = SIZE;
    private CONTENT = CONTENT;
    private VALIDATION = VALIDATION;

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


