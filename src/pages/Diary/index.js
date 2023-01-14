
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import './Diary.scss'



const Diary = () => {

    const [items, setItems] = useState({})

    let { search } = useLocation()
    const params = new URLSearchParams(search)
    const diaryId = params.get('id')


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/notes/${diaryId}`)
            .then((response) => {

                setItems(response.data)
                console.log(response.data)
            })
    }, [])



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

            <div className='diary__container__comments'>
                comments
            </div>
        </div>
    )
}

export default Diary