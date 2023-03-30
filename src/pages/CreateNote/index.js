import axios from '../../axios'
import { useState } from 'react'
import './CreateNote.scss'
import 'react-image-crop/dist/ReactCrop.css'
import ImageCropDialog from '../../components/UI/ImageCropDialog'
import { convertBase64 } from '../../utils/functions'
import Button from '../../components/UI/Button'
import { Title } from '../../components/UI'
import { Link, useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from 'yup'


const CreateNote = () => {

    const [noteImage, setNoteImage] = useState('')
    const [src, selectFile] = useState(null)
    const [file, setFile] = useState(null)
    const [openCrop, setOpenCrop] = useState(false)
    const navigate = useNavigate()

    const creatingNote = (values) => {
        const data = {
            title: values.title,
            description: values.description,
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

    })


    return (

        <div>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    image: '',
                    date: new Date().toLocaleString().slice(0, -3)
                }}
                validateOnBlur
                onSubmit={(values) => creatingNote(values)}
                validationSchema={validationSchema}>
                {
                    ({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit }) => (
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
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.title} />
                                </div>

                                {touched.title && errors.title &&
                                    <div className={`error`}><span>{errors.title}</span></div>}

                                <div className='createNote__container__description'>
                                    <textarea placeholder="Введите запись"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name={`description`}
                                        value={values.description}

                                    />
                                </div>

                                {touched.description && errors.description &&

                                    <div className={`error`}><span>{errors.description}</span></div>}

                                <div className='createNote__container__image'>

                                    <div class="input__wrapper">
                                        <input
                                            name="file"
                                            className="input input__file"
                                            id="input__file"
                                            type='file'
                                            onChange={(event) => {
                                                selectFile(convertBase64(event.target.files[0], setNoteImage));
                                                setFile(event.target.files[0])
                                            }}
                                            value={values.noteImage}
                                            multiple
                                        />
                                        <label for="input__file" class="input__file-button">
                                            <span class="input__file-button-text">Выберите файл</span>
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

                                <div className='createNote__container__button'>
                                        <button className="button"
                                            disabled={!isValid}
                                            onClick={handleSubmit}
                                            type={`submit`}>
                                            Записать
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