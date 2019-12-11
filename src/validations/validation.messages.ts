export const VALIDATION = {
  FIELD_REQUIRED_DEFAULT_ERROR: () => `This field is required.`,
  FIELD_REQUIRED_ERROR: (input: any) => `${input} field is required.`,
  EMAIL_INVALID_ERROR: () => `Please enter a valid email address.`,
  PASSWORD_MATCH_EROR: () => `Pasword don't match.`,
  MIN_LENGTH_ERROR: (input: any, minLength: any) => `${input} must have at least ${minLength} characters.`,
  MAX_LENGTH_ERROR: (input: any, maxLength: any) => `${input} must have maximum ${maxLength} characters.`,
};
