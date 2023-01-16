import { BiBookBookmark } from "react-icons/bi";
import './Header.scss'

const Header = () => {

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
           
        </header>
    )
}

export default Header