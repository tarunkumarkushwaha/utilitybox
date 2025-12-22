import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const isChromeExtension = () =>
  typeof chrome !== "undefined" && chrome.storage?.local;

const safeStorageSet = (key, value) => {
  if (isChromeExtension()) {
    chrome.storage.local.set({ [key]: value });
  }
};

const safeStorageGet = (key) => {
  return new Promise((resolve) => {
    if (isChromeExtension()) {
      chrome.storage.local.get([key], (result) => resolve(result[key]));
    } else {
      resolve(null);
    }
  });
};


export const loadTodos = createAsyncThunk(
  "todo/loadTodos",
  async () => {
    const data = await safeStorageGet("items");
    return data ? JSON.parse(data) : [];
  }
);


const initialState = [];


export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.unshift(action.payload);
      safeStorageSet("items", JSON.stringify(state));
    },

    deletetodo: (state, action) => {
      state.splice(action.payload, 1);
      safeStorageSet("items", JSON.stringify(state));
    },

    deleteall: () => {
      safeStorageSet("items", JSON.stringify([]));
      return [];
    },

    modTodo: (state, action) => {
      const { id, check, ...rest } = action.payload;

      state[id] = {
        ...rest,
        completed: check,
      };

      safeStorageSet("items", JSON.stringify(state));
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadTodos.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});


export const {
  addTodo,
  deletetodo,
  deleteall,
  modTodo,
} = todoSlice.actions;

export default todoSlice.reducer;