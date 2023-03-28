import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments } from '../../redux/slices/comments'
import CommentsItem from '../CommentsItem'
import './Comments.scss'

const Comments = ({ id }) => {

    let dispatch = useDispatch()
    const { comments } = useSelector(({ ...state }) => state.comments)

    useEffect(() => {
        dispatch(fetchComments(id, ))
    }, [id])
console.log(comments);
    return (
        <div className='comments'>
            {comments.items.length ?
                comments.items.map((item, index) => (
                    <CommentsItem text={item.text} firstname={item.firstname} lastname={item.lastname} key={index} />
                )) : <>Нет комментариев...</>
            }
        </div>
    )
}

export default Comments