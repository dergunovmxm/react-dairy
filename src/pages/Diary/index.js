
import { useEffect, useState } from 'react'
import axios from '../../axios'
import { useLocation } from 'react-router-dom'
import './Diary.scss'
import { Comments } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments } from '../../redux/slices/comments'
import Button from '../../components/UI/Button'
import { Input, Loading, Title } from '../../components/UI'
import { FiImage } from 'react-icons/fi'

const Diary = () => {

    const [items, setItems] = useState({})
    const [comment, setComment] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()

    let { search } = useLocation()
    const params = new URLSearchParams(search)
    const diaryId = params.get('id')


    useEffect(() => {
        axios
            .get(`/notes/${diaryId}`)
            .then((response) => {
                setItems(response.data)
                setIsLoading(false)
            })
            .catch((error) => {
                console.warn(error);
                alert("Не удалось выполниить запрос!");
            })
    }, [])

    const addComment = () => {

        const data = {
            text: comment,
            firstname: "Maxim",
            lastname: "Dergunov",
            noteId: diaryId
        }

        if (comment !== '') {
            axios.post(`/comments`, data)
                .then(() => {
                    dispatch(fetchComments(diaryId))
                })
                .catch((error) => {
                    console.warn(error);
                    alert("Не удалось выполниить запрос!");
                })
            setComment('')
        }
    }

    return (
        <div className='diary-container'>
            {!isLoading ? <>
                <main className='diary-container-content'>

                    <div className='diary-container-content__image'>
                        {
                            items.image ? <img src={items.image} alt="defaultImage" /> : <FiImage />
                        }
                        
                    </div>

                    <div className='diary-container-content__info'>

                        <div className='diary-container-content__info__title'>
                            <span>{items.title}</span>
                        </div>

                        <div className='diary-container-content__info__description'>
                            <span>{items.description}</span>
                        </div>

                    </div>

                </main>

                <section className='diary-container__commentsBox'>
                    <Title title={"Комментарии"} />
                    <div className='comments__box'>
                        <Comments id={diaryId} />
                    </div>

                    <div className='comments__input'>
                        <Input addComment={addComment} setComment={setComment} comment={comment} />
                    </div>
                    <div className='comments__button'
                        onClick={addComment}>
                        <Button value={"Отправить"} />
                    </div>
                </section></>
                : <Loading />
            }

        </div>
    )
}

export default Diary