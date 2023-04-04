import "./EditModal.scss"
import { FiX } from "react-icons/fi"
import { useEffect, useState } from 'react'
import axios from '../../../axios'
import ImageCropDialog from '../ImageCropDialog'
import Tilte from "../Title"
import moment from 'moment';
import { Formik } from 'formik'
import * as yup from 'yup'
moment.locale('ru')

const EditModal = ({
    editOpen,
    setEditOpen,
    id,
    editTitle,
    editDescription,
    editImage,
    setIsEdit
}) => {

    const [file, setFile] = useState(null)
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

    useEffect(() => {
        setNoteImage(editImage)
    }, [editImage])

    return (
        <section className={editOpen ? "editModal active" : "editModal"}>
            <Formik

                initialValues={
                    initialValues
                }
                enableReinitialize
                validateOnBlur
                validateOnChange
                onSubmit={values => { editNote(values) }}
                validationSchema={validationSchema}>
                {
                    ({ values, errors, touched, dirty, handleChange, handleBlur, isValid, handleSubmit, handleReset }) => (
                        <form className="editModal-content" >

                            <div className="editModal-content__close" >
                                <FiX onClick={() => { setEditOpen(false); }} />
                            </div>

                            <div className="editModal-content__header">
                                <Tilte title={"Редактирование записи"} />
                            </div>

                            <div className='editModal-content__title'>
                                <input
                                    type={`text`}
                                    name={'title'}
                                    placeholder="Введите заголовок записи"
                                    onChange={(event) => { handleChange(event) }}
                                    onBlur={handleBlur}
                                    value={values.title} />
                            </div>

                            {touched.title && errors.title &&
                                <div className={`error`}><span>{errors.title}</span></div>}

                            <div className='editModal-content__description'>
                                <textarea placeholder="Введите запись"
                                    onChange={(event) => { handleChange(event); }}
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
                                        onChange={(event) => {
                                            selectFile(convertBase64(event.target.files[0], setNoteImage));
                                            handleChange(event);
                                            setFile(event.target.files[0])
                                        }}

                                        value={values.image?.name}
                                        multiple

                                    />
                                    <label htmlFor="input__file" className="input__file-button">
                                        <span className="input__file-button-text">Выберите изображение</span>
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

                            {touched.image && errors.image &&
                                <div className={`error`}><span>{errors.image}</span></div>}


                            <div className='createNote-container__button'>
                                <button className="button"
                                    disabled={!isValid && !dirty}
                                    onClick={handleSubmit}
                                    type={`submit`}>
                                    Записать
                                </button>
                            </div>
                            <div className='createNote-container__button'>
                                <button className="button"
                                    onClick={() => { handleReset(); setNoteImage(editImage) }}
                                    type={`reset`}>
                                    Сбросить
                                </button>

                            </div>

                        </form>
                    )}
            </Formik>

        </section>
    )
}

export default EditModal