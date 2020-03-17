export const set = (state: any, payload: any): void =>
  Object.keys(payload).forEach((key): void => state[key] = payload[key]);
