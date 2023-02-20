import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadComments } from '../../redux/actions'
import CommentsItem from '../CommentsItem'
import './Comments.scss'

const Comments = ({id}) => {

    let dispatch = useDispatch()
    const comments = useSelector((state) => state.comments)
    

    useEffect(() => {
        dispatch(loadComments(id))
    }, [id, comments.length])

    return (
        <div className='comments'>
            {
                comments.map((item) => (
                    <CommentsItem text={item.text} firstname={item.firstname} lastname={item.lastname} />
                ))
            }
        </div>
    )
}

export default Comments