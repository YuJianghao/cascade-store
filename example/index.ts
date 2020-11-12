import faker from "faker";
import uniqueId from "lodash/uniqueId";
import service from "./service";
import todoitem, { TodoitemState } from "./todoitem";
import { IArrayStore, IObjStore } from "../src";

export type TodoItemStatus = "refreshing" | "done" | "adding" | "loading";
export type TodoStatus = "loading" | "done";
export interface IAppState {
  todos: IArrayStore<TodoitemState>;
  status: TodoStatus;
}
const state: IAppState = {
  todos: todoitem,
  status: "done",
};
const mutations = {
  loadTodos: async () => {
    if (state.status === "loading") return;
    state.status = "loading";
    const data = await service.listtodo();
    state.todos.state = data.map((item) => {
      return state.todos.parse(item, "done");
    });
    state.status = "done";
  },
  addTodo: async () => {
    const item: TodoitemState = state.todos.parse(
      {
        id: "fake-" + uniqueId(),
        text: "",
      },
      "adding"
    );
    const idx = state.todos.state.length;
    state.todos.state[idx] = item; // Vue.set if using vue.js
    const added = await service.addtodo({ text: faker.lorem.words() });
    item.data = added;
    item.status = "done";
  },
  removeTodo: async (todo: TodoitemState) => {
    const idx = state.todos.state.indexOf(todo);
    delete state.todos.state[idx]; // Vue.delete if using vue.js
    await service.deletetodo(todo.data.id);
  },
};
const getters = {
  get isloading() {
    return state.status === "loading";
  },
};
const store: IObjStore<IAppState> = { state, mutations, getters };
export default store;
