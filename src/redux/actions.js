import * as types from "./actionType"
import axios from "axios"

const getNotes = (notes) => ({
    type: types.GET_NOTES,
    payload: notes
})

export const loadNotes = () => {
    return function (dispatch) {
        axios
        .get(`${process.env.REACT_APP_API_URL}/notes`)
        .then((response) => {
            dispatch(getNotes(response.data))
        })
        .catch((error) => console.log(error))
    }
}