import * as types from "./actionType"
import axios from "../axios"
// import { type } from "@testing-library/user-event/dist/type"

const getNotes = (notes) => ({
    type: types.GET_NOTES,
    payload: notes
})

const getComments = (comments) => ({
    type: types.GET_COMMENTS,
    payload: comments
})

const getCurrentNote = () => ({
    type: types.GET_CURRENT_NOTE,
})

export const loadNotes = (searchValue, sort, order, dairyPage, limit) => {
    return function (dispatch) {
        axios
            .get(`/notes/?title_like=${searchValue}&_sort=${sort}&_order=${order}&_page=${dairyPage}&_limit=${limit}}`)
            .then((response) => {
                dispatch(getNotes(response.data))
            })
            .catch((error) => console.log(error))
    }
}

export const loadComments = (id) => {
    return function (dispatch) {
        axios
            .get(`/comments?noteId=${id}`)
            .then((response) => {
                dispatch(getComments(response.data))
                console.log(response.data)
            })
            .catch((error) => console.log(error))
    }
}


export const currentNote = (id) => {
    return function (dispatch) {
        axios
            .get(`/notes/?id=${id}`)
            .then((response) => {
                dispatch(getCurrentNote(response.data))
            })
            .catch((error) => console.log(error))
    }
}
