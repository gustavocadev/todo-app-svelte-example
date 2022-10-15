import type { Todo } from 'src/types/types';
import { writable } from 'svelte/store';
import { nanoid } from 'nanoid';
import { onMount } from 'svelte';

type InitialState = {
  todos: Todo[];
  todoTitle: string;
  isOnEditMode: boolean;
  todoSelected: Todo | null;
};

const INITIAL_STATE: InitialState = {
  todos: [],
  todoTitle: '',
  isOnEditMode: false,
  todoSelected: null,
};

const todoProvider = () => {
  const { set, subscribe, update } = writable<InitialState>(INITIAL_STATE);

  // actions
  const createTodo = (title: string, isDone = false) => {
    update((currentState) => {
      const newTodo = {
        id: nanoid(),
        title,
        isDone,
      };
      return {
        ...currentState,
        todos: [newTodo, ...currentState.todos],
        // clean the input
        todoTitle: '',
      };
    });
  };

  const deleteTodo = (id: string) => {
    update((currentState) => {
      return {
        ...currentState,
        todos: currentState.todos.filter((todo) => todo.id !== id),
      };
    });
  };

  const updateTodo = (id: string, title: string, isDone: boolean = false) => {
    update((currentState) => {
      const updatedTodos = currentState.todos.map((todo) => {
        if (id !== todo.id) return todo;

        return {
          ...todo,
          title,
          isDone,
        };
      });

      return {
        ...currentState,
        todos: updatedTodos,
        todoTitle: '',
        isOnEditMode: false,
      };
    });
  };

  return {
    // only return methods
    set,
    update,
    subscribe,
    createTodo,
    deleteTodo,
    updateTodo,
  };
};
// to access all the initial states values we need to add a $ in front of the store like this: $todoStore
export const todoStore = todoProvider();
