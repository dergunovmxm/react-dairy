import { configureStore } from '@reduxjs/toolkit';
import { commentsReducer } from './slices/comments';

const store = configureStore({
  reducer: {
    comments: commentsReducer,
  },
});

export default store;
