import axios from '../../axios'
import { useState } from 'react'
import './CreateNote.scss'
import 'react-image-crop/dist/ReactCrop.css'
import  ImageCropDialog  from '../../UI/ImageCropDialog'
import { convertBase64 } from '../../utils/functions'
import Button from '../../UI/Button'
import { Title } from '../../UI'

const CreateNote = () => {

    const [noteTitle, setNoteTitle] = useState('')
    const [noteDescription, setNoteDescription] = useState('')
    const [noteImage, setNoteImage] = useState('')
    const [src, selectFile] = useState(null)
    const [file, setFile] = useState(null)
    const [openCrop, setOpenCrop] = useState(false)


    const creatingNote = () => {

        const data = {
            title: noteTitle,
            description: noteDescription,
            image: noteImage,
            date: new Date().toLocaleString().slice(0, -3)
        }

        axios
            .post(`/notes`, data)
            .then(window.location.assign(`http://localhost:3000`))
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

    // const validationSchema = yup.object().shape({
    //     title: yup.string().typeError('Не верный тип').required('Введите заголовок записи'),
    //     description: yup.string().typeError('Не верный тип').required('Введите текст записи'),
    //     file: yup.array().of(yup.object().shape({
    //         file: yup.mixed().required('Подгрузите изображение'),
    //         type: yup.string().required(),
    //         name: yup.string().required()
    //     }).typeError('Подгрузите изображение'))
    // })

    // const getFileSchema = (file) => file && ({
    //     file: file,
    //     type: file.type,
    //     name: file.name
    // })

    // const getArrErrorsMessages = (errors) => {
    //     const result = []
    //     errors && Array.isArray(errors) && errors.forEach((value) => {
    //         if (typeof value === "string") {
    //             result.push(value)
    //         } else {
    //             Object.values(value).forEach((error) => {
    //                 result.push(error)
    //             })
    //         }
    //     })
    //     return result
    // }

    // const getError = (touched, error) => {
    //     return touched && error && <div className={`error`}><span>{error}</span></div>
    // }

    // useEffect(() => {
    //     console.log(noteImage)
    // }, [noteImage])

    return (

        <div className='createNote'>
            <form className='createNote__container'>

                <div className='createNote__container__header'>
                    <Title title={"Создание записи"}/>
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
                        onChange={(event) => {
                            selectFile(convertBase64(event.target.files[0], setNoteImage));
                            setFile(event.target.files[0])
                        }}
                    />

                    <div className='createNote__container__image__prewiew'>
                        {openCrop ? <ImageCropDialog
                            imageUrl={noteImage}
                            onCancel={onCancel}
                            setCroppedImageFor={setCroppedImageFor}
                            setOpenCrop={setOpenCrop}
                        /> : null}
                        { file ?
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <img className='createNote__container__image__prewiew__img'
                                src={noteImage}
                                onClick={() => setOpenCrop(!openCrop)} /> : <></>
                        }
                    </div>

                </div>

                <div className='createNote__container__button'
                    onClick={() => { creatingNote(noteTitle, noteDescription, noteImage) }}>
                    <Button value={"Записать"} />
                </div>

            </form>
        </div>

        // <div >
        //     <Formik
        //         initialValues={{
        //             title: '',
        //             description: '',
        //             file: undefined
        //         }}
        //         validationSchema={validationSchema}
        //         validateOnBlur
        //         onSubmit={(values) => { console.log(values) }}
        //     >
        //         {
        //             ({ values, errors, touched, handleBlur, handleChange, isValid, handleSubmit, dirty }) => (
        //                 <div className={`createNote`}>

        //                     <div className={`createNote__container`}>
        //                         <div className='createNote__container__header'>
        //                             <span>Создание записи</span>
        //                         </div>

        //                         <div className='createNote__container__title'>
        //                             <input
        //                                 type={`text`}
        //                                 placeholder={`Введите заголовок записи`}
        //                                 name={`title`}
        //                                 onChange={(event) => {
        //                                     setNoteTitle(handleChange(event))
        //                                 }}
        //                                 onBlur={handleBlur}
        //                                 value={values.title} />
        //                         </div>


        //                         {touched.title && errors.title &&
        //                             <div className={`error`}><span>{errors.title}</span></div>}



        //                         <div className='createNote__container__description'>
        //                             <textarea placeholder="Введите запись"
        //                                 onChange={(event) => {
        //                                     setNoteDescription(handleChange(event))
        //                                 }}
        //                                 onBlur={handleBlur}
        //                                 name={`description`}
        //                                 value={values.description}

        //                             />
        //                         </div>

        //                         {touched.description && errors.title &&

        //                             <div className={`error`}><span>{errors.description}</span></div>}

        //                         <FieldArray name={`file`}>
        //                             {(arrayHelper) => (
        //                                 <>
        //                                     <div className='createNote__container__image'>

        //                                         <input
        //                                             type='file'
        //                                             onBlur={handleBlur}
        //                                             name={`file`}
        //                                             onChange={(event) => {
        // selectFile(convertBase64(event.target.files[0]));
        // setFile(event.target.files[0])
        //                                                 const file = getFileSchema(event.target.files[0])
        //                                                 if (!file) {
        //                                                     arrayHelper.remove(0)
        //                                                 }
        //                                                 if (Array.isArray(values.file)) {
        //                                                     arrayHelper.replace(0, file)
        //                                                 } else {
        //                                                     arrayHelper.push(file)
        //                                                 }
        //                                             }}
        //                                             value={values.file}
        //                                         />

        //                                         <div className='createNote__container__image__prewiew'>
        //                                             {openCrop ? <ImageCropDialog
        //                                                 imageUrl={noteImage}
        //                                                 onCancel={onCancel}
        //                                                 setCroppedImageFor={setCroppedImageFor}
        //                                                 setOpenCrop={setOpenCrop}
        //                                             /> : null}
        //                                             {file ?
        //                                                 <img className='createNote__container__image__prewiew__img'
        //                                                     src={noteImage}
        //                                                     onClick={() => setOpenCrop(!openCrop)} /> :
        //                                                 <></>
        //                                             }

        //                                         </div>
        //                                     </div>
        //                                     {touched.file && errors.file &&
        //                                         <div className={`error`}><span>{errors.file}</span></div>}
        //                                 </>

        //                             )}

        //                         </FieldArray>


        //                         <button className='createNote__container__button'
        //                             disabled={!isValid && !dirty}
        //                             onClick={handleSubmit}
        //                             type={`submit`}>
        //                             Записать
        //                         </button>


        //                     </div>
        //                 </div>
        //             )
        //         }
        //     </Formik>
        // </div>
    )
}

export default CreateNote