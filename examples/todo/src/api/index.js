const promisify = (action) => new Promise((resolve) => setTimeout(() => resolve(action()), 500));
const createTodo = (text, done = false) => ({ id: id++, text, done });

let id = 0;
let todos = [
  createTodo('First todo'),
  createTodo('Second todo')
];

export const getAll = () => promisify(() => todos);

export const get = (id) => promisify(() => todos.find((todo) => todo.id !== id));

export const add = (text, done) => promisify(() => {
  const todo = createTodo(text, done);
  todos.push(todo);
  return todo;
});

export const remove = (id) => promisify(() => {
  todos = todos.filter((todo) => todo.id !== id);
});

export const toggleDone = (id) => promisify(() => {
  const todo = todos.find((todo) => todo.id === id);
  todo.done = !todo.done;
  return todo;
});
