interface Todo {
  id?: number;
  userId?: number;
  title: string;
  description?: string;
  priority: boolean;
  completed: boolean;
}

export default Todo;
