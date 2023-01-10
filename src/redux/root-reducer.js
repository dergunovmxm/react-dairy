import { combineReducers } from "redux";
import notesReducer from "./reducer";

const rootReducer = combineReducers({
    notes: notesReducer
})

export default rootReducer