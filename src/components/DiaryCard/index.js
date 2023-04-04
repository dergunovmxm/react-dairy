import './DiaryCard.scss'
import { FiEdit, FiTrash2, FiImage } from "react-icons/fi"
import EditModal from "../UI/EditModal"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import axios from '../../axios'

const DiaryCard = ({ image, title, description, id, date, removeNote, setIsEdit, isEdit }) => {


    const navigate = useNavigate()
    const [editOpen, setEditOpen] = useState(false)
    const [editTitle, setEditTitle] = useState('')
    const [editDescription, setEditDescription] = useState('')
    const [editImage, setEditImage] = useState('')


    const getData = (id) => {
        axios.get(`/notes/${id}`)

            .then(({ data }) => {
                setEditTitle(data.title)
                setEditDescription(data.description)
                setEditImage(data.image)
                setIsEdit(false)

            }).catch((error) => {
                console.warn(error);
                alert("Не удалось выполниить запрос!");
            })
    }


    return (
        <>
            {editOpen ? <EditModal
                editOpen={editOpen}
                setEditOpen={setEditOpen}
                id={id}
                editTitle={editTitle}
                setEditTitle={setEditTitle}
                editDescription={editDescription}
                setEditDescription={setEditDescription}
                editImage={editImage}
                setEditImage={setEditImage}
                setIsEdit={setIsEdit}
                isEdit={isEdit}
            /> : <></>}


            <section className='dairy__card'
                onClick={() => { navigate(`/notes/?id=${id}`) }} >

                <div className='dairy__card__image' >
                    {
                        image ? <img src={image} alt="dairyImage" /> : <FiImage />
                    }

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
                        <div className='edit' onClick={(event) => (setEditOpen(true), getData(id), event.stopPropagation())}>
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