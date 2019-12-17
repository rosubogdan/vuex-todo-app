interface Todo {
  id?: number;
  userId?: number;
  title: string;
  description?: string;
  priority: boolean;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export default Todo;
