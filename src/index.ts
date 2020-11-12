export interface IObjStore<T> {
  state: T;
  mutations: {
    [key: string]: (...args: any[]) => void | Promise<void>;
  };
  getters: {
    readonly [key: string]: any;
  };
}
export interface IArrayStore<T> {
  /**
   * state list.
   *
   * This list can only be **clear / add / remove / reorder** by outside.
   * When adding a new state, the state generated from mutations.parse()
   * should be used. **DO NOT** build state yourself. Cause it will break
   * **one-way data flows** principle.
   */
  state: T[];
  /**
   * mutations called by state item or state index
   */
  mutations: {
    [key: string]:
      | ((state: T, ...args: any[]) => void | Promise<void>)
      | ((index: number, ...args: any[]) => void | Promise<void>);
  };
  /**
   * getters function will be called by state item or state index
   */
  getters: {
    readonly [key: string]: ((state: T) => any) | ((index: number) => any);
  };
  /**
   * state generator or parser, used to parse state item
   */
  parse: (...args: any[]) => T;
}

export function getState<T>(arg: number | T, state: T[]): T {
  if (typeof arg === "number") {
    if (arg < 0 || arg >= state.length)
      throw new Error(
        `state index ${arg} out of range: state size ${state.length}`
      );
    return state[arg];
  } else return arg;
}
