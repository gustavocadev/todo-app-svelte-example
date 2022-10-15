<script lang="ts">
  import { todoStore } from '../store/todo/todoStore';
  import type { Todo } from 'src/types/types';

  export let todo: Todo;
  export let idx: number;

  const { deleteTodo } = todoStore;

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  const handleUpdateTodo = (id: string) => {
    const todo = $todoStore.todos.find((todo) => todo.id === id);

    todoStore.update((state) => {
      return {
        ...state,
        todoSelected: todo,
        todoTitle: todo.title,
        isOnEditMode: true,
      };
    });
  };
</script>

<li class="p-4 bg-purple-100 rounded flex justify-between items-center">
  <p>{idx + 1}. {todo.title}</p>
  <section class="flex gap-2">
    <button
      class="px-4 py-2 rounded bg-red-300 hover:bg-red-400"
      on:click={() => handleDeleteTodo(todo.id)}
    >
      >Delete</button
    >

    <button
      class="px-4 py-2 rounded bg-yellow-200 hover:bg-yellow-300"
      on:click={() => handleUpdateTodo(todo.id)}
    >
      >Edit</button
    >
  </section>
</li>
