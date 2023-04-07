import close from '../../../assets/btn-remove.svg'
import search from '../../../assets/search.svg'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import './Filters.scss'

const Filters = ({ searchValue, setSearchValue, sort, onClickSort, limit }) => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [label, setLabel] = useState("Сортировка")

    const list = [
        {
            name: 'Сортировка',
        },
        {
            name: 'По дате Up',
            sort: 'date',
            order: 'asc'
        }, {
            name: 'По дате Down',
            sort: 'date',
            order: 'desc'
        }, {
            name: 'По алфавиту Up',
            sort: 'title',
            order: 'asc'
        }, {
            name: 'По алфавиту Down',
            sort: 'title',
            order: 'desc'
        } ]

    const onClickItem = (i) => {
        onClickSort(i)
        setOpen(false)
        navigate(`?_page=${1}&_limit=${limit}`)
    }

    return (

        <header className='tools'>


            <div className='tools-filtering' >

                <div className='tools-filtering__label' onClick={() => setOpen(!open)}>

                    <span>{label}</span>

                </div>
                {
                    open ?
                        <div className='tools-filtering__sortList'>
                            <ul>
                                {
                                    list.map((item, i) => (
                                        <li key={i}
                                            onClick={() => { onClickItem(item); setLabel(item.name); }}
                                        >
                                            {item.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        : <></>
                }

            </div>



            <div className="tools-search">
             

                <img src={search} alt="Search" />
                <input
                    onChange={(event) => { setSearchValue(event.target.value); navigate(`?_page=${1}&_limit=${limit}`) }}
                    placeholder="Поиск..."
                    value={searchValue}
                />
                   {
                    searchValue &&
                    <img className="clear"
                        src={close}
                        alt="Close"
                        onClick={() => setSearchValue('')}
                    />
                }
            </div>

            <Link to='create_note'>
                <div className='tools-adding'>
                    <span>Добавить запись</span>
                </div>
            </Link>

        </header>
    )
}

export default Filters