import "./EditModal.scss"
import { FiX } from "react-icons/fi"
import { useState } from 'react'
import axios from '../../../axios'
import ImageCropDialog from '../ImageCropDialog'
import Tilte from "../Title"
import { Formik } from 'formik'
import * as yup from 'yup'


const EditModal = ({
    editOpen,
    setEditOpen,
    id,
    editTitle,
    editDescription,
    editImage,
    setEditImage,
    setIsEdit, 
    isEdit }) => {

    const [file, setFile] = useState(null)
    const [src, selectFile] = useState(null)

    const [openCrop, setOpenCrop] = useState(false)

    const onCancel = () => {
        setOpenCrop(false)
    }

    const setCroppedImageFor = (crop, zoom, aspect, croppedImageUrl) => {
        const newImage = { crop, zoom, aspect, croppedImageUrl }
        croppedImageUrl.then((base64) => {
            setEditImage(base64)
        })

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
            image: editImage,
            date: new Date().toLocaleString().slice(0, -3)

        }

        axios.put(`/notes/${id}`, data)
            .then(() => {

                alert('Запись изменена!')
                setEditOpen(false)
            })
            .catch((error) => {
                console.warn(error);
                alert("Не удалось выполниить запрос!");
            })
    }

    const validationSchema = yup.object().shape({
        title: yup.string().typeError('Не верный тип').required('Введите заголовок записи'),
        description: yup.string().typeError('Не верный тип').required('Введите текст записи'),
        image: yup.string().typeError('Не верный тип').required('Загрузите картинку'),
    })

    return (
        <section className={editOpen ? "editModal active" : "editModal"}>
            <Formik

                initialValues={{
                    title: editTitle,
                    description: editDescription,
                    image: editImage
                }}
                enableReinitialize
                validateOnBlur
                validateOnChange
                onSubmit={values => { editNote(values); setIsEdit(true);}}
                validationSchema={validationSchema}>
                {
                    ({ values, errors, touched, dirty, handleChange, handleBlur, isValid, handleSubmit }) => (
                        <form className="editModal__content" >

                            <div className="editModal__content__close" >
                                <FiX onClick={() => {setEditOpen(false); setEditImage('')}} />
                            </div>

                            <div className="editModal__content__header">
                                <Tilte title={"Редактирование записи"} />
                            </div>

                            <div className='createNote__container__title'>
                                <input
                                    type={`text`}
                                    name={'title'}
                                    placeholder="Введите заголовок записи"
                                    onChange={(event) => {handleChange(event); console.log(id)}}
                                    onBlur={handleBlur}
                                    value={values.title} />
                            </div>

                            {touched.title && errors.title &&
                                <div className={`error`}><span>{errors.title}</span></div>}

                            <div className='createNote__container__description'>
                                <textarea placeholder="Введите запись"
                                    onChange={(event) => {handleChange(event); console.log(id)}}
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
                                        onChange={(event) => {
                                            selectFile(convertBase64(event.target.files[0], setEditImage));
                                            handleChange(event);
                                            setFile(event.target.files[0])
                                            console.log(id)
                                            
                                        }}
                                      
                                        value={values.image?.name}
                                        multiple
                                    />
                                    <label htmlFor="input__file" className="input__file-button">
                                        <span className="input__file-button-text">Изменить изображение</span>
                                    </label>
                                </div>

                                <div className='createNote__container__image__prewiew'>
                                    {openCrop ? <ImageCropDialog
                                        imageUrl={editImage}
                                        onCancel={onCancel}
                                        setCroppedImageFor={setCroppedImageFor}
                                        setOpenCrop={setOpenCrop}
                                    /> : null}
                                    {editImage ?
                                        // eslint-disable-next-line jsx-a11y/alt-text
                                        <img className='createNote__container__image__prewiew__img'
                                            src={editImage}
                                            onClick={() => setOpenCrop(!openCrop)} /> : <></>
                                    }
                                </div>

                            </div>

                            {touched.image && errors.image &&
                                <div className={`error`}><span>{errors.image}</span></div>}


                            <div className='createNote__container__button'>
                                <button className="button"
                                    disabled={!isValid && !dirty}
                                    onClick={handleSubmit}
                                    type={`submit`}>
                                    Записать
                                </button>
                            </div>


                        </form>
                    )}
            </Formik>

        </section>
    )
}

export default EditModal