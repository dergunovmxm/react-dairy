import { useState } from "react"
import DairyCard from "../DiaryCard"
import Pagination from "../../UI/Pagination"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import axios from '../../axios'
import Filters from "../../UI/Filters"
import empty from '../../assets/empty.png'
import { fetchNotes } from "../../redux/slices/notes"
import {
    changeNumPages,
    changeShowPages,
    changePage,
    changeFirstPage,
    changeMediumPage,
    changeLastPage,
} from '../../redux/slices/pagination';


const DiaryList = () => {

    let dispatch = useDispatch()
    // const { notes } = useSelector((state) => state.notes);
    const [notes, setNotes] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [sort, setSort] = useState('')
    const [order, setOrder] = useState('')
    const { selectPage, numPages } = useSelector((state) => state.pagination);
    
    // const { selectFilter } = useSelector((state) => state.filterReducer);
    // const { nameSort, typeSort, orderSort } = useSelector((state) => state.sortReducer);

    useEffect(() => {
        axios
            .get(`/notes`)
            .then((response) => {
                const n = Math.ceil(response.data.length / 4);
                if (n !== numPages) {
                    dispatch(changeFirstPage(1));
                    dispatch(changePage(1));
                }
                dispatch(changeNumPages(n));
                if (n === 1) {
                    dispatch(changeLastPage(1));
                    dispatch(changeMediumPage(1));
                    dispatch(changeShowPages(1));
                } else if (n === 2) {
                    dispatch(changeLastPage(2));
                    dispatch(changeMediumPage(1));
                    dispatch(changeShowPages(2));
                } else if (n >= 3 && n < 5) {
                    dispatch(changeLastPage(3));
                    dispatch(changeMediumPage(2));
                    dispatch(changeShowPages(3));
                } else {
                    dispatch(changeLastPage(5));
                    dispatch(changeMediumPage(3));
                    dispatch(changeShowPages(5));
                }
            });
    }, []);

    useEffect(() => {
        axios
            .get(`/notes?_page=${selectPage}&_limit=4`)
            // .get(`/notes`)
            .then((responce) => {
                setNotes(responce.data)
            })
    }, [selectPage]);

    // useEffect(() => {
    //     // бек, который я использовал, не выдаёт запросы при одновременном использовании поиска и фильтрации. поэтому на сайте этого не будет
    //     if (searchValue) {
    //         axios
    //             .get(`notes?search=${searchValue}&sortBy=${typeSort}&order=${orderSort}&page=${selectPage}&limit=6`,)
    //     } else {
    //         axios
    //             .get(`notes?category=${selectFilter}&sortBy=${typeSort}&order=${orderSort}&page=${selectPage}&limit=6`,)

    //     }
    // }, [selectPage, selectFilter, searchValue, nameSort]);

    // useEffect(() => {
    //     console.log(dairyPage)
    //     dispatch(loadNotes(searchValue, sort, order, dairyPage, limit))
    // }, [searchValue, sort, order, dairyPage, limit])

    // useEffect(() => {
    //     axios.get(`/notes?title_like=${searchValue}`)
    //         .then((response) => setTotalNotes(response.data.length))
    //         .catch((error) => {
    //             console.warn(error);
    //             alert("Не удалось выполниить запрос!");
    //         })
    // }, [searchValue])

    // удаение
    // useEffect(() => {
    //     setCurrentDiary(notes)
    // }, [notes])

    // const removeNote = (id) => {
    //     axios
    //         .delete(`/notes/${id}`)
    //         .then(() => {
    //             dispatch({
    //                 type: types.GET_NOTES,
    //                 payload: notes.filter((note) => note.id !== id)
    //             })
    //         })
    //         .catch((error) => {
    //             console.warn(error);
    //             alert("Не удалось выполниить запрос!");
    //         })
    // }

    const handleSort = (event) => {
        const { value } = event.target
        setSort(value)
        setOrder(order)
    }
   
    return (
        <>
            <Filters

                searchValue={searchValue}
                setSearchValue={setSearchValue}
                handleSort={handleSort} />

            <section className="dairy__items">
                {notes.map((item) => <DairyCard {...item} key={item.id} />)}
            </section>

            <Pagination />
            {/* 

            <div className="dairy__items">

                {notes.map((item, i) => <DairyCard {...item} key={i} removeNote={removeNote} />)
                    
                    // <div className="emptySearch">
                    //     <img src={empty} alt='emptySearch' />
                    //     <span>Ничего не найдено</span>
                    // </div>
                }
            </div>
            
                <Pagination setDairyPage={setDairyPage} totalNotes={totalNotes} limit={limit} /> */}
        </>

    )
}

export default DiaryList