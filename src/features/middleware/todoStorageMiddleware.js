import { safeStorageSet } from "../../utils/safeStorage";

export const todoStorageMiddleware = store => next => action => {
  const result = next(action);

  if (action.type.startsWith("todo/")) {
    const state = store.getState().TODO;
    safeStorageSet("items", state);
  }

  return result;
};
