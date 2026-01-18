import { safeStorageSet } from "../../utils/safeStorage";

const SAVE_ACTIONS = [
  "todo/addTodo",
  "todo/deletetodo",
  "todo/deleteall",
  "todo/modTodo",
];

export const todoStorageMiddleware = store => next => action => {
  const result = next(action);

  if (SAVE_ACTIONS.includes(action.type)) {
    safeStorageSet("items", store.getState().TODO);
  }

  return result;
};

