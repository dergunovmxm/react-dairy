import "./EditModal.scss"
import { FiX } from "react-icons/fi"
import { useEffect, useState } from 'react'
import axios from '../../../axios'
import ImageCropDialog from '../ImageCropDialog'
import { Error, Title } from '../../../components/UI'
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
moment.locale('ru')

const EditModal = ({

    setEditOpen,
    id,
    editTitle,
    editDescription,
    editImage,
    setIsEdit
}) => {

    const [src, selectFile] = useState(null)
    const [noteImage, setNoteImage] = useState(editImage)
    const [openCrop, setOpenCrop] = useState(false)

    const onCancel = () => {
        setOpenCrop(false)
    }

    const setCroppedImageFor = (crop, zoom, aspect, croppedImageUrl) => {
        const newImage = { noteImage, crop, zoom, aspect, croppedImageUrl }
        console.log(newImage)
        setNoteImage(croppedImageUrl)
    }

    const convertBase64 = (file, setEditImage) => {

        return new Promise((resolve, reject) => {

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onload = () => setEditImage(reader.result);
            reader.onerror = (error) => reject(error);

        });
    }

    const editNote = (values) => {

        const data = {
            title: values.title,
            description: values.description,
            image: noteImage,
            date: moment().format('LLL')

        }

        axios.put(`/notes/${id}`, data)

            .then(() => {

                alert('Запись изменена!')
                setIsEdit(true)
                setEditOpen(false)
            })
            .catch((error) => {
                console.warn(error);
                alert("Не удалось выполниить запрос!");
            })
    }

    const validationSchema = yup.object().shape({
        title: yup.string().typeError('Неверный тип').required('Введите заголовок записи'),
        description: yup.string().typeError('Неверный тип').required('Введите текст записи'),
        image: yup.string().typeError('Не верный тип').required('Загрузите картинку'),
    })
    const initialValues = {
        title: editTitle,
        description: editDescription,
        image: editImage,
        date: moment().format('LLL')
    }

    const onSubmit = values => {
        editNote(values)
    }

    useEffect(() => {
        setNoteImage(editImage)
    }, [editImage])

    return (
        <Formik
        
            initialValues={initialValues}
            enableReinitialize
            onSubmit={onSubmit}
            validationSchema={validationSchema}>

            {(formik => {
                return (
                    <Form className="editModal-content" >

                        <div className="editModal-content__close" >
                            <FiX onClick={() => { setEditOpen(false); }} />
                        </div>

                        <div className="editModal-content__header">
                            <Title title={"Редактирование записи"} />
                        </div>

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
                                    onChange={(event) => {
                                        selectFile(convertBase64(event.target.files[0], setNoteImage));
                                        formik.handleChange(event);
                                    }}
                                    onBlur={formik.handleBlur}
                                    multiple

                                />
                                <label htmlFor="input__file" className="input__file-button">
                                    <span className="input__file-button-text">Выберите изображение</span>
                                </label>
                            </div>

                            <div className='createNote-container__image__prewiew'>
                                {openCrop ? <ImageCropDialog
                                    imageUrl={editImage}
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
                                disabled={!formik.isValid && !formik.dirty}
                                type={`submit`}>
                                Записать
                            </button>
                        </div>

                        <div className='createNote-container__button'>
                            <button className="button"
                                onClick={() => { setNoteImage(editImage) }}
                                type={`reset`}>
                                Сбросить
                            </button>

                        </div>

                    </Form>
                )
            })}


        </Formik>
    )
}

export default EditModal