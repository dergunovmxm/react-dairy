import './CommentItem.scss'
import React, { useState } from 'react'
import { FiUser } from 'react-icons/fi'

const CommentsItem = ({ text, firstname, lastname }) => {
    
    let user = `${firstname} ${lastname}`
    const [openComment, setOpenComment] = useState(false);

    return (
        <div className={openComment ? "commentItem open" : "commentItem"}>


            <div className='commentItem__avatar'>
                <FiUser />
            </div>

            <div className={openComment ? "commentItem__contentOpen" : 'commentItem__content'}>

                <div className='commentItem__content__name'>
                    <span>{user}</span>
                </div>

                <div className={openComment ? 'commentItem__content__text open' : 'commentItem__content__text'}>
                    <span>{text}</span>
                </div>

                <div className="openButton" onClick={() => setOpenComment(!openComment)}>
                    
                    {
                    openComment
                        ? <span>Свернуть</span>
                        : <span>Развернуть</span>
                }

                </div>

            </div>




        </div>
    )
}

export default CommentsItem