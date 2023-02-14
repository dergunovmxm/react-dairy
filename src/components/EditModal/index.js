import "./EditModal.scss"
import { FiX } from "react-icons/fi"

const EditModal = ({ editOpen, setEditOpen }) => {
    return (
        <div className={editOpen ? "editModal active" : "editModal"}>

            <div className="editModal__content">

                <div className="editModal__content__close" >
                    <FiX onClick={() => setEditOpen(false)} />
                </div>

                <div className="editModal__content__header">
                    <span>Редактировать запись</span>
                </div>

                <div className='editModal__content__title'>
                    <input
                        type="text"
                        placeholder="Введите заголовок записи"
                        onChange={(event) => {

                        }} />
                </div>

                <div className='editModal__content__description'>
                    <textarea placeholder="Введите запись"
                        onChange={(event) => {


                        }} />
                </div>

                <div className='editModal__content__image'>

                    <input type='file'

                    />

                    <div className='editModal__content__image__prewiew'>
                        {/* {openCrop ? <ImageCropDialog
                            imageUrl={noteImage}
                            onCancel={onCancel}
                            setCroppedImageFor={setCroppedImageFor}
                            setOpenCrop={setOpenCrop}
                        /> : null}
                        {
                            <img className='createNote__container__image__prewiew__img'
                                src={noteImage}
                                onClick={() => setOpenCrop(!openCrop)} />
                        } */}

                    </div>

                </div>

                <div className='editModal__content__button'
                // onClick={() => { creatingNote(noteTitle, noteDescription, noteImage) }}
                >
                    Сохранить
                </div>

            </div>
        </div>
    )
}

export default EditModal