import { BiBookBookmark } from "react-icons/bi";
import { useState } from "react";
import './Header.scss'

const Header = ({onChangeSearchInput, searchValue, setSearchValue}) => {

    
    return (
        <header className='header' >

            <div className="header__logo" 
            onClick={() => window.location.assign(`http://localhost:3000`)}>
                <BiBookBookmark />
                <div className="header__logo__info" >
                    <b>React-Diary</b>
                    <span>By Maxim Dergunov</span>
                </div>
            </div>

            <div className="header__search">
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

        </header>
    )
}

export default Header