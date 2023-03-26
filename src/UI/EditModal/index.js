import "./EditModal.scss"
import { FiX } from "react-icons/fi"
import { useState } from 'react'
import axios from 'axios'
import  ImageCropDialog  from '../ImageCropDialog'

const EditModal = ({ editOpen, setEditOpen, id}) => {

    const [noteTitle, setNoteTitle] = useState('')
    const [noteDescription, setNoteDescription] = useState('')
    const [noteImage, setNoteImage] = useState('')

    const [src, selectFile] = useState(null)

    const [openCrop, setOpenCrop] = useState(false)

    const handleFileChange = (event) => {
        selectFile(convertBase64(event.target.files[0]))
    }


    function convertBase64(file) {

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onload = () => setNoteImage(reader.result);
            reader.onerror = (error) => reject(error);

        });
    }

    const onCancel = () => {
        setOpenCrop(false)
    }

    const setCroppedImageFor = ( croppedImageUrl) => {
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
        axios.put(`${process.env.REACT_APP_API_URL}/notes/${id}`, data)
            .then(window.location.assign(`http://localhost:3000`))
    }

    return (
        <div className={editOpen ? "editModal active" : "editModal"}>

            <div className="editModal__content">

                <div className="editModal__content__close" >
                    <FiX onClick={() => setEditOpen(false)} />
                </div>

                <div className="editModal__content__header">
                    <span>Редактировать запись</span>
                </div>

                <div className='editModal__content__title'>
                    <input
                        type="text"
                        placeholder="Введите заголовок записи"
                        onChange={(event) => {
                            setNoteTitle(event.target.value)
                        }} />
                </div>

                <div className='editModal__content__description'>
                    <textarea placeholder="Введите запись"
                        onChange={(event) => {

                            setNoteDescription(event.target.value)
                        }} />
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
                                onClick={() => setOpenCrop(!openCrop)} />
                        }

                    </div>

                </div>

                <div className='editModal__content__button'
                    onClick={() => { editNote() }}
                >
                    Сохранить
                </div>

            </div>
        </div>
    )
}

export default EditModal