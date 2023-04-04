import axios from '../../axios'
import { useState } from 'react'
import './CreateNote.scss'
import 'react-image-crop/dist/ReactCrop.css'
import ImageCropDialog from '../../components/UI/ImageCropDialog'
import moment from 'moment';
import 'moment/locale/ru';
import { convertBase64 } from '../../utils/functions'
import { Title } from '../../components/UI'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from 'yup'
moment.locale('ru')
const CreateNote = () => {

    const [noteImage, setNoteImage] = useState('')
    const [noteTitle, setTitle] = useState('')
    const [noteDescription, setDescription] = useState('')
    const [src, selectFile] = useState(null)
    const [file, setFile] = useState(null)
    const [openCrop, setOpenCrop] = useState(false)
    const navigate = useNavigate()
    

    const creatingNote = () => {

        const data = {
            title: noteTitle,
            description: noteDescription,
            image: noteImage,
            date: moment().format('LLL')
        }
        axios
            .post(`/notes`, data)
            .then(() => {
                alert('Запись создана!')
                navigate('/')
            })
            .catch((error) => {
                console.warn(error);
                alert("Не удалось выполниить запрос!");
            })
    }

    const onCancel = () => {
        setOpenCrop(false)
    }

    const setCroppedImageFor = (crop, zoom, aspect, croppedImageUrl) => {
        const newImage = { noteImage, crop, zoom, aspect, croppedImageUrl }
        console.log(newImage)
        setNoteImage(croppedImageUrl)
    }


    const validationSchema = yup.object().shape({
        title: yup.string().typeError('Неверный тип').required('Введите заголовок записи'),
        description: yup.string().typeError('Неверный тип').required('Введите текст записи'),
        image: yup.string().typeError('Неверный тип').required('Загрузите картинку'),

    })


    return (

        <div>
            <Formik
                initialValues={{
                    title: noteTitle,
                    description: noteDescription,
                    image: noteImage,
                    date: moment().format('LLL')
                }}
                validateOnBlur
                onSubmit={(values) => { creatingNote(values); }}
                validationSchema={validationSchema}>
                {
                    ({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, handleReset }) => (
                        <div className='createNote'>
                            <form className='createNote-container'>
                                <div className='createNote-container__header'>
                                    <Title title={"Создание записи"} />
                                </div>

                                <div className='createNote-container__title'>
                                    <input
                                        type={`text`}
                                        name={'title'}
                                        placeholder="Введите заголовок записи"
                                        onChange={(event) => { setTitle(event.target.value); handleChange(event) }}
                                        onBlur={handleBlur}
                                        value={values.title} />
                                </div>

                                {touched.title && errors.title &&
                                    <div className={`error`}><span>{errors.title}</span></div>}

                                <div className='createNote-container__description'>
                                    <textarea placeholder="Введите запись"
                                        onChange={(event) => { setDescription(event.target.value);  handleChange(event)}}
                                        onBlur={handleBlur}
                                        name={`description`}
                                        value={values.description}

                                    />
                                </div>

                                {touched.description && errors.description &&
                                    <div className={`error`}><span>{errors.description}</span></div>}

                                <div className='createNote-container__image'>

                                    <div className="input__wrapper">
                                        <input
                                            name="image"
                                            className="input input__file"
                                            id="input__file"
                                            type='file'
                                            onChange={event => {
                                                handleChange(event);
                                                selectFile(convertBase64(event.target.files[0], setNoteImage));
                                                setFile(event.target.files[0])
                                            }}

                                            value={values.image}
                                            multiple
                                        />
                                        <label htmlFor="input__file" className="input__file-button">
                                            <span className="input__file-button-text">Выберите файл</span>
                                        </label>
                                    </div>

                                    <div className='createNote-container__image__prewiew'>
                                        {openCrop ? <ImageCropDialog
                                            imageUrl={noteImage}
                                            onCancel={onCancel}
                                            setCroppedImageFor={setCroppedImageFor}
                                            setOpenCrop={setOpenCrop}
                                        /> : null}
                                        {noteImage?
                                            // eslint-disable-next-line jsx-a11y/alt-text
                                            <img className='createNote-container__image__prewiew__img'
                                                src={noteImage}
                                                onClick={() => setOpenCrop(!openCrop)} /> : <></>
                                        }
                                    </div>

                                </div>
                                {touched.image && errors.image &&
                                    <div className={`error`}><span>{errors.image}</span></div>}

                                <div className='createNote-container__button'>
                                    <button className="button"
                                        disabled={!isValid}
                                        onClick={handleSubmit}
                                        type={`submit`}>
                                        Записать
                                    </button>
                                </div>

                                <div className='createNote-container__button'>
                                    <button className="button"
                                        onClick={(event) => {event.stopPropagation(); handleReset(); setNoteImage('');  }}
                                        type={`reset`}>
                                        Сбросить
                                    </button>

                                </div>

                            </form>
                        </div>
                    )
                }
            </Formik>
        </div>

    )
}

export default CreateNote