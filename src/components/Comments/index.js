import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadComments } from '../../redux/actions'
import CommentsItem from '../CommentsItem'
import './Comments.scss'

const Comments = () => {

    let dispatch = useDispatch()
    const comments = useSelector((state) => state.comments)

    useEffect(() => {
        dispatch(loadComments())
    }, [])
    return (
        <div className='comments'>
            {
                comments.map((item) => (
                    <CommentsItem text={item.text} firstname={item.firstname} lastname={item.lastname} role={item.role} />
                ))
            }
        </div>
    )
}

export default Comments