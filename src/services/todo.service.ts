import { Priorities } from '@/models/todo/priorities';

export const getPriority = (value: number) => {
  const priority: any = Priorities.find((p) => p.value === value);
  return priority.name;
};

export const getStatus = (value: boolean, complete: string, incomplete: string) => (value ? complete : incomplete);
