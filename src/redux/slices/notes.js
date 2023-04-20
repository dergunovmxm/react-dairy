import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../API/Service';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const { data } = await axios.get('/notes');
  return data;
});

const initialState = {
  notes: {
    items: [],
    status: 'loading',
  },
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: {
    // Получение статей
    [fetchNotes.fulfilled]: (state, action) => {
      state.notes.items = action.payload;
      state.notes.status = 'loaded';
    },
    [fetchNotes.rejected]: (state) => {
      state.notes.items = [];
      state.notes.status = 'loaded';
    },
  },
});

export const notesReducer = notesSlice.reducer;
