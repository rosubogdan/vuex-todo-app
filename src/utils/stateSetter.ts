export const set = (state: any, payload: any) => Object.keys(payload).forEach((key) => state[key] = payload[key]);
