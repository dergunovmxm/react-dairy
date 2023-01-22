import * as types from "./actionType"

const initialState = {
    notes: [],
    comments: [],
    note: {},
    loading: true,
}

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_NOTES:
            return{
                ...state,
                notes: action.payload,
                // loading: false
            }
        case types.GET_COMMENTS:
            return{
                ...state,
                comments: action.payload
            }
        default:
            return state
    }
}

export default notesReducer