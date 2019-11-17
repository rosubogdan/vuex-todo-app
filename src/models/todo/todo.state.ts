import Todo from '@/models/todo/todo';

interface State {
  todos: Todo[];
  selectedFilter: number;
  filterValues: number[];
}

export default State;
