import { required, email } from 'vuelidate/lib/validators';

export const LoginFormValidation = {
  form: {
    email: {
      email,
      required,
    },
    password: {
      required,
    },
  },
};
