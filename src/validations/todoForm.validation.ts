import { required, maxLength } from 'vuelidate/lib/validators';

export const TodoFormValidation = {
  form: {
    title: { required },
    description: { maxLength: maxLength(300) },
    priority: { required },
    status: { required },
  },
};
