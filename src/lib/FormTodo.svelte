<script lang="ts">
  import type { FormEvent } from 'src/types/types';
  import { todoStore } from '../store/todo/todoStore';

  const { createTodo } = todoStore;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if todo is not in edit mode, create a new todo
    if (!$todoStore.isOnEditMode) {
      createTodo($todoStore.todoTitle);
      return;
    }
    // otherwise, update the todo
    todoStore.updateTodo($todoStore.todoSelected.id, $todoStore.todoTitle);
  };
</script>

<form class="flex flex-col gap-4" on:submit={handleSubmit}>
  <label for="">Crea un todo</label>
  <input type="text" class="p-2 border" bind:value={$todoStore.todoTitle} />
  <button type="submit" class="p-2 bg-purple-300 hover:bg-purple-400 rounded">
    {#if $todoStore.isOnEditMode}
      Update
    {:else}
      Create
    {/if}
  </button>
</form>
