import { v4 as uuid } from "uuid";
import faker from "faker";
import mock, { config } from "./mock";
import { cloneDeep } from "lodash";
export interface ITodoItem {
  id: string;
  text: string;
}
export interface ITodoAdd {
  text?: string;
}
export interface IMockDB {
  todo: ITodoItem[];
}
export const db: IMockDB = {
  todo: new Array(3).fill(0).map(() => {
    return { id: uuid(), text: faker.lorem.words() + faker.lorem.words() };
  }),
};

class Service {
  async listtodo() {
    return mock.wait(() => {
      return cloneDeep(db.todo);
    }, config.lag);
  }
  async addtodo(opts?: ITodoAdd): Promise<ITodoItem> {
    return mock.wait(() => {
      const id = uuid();
      const text = opts?.text || "";
      const newtodo = {
        id,
        text,
      };
      db.todo.push(newtodo);
      return cloneDeep(newtodo);
    }, config.lag);
  }
  async deletetodo(id: string): Promise<ITodoItem | null> {
    return mock.wait(() => {
      const idx = db.todo.map((i) => i.id).indexOf(id);
      if (idx < -1) return null;
      const delteted = db.todo[idx];
      db.todo.splice(idx, 1);
      return cloneDeep(delteted);
    }, config.lag);
  }
  async gettodo(id: string): Promise<ITodoItem | null> {
    return mock.wait(() => {
      const idx = db.todo.map((i) => i.id).indexOf(id);
      if (idx < -1) return null;
      return cloneDeep(db.todo[idx]);
    }, config.lag);
  }
}
const service = new Service();

export default service;
