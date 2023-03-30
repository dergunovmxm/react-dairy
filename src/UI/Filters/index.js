import './Filters.scss'
import close from '../../assets/btn-remove.svg'
import search from '../../assets/search.svg'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState, useRef, useEffect } from 'react';

const Filters = ({ searchValue, setSearchValue }) => {

    const sortOptions = [

        {
            sortName: "По возрастанию даты",
            type: "date",
            order: "asc"
        },
        {
            sortName: "По убыванию даты",
            type: "date",
            order: "desc"
        },

        {
            sortName: "По алфавиту в прямом порядке",
            type: "name",
            order: "asc"
        },

        {
            sortName: "По алфавиту в обратном порядке",
            type: "name",
            order: "desc"
        },


    ]

    return (

        <header className='tools'>
            <Link to='create_note'>
                <div className='tools__adding'>
                    <span>Добавить запись</span>
                </div>
            </Link>


            <div className='tools__filtering' >

                <select
                // onChange={handleSort}
                // value={sort}
                >

                    <option>Сортировка</option>
                    {sortOptions.map((item, index) => (
                        <option value={item.sortName} key={index}>
                            {item.sortName}
                        </option>
                    ))}
                </select>
            </div>

            <div className="tools__search">
                {
                    searchValue &&
                    <img className="clear"
                        src={close}
                        alt="Close"
                        onClick={() => setSearchValue('')}
                    />
                }

                <img src={search} alt="Search" />
                <input
                    onChange={(event) => {setSearchValue(event.target.value)}}
                    placeholder="Поиск..."
                    value={searchValue}
                />
            </div>

        </header>
    )
}

export default Filters