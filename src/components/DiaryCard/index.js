import './DiaryCard.scss'
import { FiEdit, FiTrash2 } from "react-icons/fi"
import axios from 'axios'


const DiaryCard = ({ image, title, description, id, removeNote, date }) => {

    return (

        <div className='dairy__card' 
            onClick={() => {
                window.location.assign(
                    `http://localhost:3000/notes/?id=${id}`
                )
            }} >

            <div className='dairy__card__image' >
                <img src={image} alt="dairyImage" />
            </div>

            <div className='dairy__card__title'>
                <span>{title}</span>
            </div>

            <div className='dairy__card__description'>
                <span>{description} </span>
            </div>

            <div className='dairy__card__date'>
                <span>{date}</span>
            </div>

            <div className='dairy__card__toolbar'>
                <div className='dairy__card__toolbar__item'>
                    <div className='edit' onClick={(event) => (alert("Редактирвоать"), event.stopPropagation())}>
                        <FiEdit />
                    </div>
                    <div className='delete' onClick={(event) => (removeNote(id), event.stopPropagation())} >
                        <FiTrash2 />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DiaryCard