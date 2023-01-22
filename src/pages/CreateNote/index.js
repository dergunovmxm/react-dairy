import axios from 'axios'
import { useState, useRef } from 'react'
import './CreateNote.scss'

const CreateNote = () => {


    const [noteTitle, setNoteTitle] = useState('')
    const [noteDescription, setNoteDescription] = useState('')
    const [noteImage, setNoteImage] = useState(null)
    const [loadData, setLoadData] = useState({})

    const creatingNote = async () => {
        const data = {
            title: noteTitle,
            description: noteDescription,
            image: noteImage,
            date: new Date().toLocaleString().slice(0, -3)
        }
        console.log(data)

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
                            
                            setNoteImage(event.target.files[0])

                        }} />



                    <div className='createNote__container__image__prewiew'>
                        <img src={noteImage ? URL.createObjectURL(noteImage) : ""} />
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