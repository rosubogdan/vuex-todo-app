interface Priority {
  name: string;
  value: number;
};

export const Priorities: Priority[] = new Array<Priority>(
  { name: 'Low', value: 0 },
  { name: 'Medium', value: 1 },
  { name: 'High', value: 2 });