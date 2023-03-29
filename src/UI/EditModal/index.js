import "./EditModal.scss"
import { FiX } from "react-icons/fi"
import { useEffect, useState } from 'react'
import axios from '../../axios'
import ImageCropDialog from '../ImageCropDialog'
import { convertBase64 } from '../../utils/functions'
import Button from '../../UI/Button'
import Title from "../../UI/Title"
import Tilte from "../../UI/Title"


const EditModal = ({ editOpen, setEditOpen, id }) => {

    const [noteTitle, setNoteTitle] = useState('')
    const [noteDescription, setNoteDescription] = useState('')
    const [noteImage, setNoteImage] = useState('')

    const [src, selectFile] = useState(null)

    const [openCrop, setOpenCrop] = useState(false)

    const handleFileChange = (event) => {
        selectFile(convertBase64(event.target.files[0], setNoteImage))
    }

    const onCancel = () => {
        setOpenCrop(false)
    }

    const setCroppedImageFor = (croppedImageUrl) => {
        croppedImageUrl.then((base64) => {
            setNoteImage(base64)
        })

    }

    const editNote = () => {
        const data = {
            title: noteTitle,
            description: noteDescription,
            image: noteImage,
            date: new Date().toLocaleString().slice(0, -3)
        }
        axios.put(`/notes/${id}`, data)
            .then(window.location.assign(`http://localhost:3000`))
            .catch((error) => {
                console.warn(error);
                alert("Не удалось выполниить запрос!");
            })
    }

    useEffect(() => {
        if (id) {
            axios.get(`/notes/${id}`)
                .then(({ data }) => {
                    setNoteTitle(data.title)
                    setNoteDescription(data.description)
                    setNoteImage(data.image)
                })
        }


    }, [])

    return (
        <section className={editOpen ? "editModal active" : "editModal"}>

            <form className="editModal__content">

                <div className="editModal__content__close" >
                    <FiX onClick={() => setEditOpen(false)} />
                </div>

                <div className="editModal__content__header">
                    <Tilte title={"Редактирование записи"} />
                </div>

                <div className='editModal__content__title'>
                    <input
                        type="text"
                        value={noteTitle}
                        placeholder="Введите заголовок записи"
                        onChange={(event) => {
                            setNoteTitle(event.target.value)
                        }}
                    />

                </div>

                <div className='editModal__content__description'>
                    <textarea placeholder="Введите запись"
                        onChange={(event) => {
                            setNoteDescription(event.target.value)
                        }}
                        value={noteDescription} />
                </div>

                <div className='editModal__content__image'>

                    <input type='file'
                        onChange={handleFileChange}
                    />

                    <div className='editModal__content__image__prewiew'>
                        {openCrop ? <ImageCropDialog
                            imageUrl={noteImage}
                            onCancel={onCancel}
                            setCroppedImageFor={setCroppedImageFor}
                            setOpenCrop={setOpenCrop}
                        /> : null}
                        {

                            // eslint-disable-next-line jsx-a11y/alt-text
                            <img className='createNote__container__image__prewiew__img'
                                src={noteImage}
                                onClick={() => setOpenCrop(!openCrop)}
                            />
                        }

                    </div>

                </div>

                <div className='editModal__content__button' onClick={() => { editNote() }}>
                    <Button value={"Сохранить"}
                    />
                </div>

            </form>

        </section>
    )
}

export default EditModal