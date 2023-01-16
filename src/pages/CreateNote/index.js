import axios from 'axios'
import { useState } from 'react'
import './CreateNote.scss'

const CreateNote = () => {

    const [noteTitle, setNoteTitle] = useState('')
    const [noteDescription, setNoteDescription] = useState('')
    const [noteImage, setNoteImage] = useState(null)
    // const [noteImageUrl, setNoteImageUrl] = useState(null)
    // const fileReader = new FileReader()
    // fileReader.onloadend = () => {
    //     setNoteImageUrl(fileReader.result)
    // }

    const creatingNote = () => {

        const formData = new FormData();
        formData.append('image', noteImage);
        for (var [key, value] of formData.entries()) { 
            console.log(key, value);
        }
        var data = {

            date: new Date().toLocaleString().slice(0, -3),
            title: noteTitle,
            description: noteDescription,
            image: formData
            
        }
        axios
            .post(`${process.env.REACT_APP_API_URL}/notes`, data)
            // .then(window.location.assign(`http://localhost:3000`))
        
        
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
                    onChange={event =>{
                        setNoteImage(event.target.files[0])
                        // fileReader.readAsDataURL(noteImage)
                        
                    }}/>
                    <div className='createNote__container__image__prewiew'>
                        <img src={noteImage ? URL.createObjectURL(noteImage): ""}/>
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