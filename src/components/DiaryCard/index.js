import './DiaryCard.scss'
import { FiEdit, FiTrash2 } from "react-icons/fi"

const DairyCard = (props) => {

    return (
        <div className='dairy__card' onClick={() => (alert("Click"))} >

            <div className='dairy__card__image' >
                <img src={props.image} alt="dairyImage" />
            </div>

            <div className='dairy__card__title'>
                <span>{props.title}</span>
            </div>

            <div className='dairy__card__description'>
                <span>{props.description} </span>
            </div>

            <div className='dairy__card__date'>
                <span>09.12.22</span>
            </div>

            <div className='dairy__card__toolbar'>
                <div className='dairy__card__toolbar__item'>
                    <div className='edit' onClick={(event) => (alert("Редактирвоать"), event.stopPropagation())}>
                        <FiEdit />
                    </div>
                    <div className='delete' onClick={(event) => (alert("Удалить"), event.stopPropagation())} >
                        <FiTrash2 />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DairyCard