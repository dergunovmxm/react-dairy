import * as types from "./actionType"
import axios from "axios"

const getNotes = (notes) => ({
    type: types.GET_NOTES,
    payload: notes
})

const getComments= (comments) => ({
    type: types.GET_COMMENTS,
    payload: comments
})

export const loadNotes = (searchValue, upDateSort) => {
    return function (dispatch) {
        axios
        .get(`${process.env.REACT_APP_API_URL}/notes/?title_like=${searchValue}`)
        .then((response) => {
            dispatch(getNotes(response.data))
        })
        .catch((error) => console.log(error))
    }
}

export const loadComments = () => {
    return function (dispatch) {
        axios
        .get(`${process.env.REACT_APP_API_URL}/comments`)
        .then((response) => {
            dispatch(getComments(response.data))
            console.log(response.data)
        })
        .catch((error) => console.log(error))
    }
}
