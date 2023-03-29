import { useState } from "react"
import DairyCard from "../DiaryCard"
import Pagination from "../../UI/Pagination"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import axios from '../../axios'
import Filters from "../../UI/Filters"
import empty from '../../assets/empty.png'
import { changeNumPages, changeShowPages, changePage, changeFirstPage, changeMediumPage, changeLastPage } from '../../redux/slices/pagination';
import './DiaryList.scss'



const DiaryList = () => {

    let dispatch = useDispatch()
    const { loadNotes } = useSelector((state) => state.notes);
    const [notes, setNotes] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    const [sort, setSort] = useState('')
    const [order, setOrder] = useState('')
    const { selectPage, numPages } = useSelector((state) => state.pagination);


    // const { selectFilter } = useSelector((state) => state.filterReducer);
    // const { nameSort, typeSort, orderSort } = useSelector((state) => state.sortReducer);

    useEffect(() => {
        axios
            .get(`/notes?title_like=${searchValue}&_page=${selectPage}&_limit=4`)
            .then((responce) => {
                setNotes(responce.data)
                setIsLoading(false)
            })
            .catch((error) => {
                console.warn(error);
                alert("Не удалось выполниить запрос!");
            })

    }, [selectPage, searchValue]);

    useEffect(() => {
        axios
            .get(`/notes?title_like=${searchValue}`)
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

            })
            .catch((error) => {
                console.warn(error);
                alert("Не удалось выполниить запрос!");
            });
    }, [searchValue]);


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


    // удаение


    // const handleSort = (event) => {
    //     const { value } = event.target
    //     setSort(value)
    //     setOrder(order)
    // }

    return (
        <>
            <Filters
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            // handleSort={handleSort}
            />

            {isLoading ?
                <section className="dairy__loading">Загрузка...</section>

                : <section className="dairy__items">
                    {notes.length ? notes.map((item) => <DairyCard {...item} key={item.id} />)
                        : <div className="emptySearch">
                            <img src={empty} alt='emptySearch' />
                            <span>Ничего не найдено</span>
                        </div>}
                </section>}

            {
                isLoading ? <></> :
                    notes.length ?
                        <Pagination /> : <></>
            }

            {/* 

            <div className="dairy__items">

                {notes.map((item, i) => <DairyCard {...item} key={i} removeNote={removeNote} />)
                    
           
                }
            </div>
             */}
        </>

    )
}

export default DiaryList