import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sortName: "-",
    type: "id",
    order: "asc"
}

const sortSlice = createSlice({
    name: "sort",
    initialState,
    reducers: {
        setName(state, action) {
            state.sortName = action.payload;
        },
        setType(state, action) {
            state.type = action.payload;
        },
        setOrder(state, action) {
            state.order = action.payload;
        }
    }
})


export const {setName, setOrder, setType} = sortSlice.actions

export const sortReducer = sortSlice.reducer