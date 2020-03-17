import { set } from '@/utils/stateSetter';

export const GENERIC = {
  IS_LOADING_MUTATION: 'IS_LOADING_MUTATION',
};

export const IS_LOADING_MUTATION = (state: any, payload: any): void => set(state, payload);
