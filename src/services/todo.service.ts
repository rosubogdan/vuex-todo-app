import { Priorities } from "@/models/todo/priorities";

export const getPriority = (value: number) => {
  let priority: any = Priorities.find(priority => priority.value == value);
  return priority.name;
}

export const getStatus = (value: boolean, complete: string, incomplete: string) => (value ? complete : incomplete);