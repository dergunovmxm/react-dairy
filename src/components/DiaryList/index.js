import { useState } from "react"
import * as types from "../../redux/actionType"
import DairyCard from "../DiaryCard"
import Pagination from "../Pagination"
import { useDispatch, useSelector } from 'react-redux'
import { loadNotes } from "../../redux/actions"
import { useEffect } from "react"
import axios from "axios"
import Tools from "../Tools"

const DiaryList = ({ searchValue, setSearchValue, onChangeSearchInput }) => {

    const [dairyPage, setDairyPage] = useState(1)
    const [dairyPerPage] = useState(50)
    const [searchNotes, setSearchNotes] = useState([])

    const lastDairyIndex = dairyPage * dairyPerPage
    const firstDairyPage = lastDairyIndex - dairyPerPage

    const paginate = pageNumber => setDairyPage(pageNumber)

    let dispatch = useDispatch()
    const notes = useSelector((state) => state.notes)
    const [currentDairy, setCurrentDiary] = useState(notes.slice(firstDairyPage, lastDairyIndex))

    // отображение карточек
    useEffect(() => {
        dispatch(loadNotes(searchValue))
    }, [searchValue])


    // удаение
    useEffect(() => {
        setCurrentDiary(notes.slice(firstDairyPage, lastDairyIndex))
    }, [notes])
    const removeNote = (id) => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/notes/${id}`)
            .then(() => {
                dispatch({
                    type: types.GET_NOTES,
                    payload: notes.filter((note) => note.id !== id)
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <Tools
                onChangeSearchInput={onChangeSearchInput}
                searchValue={searchValue}
                setSearchValue={setSearchValue} />

            <div className="dairy__items">

                {currentDairy.length ? currentDairy.map((item) => <DairyCard {...item} removeNote={removeNote} />)
                    :
                    <div className="emptySearch">
                        <img src="images/empty.png" alt='emptySearch' />
                        <span>Ничего не найдено</span>
                    </div>}
            </div>

        </>



    )
}

export default DiaryList