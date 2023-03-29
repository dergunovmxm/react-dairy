
import { useEffect, useState } from 'react'
import axios from '../../axios'
import { useLocation } from 'react-router-dom'
import './Diary.scss'
import { Comments } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments } from '../../redux/slices/comments'
import Button from '../../UI/Button'
import { Input, Loading, Title } from '../../UI'

const Diary = () => {

    const [items, setItems] = useState({})
    const [comment, setComment] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const { comments } = useSelector((state) => state.comments)
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
                    console.log(data);
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
        <div className='diary__container'>
            {!isLoading ? <>
                <main className='diary__container__content'>

                    <div className='diary__container__content__image'>
                        <img src={items.image} alt="defaultImage" />
                    </div>

                    <div className='diary__container__content__info'>

                        <div className='diary__container__content__info__title'>
                            <span>{items.title}</span>
                        </div>

                        <div className='diary__container__content__info__description'>
                            <span>{items.description}</span>
                        </div>

                    </div>

                </main>

                <section className='diary__container__commentsBox'>
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