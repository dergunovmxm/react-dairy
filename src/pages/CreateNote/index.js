import axios from 'axios'
import { useEffect, useState } from 'react'
import './CreateNote.scss'
import 'react-image-crop/dist/ReactCrop.css'
import { ImageCropDialog } from '../../components'

const CreateNote = () => {

    const [noteTitle, setNoteTitle] = useState('')
    const [noteDescription, setNoteDescription] = useState('')
    const [noteImage, setNoteImage] = useState('')

    const [src, selectFile] = useState(null)

    const [openCrop, setOpenCrop] = useState(false)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

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

    const creatingNote = () => {

        const data = {
            title: noteTitle,
            description: noteDescription,
            image: noteImage,
            date: new Date().toLocaleString().slice(0, -3)
        }

        axios
            .post(`${process.env.REACT_APP_API_URL}/notes`, data)
            .then(window.location.assign(`http://localhost:3000`))
    }

    const onCancel = () => {
        setOpenCrop(false)
    }

    const setCroppedImageFor = (crop, zoom, aspect, croppedImageUrl) => {
        const newImage = { crop, zoom, aspect, croppedImageUrl }
        croppedImageUrl.then((base64) => {
            setNoteImage(base64) 
        })
         
    }

    useEffect(() => {
        console.log(noteImage)
    }, [noteImage])

    return (
        <form className='createNote'>
            <div className='createNote__container'>
                <div className='createNote__container__header'>
                    <span>Создание записи</span>
                </div>
                <div className='createNote__container__title'>
                    <input
                        type="text"
                        placeholder="Введите заголовок записи"
                        onChange={(event) => {
                            setNoteTitle(event.target.value)
                        }} />
                </div>

                <div className='createNote__container__description'>
                    <textarea placeholder="Введите запись"
                        onChange={(event) => {

                            setNoteDescription(event.target.value)
                        }} />
                </div>

                <div className='createNote__container__image'>

                    <input type='file'
                        // onChange={event => {
                        //     convertBase64(event.target.files[0])
                        // }}

                        onChange={handleFileChange}
                    />

                    <div className='createNote__container__image__prewiew'>
                        {openCrop ? <ImageCropDialog
                            imageUrl={noteImage}
                            onCancel={onCancel}
                            setCroppedImageFor={setCroppedImageFor}
                            setOpenCrop={setOpenCrop}
                        /> : null}
                        {
                            <img className='createNote__container__image__prewiew__img' 
                            src={noteImage} 
                            onClick={() => setOpenCrop(!openCrop)} />
                        }

                    </div>

                </div>

                <div className='createNote__container__button'
                    onClick={() => { creatingNote(noteTitle, noteDescription, noteImage) }}>
                    Записать
                </div>
            </div>
        </form>
    )
}

export default CreateNote