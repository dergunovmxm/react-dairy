import './Filters.scss'
import close from '../../assets/btn-remove.svg'
import search from '../../assets/search.svg'
import { Link } from 'react-router-dom'

const Filters = ({ searchValue, setSearchValue, handleSort, sort }) => {

    const sortOptions = [{ "key": "date", "value": "По дате", "order": "asc" },
    { "key": "title", "value": "По названию", "order": "desc" },]

    return (

        <header className='tools'>
            <Link to='create_note'>
            <div className='tools__adding'>
                <span>Добавить запись</span>
            </div>
            </Link>
            

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
                        src={close}
                        alt="Close"
                        onClick={() => setSearchValue('')}
                    />
                }

                <img src={search} alt="Search" />
                <input
                    onChange={(event)=> setSearchValue(event.target.value)}
                    placeholder="Поиск..."
                    value={searchValue}
                />
            </div>

        </header>
    )
}

export default Filters