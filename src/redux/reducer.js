import * as types from "./actionType"

const initialState = {
    notes: [],
    note: {},
    loading: true,
}

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_NOTES:
            return{
                ...state,
                notes: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export default notesReducer