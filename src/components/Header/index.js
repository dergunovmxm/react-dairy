import { BiBookBookmark } from "react-icons/bi";
import './Header.scss'

const Header = () => {
    return (
        <header className='header'>

            <div className="header__logo">
                <BiBookBookmark />
                <div className="header__logo__info">
                    <b>React-Diary</b>
                    <span>By Maxim Dergunov</span>
                </div>
            </div>

        </header>
    )
}

export default Header