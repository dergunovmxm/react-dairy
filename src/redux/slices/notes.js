import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
    const { data } = await axios.get(`/notes`)
    return data
})

export const fetchRemoveNotes = createAsyncThunk('notes/fetchRemoveBooks', async (id) => {
    axios.delete(`/notes/${id}`)
        .then(() => {
            axios.get(`/notes`)
        })
})

const initialState = {
    notes: {
        items: [],
        status: 'loading'
    }
}

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {},
    extraReducers: {
        //Получение статей
        [fetchNotes.fulfilled]: (state, action) => {
            state.notes.items = action.payload
            state.notes.status = 'loaded'
        },
        [fetchNotes.rejected]: (state) => {
            state.notes.items = []
            state.notes.status = 'loaded'
        },

        //Удаление записей
        [fetchRemoveNotes.pending]: (state, action) => {
            state.notes.items = state.notes.items.filter(obj => obj.id !== action.meta.arg)
        }
    }
})

export const notesReducer = notesSlice.reducer