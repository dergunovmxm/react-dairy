import { BiBookBookmark } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'
import './Header.scss'

const Header = () => {

    const navigate = useNavigate()
    return (
        <header className='header'>

            <div className="header-logo" onClick={() => { navigate(`/`)}} >
                <BiBookBookmark />
                <div className="header-logo__info" >
                    <b>React-Diary</b>
                    <span>By Maxim Dergunov</span>
                </div>
            </div>
           
        </header>
    )
}

export default Header