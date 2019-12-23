export const GENERIC = {
  RESET_MUTATION: 'RESET_MUTATION',
  IS_LOADING_MUTATION: 'IS_LOADING_MUTATION'
};

export const IS_LOADING_MUTATION = (state: any, { isLoading }: any) => (state.isLoading = isLoading);

export const RESET_MUTATION = (state: any, payload: any) => (Object.assign(state, payload));
