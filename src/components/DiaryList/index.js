import { useState } from "react"
import * as types from "../../redux/actionType"
import DairyCard from "../DiaryCard"
import Pagination from "../Pagination"
import { useDispatch, useSelector } from 'react-redux'
import { loadNotes } from "../../redux/actions"
import { useEffect } from "react"
import axios from "axios"
import  Filters from "../Tools"

const DiaryList = () => {

    const [dairyPage, setDairyPage] = useState(1)
    const [dairyPerPage] = useState(70)
    const [searchNotes, setSearchNotes] = useState([])

    const lastDairyIndex = dairyPage * dairyPerPage
    const firstDairyPage = lastDairyIndex - dairyPerPage

    const paginate = pageNumber => setDairyPage(pageNumber)

    let dispatch = useDispatch()
    const notes = useSelector((state) => state.notes)
    const [currentDairy, setCurrentDiary] = useState(notes.slice(firstDairyPage, lastDairyIndex))


    const [searchValue, setSearchValue] = useState('');
    const onChangeSearchInput = (event) => {
  
      setSearchValue(event.target.value);
    };

    const [sort, setSort] = useState('')
    const [order, setOrder] = useState('asc')
  
    // отображение карточек
    useEffect(() => {
        dispatch(loadNotes(searchValue, sort, order))
    }, [searchValue, sort, order])


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

    const handleSort = (event) => {
        const { value } = event.target
        setSort(value)
        setOrder('desc')
    }



    return (
        <>
            <Filters
                onChangeSearchInput={onChangeSearchInput}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                handleSort={handleSort} />

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