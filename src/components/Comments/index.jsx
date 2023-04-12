import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../../redux/slices/comments';
import CommentsItem from '../CommentsItem';

function Comments({ id }) {
  const dispatch = useDispatch();
  const { comments } = useSelector(({ ...state }) => state.comments);

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [id]);

  return (
    <section className="comments">
      {comments.items.length ? (
        comments.items.map((item) => (
          <CommentsItem
            text={item.text}
            firstname={item.firstname}
            lastname={item.lastname}
            key={item.id}
          />
        ))
      ) : (
        <>Нет комментариев...</>
      )}
    </section>
  );
}

export default Comments;
