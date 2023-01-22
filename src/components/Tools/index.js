import './Tools.scss'
import { FiChevronDown, FiArrowDown, FiArrowUp, FiCompass } from 'react-icons/fi'
import { useState } from 'react'

const Tools = ({ onChangeSearchInput, searchValue, setSearchValue, handleSort }) => {

    const [isSortOpen, setIsSortOpen] = useState(false)
    const [sortValue, setSortValue] = useState('')
    const sortOptions = ["По дате", "По названию"]
    return (
        <div className={`tools ${isSortOpen ? "active" : "inactive"}`}>
            <div className='tools__adding'
                onClick={() => {
                    window.location.assign(
                        `http://localhost:3000/create_note`
                    )
                }}>
                <span>Добавить запись</span>
            </div>

            <div className='tools__filtering' >

                {/* <div className='tools__filtering__menu' onClick={() => setIsSortOpen(!isSortOpen)}>
                    <span>Сортировка</span>
                    <FiChevronDown />
                </div> */}

                <select
                    //  className={`tools__filtering__items ${isSortOpen ? "active" : "inactive"}`} 
                    onChange={handleSort}
                    value={sortValue}
                >

                    <option>Сортировка</option>
                    {sortOptions.map((item, index) => (
                        <option value={item} key={index}>
                            {item}
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

export default Tools