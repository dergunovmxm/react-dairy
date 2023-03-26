import { useState } from "react"
import * as types from "../../redux/actionType"
import DairyCard from "../DiaryCard"
import Pagination from "../../UI/Pagination"
import { useDispatch, useSelector } from 'react-redux'
import { loadNotes } from "../../redux/actions"
import { useEffect } from "react"
import axios from '../../axios'
import Filters from "../../UI/Filters"
import empty from '../../assets/empty.png'


const DiaryList = () => {

    let dispatch = useDispatch()
    const notes = useSelector((state) => state.notes)
    const [currentDairy, setCurrentDiary] = useState(notes)


    const [searchValue, setSearchValue] = useState('');
    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };


    const [dairyPage, setDairyPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [totalNotes, setTotalNotes] = useState(0)


    const [sort, setSort] = useState('')
    const [order, setOrder] = useState('')


    // отображение карточек
    useEffect(() => {
        console.log(dairyPage)
        dispatch(loadNotes(searchValue, sort, order, dairyPage, limit))
    }, [searchValue, sort, order, dairyPage, limit])

    useEffect(() => {
        axios.get(`/notes?title_like=${searchValue}`)
            .then((response) => setTotalNotes(response.data.length))
    }, [searchValue])

    // удаение
    useEffect(() => {
        setCurrentDiary(notes)
    }, [notes])

    const removeNote = (id) => {
        axios
            .delete(`/notes/${id}`)
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
        setOrder(order)
    }

    return (
        <>
            <Filters
                onChangeSearchInput={onChangeSearchInput}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                handleSort={handleSort} />

            <div className="dairy__items">

                {currentDairy.length ? notes.map((item, i) => <DairyCard {...item} key={i} removeNote={removeNote} />)
                    :
                    <div className="emptySearch">
                        <img src={empty} alt='emptySearch' />
                        <span>Ничего не найдено</span>
                    </div>}
            </div>
            {currentDairy.length ?
                <Pagination setDairyPage={setDairyPage} totalNotes={totalNotes} limit={limit} /> : <></>}
        </>

    )
}

export default DiaryList