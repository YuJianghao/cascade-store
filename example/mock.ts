export function wait<T>(fn: () => T | Promise<T>, timeout = 0) {
  return new Promise<T>((resolve) => {
    window.setTimeout(async () => {
      resolve(await fn());
    }, timeout);
  });
}
export interface IMockConfig {
  lag?: number;
}
export const config = { lag: 1000 };
const mock = { wait };
export default mock;
