import modules from './modules';

export const RESET_ALL = 'RESET_ALL';

export const actions = {
  RESET_ALL({ commit }: any) {
    Object.keys(modules).forEach((moduleName) => {
      commit(`${moduleName}/RESET_MUTATION`);
    });
  },
};
