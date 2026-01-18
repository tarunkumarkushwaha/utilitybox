import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { safeStorageGet } from "../../utils/safeStorage";


export const loadTodos = createAsyncThunk(
  "todo/loadTodos",
  async () => {
    const data = await safeStorageGet("items");
    // console.log(data,"todo old")
    return Array.isArray(data) ? data : [];
  }
);


const initialState = [];


export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.unshift(action.payload);
    },

    deletetodo: (state, action) => {
      state.splice(action.payload, 1);
    },

    deleteall: () => {
      return [];
    },

    modTodo: (state, action) => {
      const { id, check, ...rest } = action.payload;

      state[id] = {
        ...rest,
        completed: check,
      };
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