import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todos/todoSlice'
import { todoStorageMiddleware } from '../features/middleware/todoStorageMiddleware'

export const store = configureStore({
    reducer: {
        TODO: todoReducer
    },
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(todoStorageMiddleware),
})