export type Todo = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FormEvent<T> = SubmitEvent & {
  currentTarget: EventTarget & T;
};
