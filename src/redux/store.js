
import { configureStore } from "@reduxjs/toolkit";
import { notesReducer } from "./slices/notes";
import { commentsReducer } from "./slices/comments";
import { paginationReducer } from "./slices/pagination";


const store = configureStore({
  reducer: {
    notes: notesReducer,
    comments: commentsReducer,
    pagination: paginationReducer
  }
})

export default store

