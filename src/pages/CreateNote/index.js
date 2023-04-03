import axios from '../../axios'
import { useState } from 'react'
import './CreateNote.scss'
import 'react-image-crop/dist/ReactCrop.css'
import ImageCropDialog from '../../components/UI/ImageCropDialog'
import { convertBase64 } from '../../utils/functions'
import { Title } from '../../components/UI'
import { useNavigate } from 'react-router-dom'
import { Formik, useFormikContext } from 'formik'
import * as yup from 'yup'


const CreateNote = () => {

    const [noteImage, setNoteImage] = useState('')
    const [noteTitle, setTitle] = useState('')
    const [noteDescription, setDescription] = useState('')
    const [src, selectFile] = useState(null)
    const [file, setFile] = useState(null)
    const [openCrop, setOpenCrop] = useState(false)
    const navigate = useNavigate()
    

    const creatingNote = (values) => {

        const data = {
            title: noteTitle,
            description: noteDescription,
            image: noteImage,
            date: new Date().toLocaleString().slice(0, -3)
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
        const newImage = { crop, zoom, aspect, croppedImageUrl }
        croppedImageUrl.then((base64) => {
            setNoteImage(base64)
        })

    }

    const validationSchema = yup.object().shape({
        title: yup.string().typeError('Не верный тип').required('Введите заголовок записи'),
        description: yup.string().typeError('Не верный тип').required('Введите текст записи'),
        image: yup.string().typeError('Не верный тип').required('Загрузите картинку'),


    })


    return (

        <div>
            <Formik
                initialValues={{
                    title: noteTitle,
                    description: noteDescription,
                    image: noteImage,
                    date: new Date().toLocaleString().slice(0, -3)
                }}
                validateOnBlur
                onSubmit={(values) => { creatingNote(values); console.log(values) }}
                validationSchema={validationSchema}>
                {
                    ({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, resetForm  }) => (
                        <div className='createNote'>
                            <form className='createNote__container'>
                                <div className='createNote__container__header'>
                                    <Title title={"Создание записи"} />
                                </div>

                                <div className='createNote__container__title'>
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

                                <div className='createNote__container__description'>
                                    <textarea placeholder="Введите запись"
                                        onChange={(event) => { setDescription(event.target.value);  handleChange(event)}}
                                        onBlur={handleBlur}
                                        name={`description`}
                                        value={values.description}

                                    />
                                </div>

                                {touched.description && errors.description &&
                                    <div className={`error`}><span>{errors.description}</span></div>}

                                <div className='createNote__container__image'>

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

                                    <div className='createNote__container__image__prewiew'>
                                        {openCrop ? <ImageCropDialog
                                            imageUrl={noteImage}
                                            onCancel={onCancel}
                                            setCroppedImageFor={setCroppedImageFor}
                                            setOpenCrop={setOpenCrop}
                                        /> : null}
                                        {file ?
                                            // eslint-disable-next-line jsx-a11y/alt-text
                                            <img className='createNote__container__image__prewiew__img'
                                                src={noteImage}
                                                onClick={() => setOpenCrop(!openCrop)} /> : <></>
                                        }
                                    </div>

                                </div>
                                {touched.image && errors.image &&
                                    <div className={`error`}><span>{errors.image}</span></div>}

                                <div className='createNote__container__button'>
                                    <button className="button"
                                        disabled={!isValid}
                                        onClick={handleSubmit}
                                        type={`submit`}>
                                        Записать
                                    </button>
                                </div>

                                <div className='createNote__container__button'>
                                    <button className="button"
                                        onClick={() => resetForm()}
                                        type={`submit`}>
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