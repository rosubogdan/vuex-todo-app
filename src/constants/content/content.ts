
export const CONTENT = {
  APP_TITLE: 'Todo App',
  LOGIN: {
    HEADER: 'Login',
    EMAIL_LABEL: 'Email',
    EMAIL_PLACEHOLDER: 'Email address',
    PASSWORD_LABEL: 'Password',
    LOGIN_BUTTON: 'Login',
    FIELD_REQUIRED_ERROR: 'This field is required.',
    EMAIL_INVALID_ERROR: 'Please enter a valid email address.',
  },
  REGISTER: {
    HEADER: 'Register',
    EMAIL_LABEL: 'Email',
    EMAIL_PLACEHOLDER: 'Email address',
    PASSWORD_LABEL: 'Password',
    CONFIRM_PASSWORD_LABEL: 'Confirm password',
    REGISTER_BUTTON: 'Register',
    FIELD_REQUIRED_ERROR: 'This field is required.',
    EMAIL_INVALID_ERROR: 'Please enter a valid email address.',
    MIN_LENGTH_ERROR: (filed: any, minLength: any) => `${filed} must have at least ${minLength} characters.`,
    PASSWORD_MATCH_EROR: `Pasword don't match.`
  },
  HOME: {
    TODO: {
      TITLE: 'Todo List',
    },
    BUY: {
      TITLE: 'Buy List',
    },
    BUTTON: 'GO!',
    COPY: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur hic aperiam quam expedita corporis natus ipsa praesentium labore illum a dolores quasi soluta, fugiat rem, at sapiente omnis accusantium deserunt.'
  },
  TODOS: {
    HEADER: 'Todos',
    ADD_TODO: 'Add todo',
    TODO_TITLE: 'Todo title',
    TODO_PLACEHOLDER: 'Todo',
    TODO_NOTES: 'Add todo notes',
    SUBMIT_BUTTON: 'Submit',
    FILTER_TODOS: 'Per page:',
    SEARCH_PLACEHOLDER: 'Type to search',
    LEGEND: {
      INFO: 'Legend: ',
      INCOMPLETE: 'Incomplete',
      COMPLETE: 'Completed',
    },
    MODAL_TITLE: 'Delete confirmation',
    DELETE_CONFIRMATION: 'Are you sure you want to delete this todo item?',
  },
  BUY: {},

};