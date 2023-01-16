import './Tools.scss'
import { FiChevronDown } from 'react-icons/fi'

const Tools = ({ onChangeSearchInput, searchValue, setSearchValue }) => {
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

            <div className='tools__filtering'>
                <span>Сортировка</span>
                <FiChevronDown />
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