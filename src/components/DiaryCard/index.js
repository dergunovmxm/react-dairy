import './DiaryCard.scss'
import { FiEdit, FiTrash2 } from "react-icons/fi"
import EditModal from "../../UI/EditModal"
import { useState } from "react"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchRemoveNotes, fetchNotes } from "../../redux/slices/notes"


const DiaryCard = ({ image, title, description, id, date }) => {


    const dispatch = useDispatch()
    const [editOpen, setEditOpen] = useState(false)
    const removeNote = (id) => {
        if (window.confirm("Вы действительно хотите удалить запись?")) {
            dispatch(fetchRemoveNotes(id)) 
        }
    }

    return (
        <>
            <EditModal editOpen={editOpen} setEditOpen={setEditOpen} id={id} />

            <section className='dairy__card'
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

                <aside className='dairy__card__toolbar'>
                    <div className='dairy__card__toolbar__item'>
                        <div className='edit' onClick={(event) => (setEditOpen(true), event.stopPropagation())}>
                            <FiEdit />

                        </div>
                    
                        <div className='delete' onClick={(event) => (removeNote(id), event.stopPropagation())} >
                            <FiTrash2 />
                        </div>
                    </div>
                </aside>

            </section>
        </>
    )
}

export default DiaryCard