import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export const RegisterFormValidation = {
  form: {
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs("password")
    }
  }
};