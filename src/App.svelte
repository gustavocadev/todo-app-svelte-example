<script>
  import FormTodo from './lib/FormTodo.svelte';
  import ListTodos from './lib/ListTodos.svelte';
  import { todoStore } from './store/todo/todoStore';

  let todos = JSON.parse(localStorage.getItem('todos') ?? '[]');
  todoStore.update((state) => {
    console.log(todos);
    state.todos = todos;
    return state;
  });

  $: localStorage.setItem('todos', JSON.stringify($todoStore.todos));
</script>

<main class="px-[20px]">
  <h1 class="text-5xl">CRUD</h1>
  <FormTodo />
  <ul class="mt-4 flex flex-col gap-4">
    {#each $todoStore.todos as todo, idx}
      <ListTodos {todo} {idx} />
    {/each}
  </ul>
</main>
