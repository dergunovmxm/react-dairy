import * as types from "./actionType"
import axios from "axios"

const getNotes = (notes) => ({
    type: types.GET_NOTES,
    payload: notes
})

export const loadNotes = (searchValue, curDate) => {
    return function (dispatch) {
        axios
        .get(`${process.env.REACT_APP_API_URL}/notes/?title_like=${searchValue}&`)
        .then((response) => {
            dispatch(getNotes(response.data))
        })
        .catch((error) => console.log(error))
    }
}