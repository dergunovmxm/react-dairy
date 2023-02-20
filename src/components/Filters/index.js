import './Filters.scss'
import { FiChevronDown, FiArrowDown, FiArrowUp, FiCompass } from 'react-icons/fi'
import { useState } from 'react'

const Filters = ({ onChangeSearchInput, searchValue, setSearchValue, handleSort, sort}) => {

    const sortOptions = [{ "key": "date", "value": "По дате", "order": "asc" },
    { "key": "title", "value": "По названию", "order": "desc" },]

    return (
        <div className='tools'>
            <div className='tools__adding'
                onClick={() => {
                    window.location.assign(
                        `http://localhost:3000/create_note`
                    )
                }}>
                <span>Добавить запись</span>
            </div>

            <div className='tools__filtering' >

                <select
                    onChange={handleSort}
                    value={sort}
                >

                    <option>Сортировка</option>
                    {sortOptions.map((item, index) => (
                        <option value={item.key} key={index} order={item.order}>
                            {item.value}
                        </option>
                    ))}
                </select>



            </div>

            <div className="tools__search">
                {
                    searchValue &&
                    <img className="clear"
                        src="/images/btn-remove.svg"
                        alt="Close"
                        onClick={() => setSearchValue('')}
                    />
                }

                <img src="/images/search.svg" alt="Search" />
                <input
                    onChange={onChangeSearchInput}
                    placeholder="Поиск..."
                    value={searchValue}
                />
            </div>

        </div>
    )
}

export default Filters