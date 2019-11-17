import { required, email } from "vuelidate/lib/validators";

export const LoginValidation = {
  form: {
    email: {
      email,
      required
    },
    password: {
      required
    }
  }
};