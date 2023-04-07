import axios from '../../axios'
import { useState } from 'react'
import './CreateNote.scss'
import 'react-image-crop/dist/ReactCrop.css'
import ImageCropDialog from '../../components/UI/ImageCropDialog'
import moment from 'moment';
import 'moment/locale/ru';
import { convertBase64 } from '../../utils/functions'
import { Error, Title } from '../../components/UI'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
moment.locale('ru')
const CreateNote = () => {

    const [noteImage, setNoteImage] = useState('')
    const [noteTitle, setTitle] = useState('')
    const [noteDescription, setDescription] = useState('')
    const [src, selectFile] = useState(null)
    const [openCrop, setOpenCrop] = useState(false)
    const navigate = useNavigate()


    const creatingNote = (values) => {

        const data = {
            title: values.title,
            description: values.description,
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
        setNoteImage(croppedImageUrl)
    }


    const validationSchema = yup.object().shape({
        title: yup.string().typeError('Неверный тип').required('Введите заголовок записи'),
        description: yup.string().typeError('Неверный тип').required('Введите текст записи'),
        image: yup.string().typeError('Неверный тип').required('Загрузите изображение'),

    })

    const initialValues = {
        title: noteTitle,
        description: noteDescription,
        image: noteImage,
        date: moment().format('LLL')
    }

    const onSubmit = values => {
        creatingNote(values)
    }

    return (

        <Formik

            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {formik => {
                return (
                    <Form className='createNote-container'>

                        <Title title={"Создание записи"} />

                        <div className='createNote-container__title'>
                            <Field
                                id='title'
                                type='text'
                                name='title'
                                placeholder="Введите заголовок записи"
                            />

                        </div>
                        <ErrorMessage className='error' name='title' component={Error} />

                        <div className='createNote-container__description'>
                            <Field
                                id='descripton'
                                name='description'
                                as='textarea'
                                placeholder="Введите запись"
                            />
                        </div>

                        <ErrorMessage className='error' name='description' component={Error} />

                        <div className='createNote-container__image'>

                            <div className="input__wrapper">
                                <input
                                    name="image"
                                    className="input input__file"
                                    id="input__file"
                                    type='file'
                                    onChange={event => {
                                        formik.handleChange(event);
                                        selectFile(convertBase64(event.target.files[0], setNoteImage));

                                    }}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.image}
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
                                {noteImage ?
                                    // eslint-disable-next-line jsx-a11y/alt-text
                                    <img className='createNote-container__image__prewiew__img'
                                        src={noteImage}
                                        onClick={() => setOpenCrop(!openCrop)} /> : <></>
                                }
                            </div>

                        </div>
                        {formik.touched.image && formik.errors.image ? <div className='error' name='image'>{formik.errors.image}</div> : null}

                        <div className='createNote-container__button'>
                            <button className="button"
                                disabled={!(formik.isValid)}
                                type='submit'>
                                Записать
                            </button>
                        </div>

                        <div className='createNote-container__button'>
                            <button className="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setNoteImage('');
                                }}
                                type='reset'>
                                Сбросить
                            </button>

                        </div>

                    </Form>
                )
            }}
        </Formik>

    )
}

export default CreateNote