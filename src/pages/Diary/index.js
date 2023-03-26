
import { useEffect, useState } from 'react'
import axios from '../../axios'
import { useLocation } from 'react-router-dom'
import './Diary.scss'
import { Comments } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import * as types from "../../redux/actionType"



const Diary = () => {

    const [items, setItems] = useState({})
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const comments = useSelector((state) => state.comments)
    let { search } = useLocation()
    const params = new URLSearchParams(search)
    const diaryId = params.get('id')


    useEffect(() => {
        axios
            .get(`/notes/${diaryId}`)
            .then((response) => {

                setItems(response.data)
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
            console.log(data)
            axios.post(`/comments`, data)
                .then(({ data }) => {
                    comments.push(data)
                     dispatch({
                        type: types.GET_COMMENTS,
                        payload: [...comments]
                    })
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

            <div className='diary__container__content'>

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

            </div>

            <div className='diary__container__commentsBox'>
                <h2>Комментарии</h2>
                <div className='comments__box'>
                    <Comments id={diaryId} />
                </div>

                <div className='comments__input'>
                    <input type="text"
                        onChange={(event) => {
                            setComment(event.target.value)
                        }}
                        onKeyDown={event => {
                            if (event.keyCode === 13) {
                                addComment()
                            }
                        }}
                        value={comment}
                    />

                </div>
                <div className='comments__button'
                    onClick={addComment}>
                    <span>
                        Отправить
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Diary