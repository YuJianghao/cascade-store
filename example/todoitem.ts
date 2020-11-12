import service, { ITodoItem } from "./service";
import { getState, IArrayStore } from "../src";
export type TodoItemStatus = "refreshing" | "done" | "adding" | "loading";
export interface TodoitemState {
  data: ITodoItem;
  status: TodoItemStatus;
}
const state: TodoitemState[] = [];
const mutations = {
  refreshTodo: async (arg: TodoitemState | number) => {
    const s = getState(arg, state);
    if (s.status === "refreshing") return;
    s.status = "refreshing";
    const updated = await service.gettodo(s.data.id);
    if (!updated) {
      s.status = "done";
      return;
    }
    s.data = updated;
    s.status = "done";
  },
};
const parse = (data: ITodoItem, status: TodoItemStatus) => {
  return { data, status };
};
const store: IArrayStore<TodoitemState> = {
  state,
  mutations,
  getters: {},
  parse,
};
export default store;
