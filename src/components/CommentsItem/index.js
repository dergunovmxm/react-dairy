import './CommentItem.scss'
import { FiUser } from 'react-icons/fi'

const CommentsItem = ({ text, firstname, lastname, role }) => {
    let user = `${firstname} ${lastname}`
    return (
        <div className='commentItem'>


            <div className='commentItem__user__avatar'>
                <FiUser />
            </div>

            <div className='commentItem__content'>
                
                <div className='commentItem__content__name'>
                    <span>{user}</span>
                </div>

                <div className='commentItem__content__text'>
                    <span>{text}</span>
                </div>
            </div>



        </div>
    )
}

export default CommentsItem