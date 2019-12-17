import { required, email, minLength, sameAs, alpha } from 'vuelidate/lib/validators';

export const RegisterFormValidation = {
  form: {
    firstName: {
      required,
      alpha,
    },
    lastName: {
      required,
      alpha,
    },
    email: {
      email,
      required,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password'),
    },
  },
};
