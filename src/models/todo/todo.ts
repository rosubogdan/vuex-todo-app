interface Todo {
  id?: number;
  userId?: number;
  title: string;
  description?: string;
  priority: boolean;
  status: boolean;
  completed: boolean;
}

export default Todo;
