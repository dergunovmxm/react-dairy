import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentRepository from '../../API/Repositories/commentRepository';

export const fetchComments = createAsyncThunk('comments/fetchNotes', async (diaryId) => {
  const { data } = await commentRepository.getComments(diaryId);
  return data;
});

const initialState = {
  comments: {
    items: [],
    status: 'loading',
  },
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {

    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'loaded';
    },
    [fetchComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = 'loaded';
    },

  },
});

export const commentsReducer = commentsSlice.reducer;
