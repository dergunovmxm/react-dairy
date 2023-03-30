import { configureStore } from "@reduxjs/toolkit";
import { notesReducer } from "./slices/notes";
import { commentsReducer } from "./slices/comments";

const store = configureStore({
  reducer: {
    notes: notesReducer,
    comments: commentsReducer,
  }
})

export default store

