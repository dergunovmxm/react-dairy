import axios from 'axios'
import { useState, useRef } from 'react'
import './CreateNote.scss'

const CreateNote = () => {
    const [noteTitle, setNoteTitle] = useState('')
    const [noteDescription, setNoteDescription] = useState('')
    const [noteImage, setNoteImage] = useState('')

    async function convertBase64(file) {

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onload = () => setNoteImage(reader.result);
            reader.onerror = (error) => reject(error);
            console.log(noteImage)

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
                        onChange={event => {
                            convertBase64(event.target.files[0])
                        }} />

                    <div className='createNote__container__image__prewiew'>
                        {/* <img src={noteImage ? URL.createObjectURL(noteImage) : ""} /> */}
                        <img src={noteImage} />
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