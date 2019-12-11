import { required, maxLength } from 'vuelidate/lib/validators';

export const AddTodoValidation = {
  form: {
    title: { required },
    description: { maxLength: maxLength(20) },
    priority: { required },
    status: { required },
  },
};
