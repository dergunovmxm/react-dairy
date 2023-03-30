import { useState } from "react"
import DairyCard from "../DiaryCard"
import Pagination from "../../UI/Pagination"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"
import axios from '../../axios'
import Filters from "../../UI/Filters"
import empty from '../../assets/empty.png'
import './DiaryList.scss'
import { Loading } from "../../UI"
import { fetchRemoveNotes } from "../../redux/slices/notes"
import { useLocation, useNavigate } from "react-router-dom"


const DiaryList = () => {

    let dispatch = useDispatch()
    const [notes, setNotes] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    const [sort, setSort] = useState('')
    const [order, setOrder] = useState('')
    const navigate = useNavigate();
    const [numPages, setNumPages] = useState(0);

    let { search } = useLocation();
    const params = new URLSearchParams(search);
    const page = params.get('_page') || 1;

    const removeNote = (id) => {
        if (window.confirm("Вы действительно хотите удалить запись?")) {
            setIsLoading(true)
            axios.delete(`/notes/${id}`)
                .then(() => {
                    axios
                        .get(`/notes?title_like=${searchValue}&_page=${page}&_limit=4`)
                        .then(({ data }) => {
                            if (!data.length) {
                                
                                navigate(`?_page=${page - 1}&_limit=4`)
                                setNumPages(numPages - 1)
                            } else {
                                setNotes(data)
                                setIsLoading(false)
                            }
                        })
                        .catch((error) => {
                            console.warn(error);
                            alert("Не удалось выполниить запрос!");
                        })
                })
            dispatch(fetchRemoveNotes(id))
        }
    }

    useEffect(() => {
        axios
            .get(`/notes?title_like=${searchValue}&_page=${page}&_limit=4`)
            .then((responce) => {
                setNotes(responce.data)
                setIsLoading(false)
            })
            .catch((error) => {
                console.warn(error);
                alert("Не удалось выполниить запрос!");
            })

    }, [page, searchValue]);

    useEffect(() => {
        axios
            .get(`/notes?title_like=${searchValue}`)
            .then(({ data }) => {
                setIsLoading(false)
                setNumPages(Math.ceil(data.length / 4));
            })
            .catch((error) => {
                console.warn(error);
                alert("Не удалось выполниить запрос!");
            });
    }, [searchValue]);

    return (
        <>
            <Filters
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            // handleSort={handleSort}
            />

            {
                isLoading ? <Loading /> :
                    <>
                        <section className="dairy__items">
                            {notes.length ? notes.map((item) => <DairyCard {...item} key={item.id} removeNote={removeNote} />)
                                : <div className="emptySearch">
                                    <img src={empty} alt='emptySearch' />
                                    <span>Ничего не найдено</span>
                                </div>}
                        </section>

                        {
                            isLoading ? <></> :
                                notes.length ?
                                    <Pagination page={page} numPages={numPages} /> : <></>
                        }
                    </>
            }
        </>
    )
}

export default DiaryList