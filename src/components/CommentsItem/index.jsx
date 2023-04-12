import './CommentItem.scss';
import React, { useState } from 'react';
import { FiUser } from 'react-icons/fi';

function CommentsItem({ text, firstname, lastname }) {
  const user = `${firstname} ${lastname}`;
  const [openComment, setOpenComment] = useState(false);

  return (
    <section className={openComment ? 'commentItem open' : 'commentItem'}>
      <div className="commentItem__avatar">
        <FiUser />
      </div>

      <div
        className={
          openComment ? 'commentItem-contentOpen' : 'commentItem-content'
        }
      >
        <div className="commentItem-content__name">
          <span>{user}</span>
        </div>

        <div
          className={
            openComment
              ? 'commentItem-content__text open'
              : 'commentItem-content__text'
          }
        >
          <span>{text}</span>
        </div>
        <div
          className="openButton"
          onClick={() => setOpenComment(!openComment)}
        >
          {openComment ? <span>Свернуть</span> : <span>Развернуть</span>}
        </div>
      </div>
    </section>
  );
}

export default CommentsItem;
