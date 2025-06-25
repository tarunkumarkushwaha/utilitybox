import { createSlice } from '@reduxjs/toolkit'

const initialState =  JSON.parse(localStorage.getItem('items')) || []


export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload)
    },
    deletetodo: (state, action) => {
      state.splice( action.payload, 1);
      localStorage.setItem('items', JSON.stringify(state));
    },

    deleteall: () => {
      localStorage.setItem('items', JSON.stringify());
      return []
    },

    modTodo: (state,action) => {
      const item = {
        ...action.payload,
        completed: action.payload.check
      }
      state.splice(action.payload.id, 1, item);
      // localStorage.setItem('items', JSON.stringify(state));
    },
  },
})

export const { addTodo ,deletetodo,deleteall,modTodo } = todoSlice.actions

export default todoSlice.reducer