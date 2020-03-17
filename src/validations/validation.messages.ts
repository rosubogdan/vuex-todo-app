export const VALIDATION = {
  FIELD_REQUIRED_DEFAULT_ERROR: (): string => `This field is required.`,
  FIELD_REQUIRED_ERROR: (input: any): string => `${input} field is required.`,
  FIELD_ALPHA_ERROR: (input: any): string => `${input} field accepts only alphabet characters.`,
  EMAIL_INVALID_ERROR: (): string => `Please enter a valid email address.`,
  PASSWORD_MATCH_EROR: (): string => `Pasword don't match.`,
  MIN_LENGTH_ERROR: (input: any, minLength: any): string => `${input} must have at least ${minLength} characters.`,
  MAX_LENGTH_ERROR: (input: any, maxLength: any): string => `${input} must have maximum ${maxLength} characters.`,
};
