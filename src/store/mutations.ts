export const GENERIC = {
  IS_LOADING_MUTATION: 'IS_LOADING_MUTATION',
};

export const IS_LOADING_MUTATION = (state: any, { isLoading }: any) => (state.isLoading = isLoading);
