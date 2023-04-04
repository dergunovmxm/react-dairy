import { useState } from "react"
import DairyCard from "../DiaryCard"
import Pagination from "../UI/Pagination"
import { useDispatch } from 'react-redux'
import { useEffect } from "react"
import axios from '../../axios'
import Filters from "../UI/Filters"
import empty from '../../assets/empty.png'
import './DiaryList.scss'
import Loading from "../UI/Loading"
import { fetchRemoveNotes } from "../../redux/slices/notes"
import { useLocation, useNavigate } from "react-router-dom"


const DiaryList = () => {

    let dispatch = useDispatch()
    const [notes, setNotes] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    const [isEdit, setIsEdit] = useState(false)
    const [sort, setSort] = useState({})
    const navigate = useNavigate();
    const [countNotes, setCountNotes] = useState(0)
    const [limit, setLimit] = useState(4)

    let { search } = useLocation();
    const params = new URLSearchParams(search);
    const page = params.get('_page') || 1;

    const removeNote = (id) => {
        if (window.confirm("Вы действительно хотите удалить запись?")) {
            setIsLoading(true)
            axios.delete(`/notes/${id}`)
                .then(() => {
                    setCountNotes(countNotes - 1)
                    axios
                        .get(`/notes?title_like=${searchValue}&_page=${page}&_limit=${limit}&_sort=${sort.name}&_order=${sort.order}`)
                        .then(({ data }) => {
                            if (!data.length) {
                                
                                navigate(`?_page=${page - 1}&_limit=${limit}`)
                                
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
            .get(`/notes?title_like=${searchValue}`)
            .then(({ data }) => {
                
                setCountNotes(data.length);
                setTimeout(() => {
                    setIsLoading(false)
                }, 100)
            })
            .catch((error) => {
                console.warn(error);
                alert("Не удалось выполниить запрос!");
            });
    }, [searchValue]);
    
    useEffect(() => {
        axios
            .get(`/notes?title_like=${searchValue}&_page=${page}&_limit=${limit}&_sort=${sort.sort}&_order=${sort.order}`)
            .then(({ data }) => {
                
                setNotes(data)
                setIsEdit(false)
                setTimeout(() => {
                    setIsLoading(false)
                }, 100)
               
            })
            .catch((error) => {
                console.warn(error);
                alert("Не удалось выполниить запрос!");
            })

    }, [page, searchValue, sort, isEdit]);


    return (
        <>
            <Filters
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                sort={sort}
                onClickSort={(i) => setSort(i)}
                limit={limit}

            />

            {
                isLoading ? <Loading /> :
                    <>
                        <section className="dairy__items">
                            { !isLoading  && notes.length? notes.map((item) => <DairyCard {...item} key={item.id} removeNote={removeNote} setIsEdit={setIsEdit} isEdit={isEdit}/>)
                                : <div className="emptySearch">
                                    <img src={empty} alt='emptySearch' />
                                    <span>Ничего не найдено</span>
                                </div>}
                        </section>

                        {
                            isLoading ? <></> :
                                notes.length ?
                                    <Pagination page={page} numPages={Math.ceil(countNotes / limit)} limit={limit} /> : <></>
                        }
                    </>
            }
        </>
    )
}

export default DiaryList