import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiImage } from 'react-icons/fi';
import axios from '../../API/Service';
import { Comments } from '../../components';
import { fetchComments } from '../../redux/slices/comments';
import {
  Button, Input, Loading, Title,
} from '../../components/UI';
import commentRepository from '../../API/Repositories/commentRepository';
import './Diary.scss';
import useShowNote from '../../hooks/useShowNote';

function Diary() {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const { items, isLoading, diaryId } = useShowNote();

  const addComment = () => {
    const config = {
      text: comment,
      firstname: 'Maxim',
      lastname: 'Dergunov',
      noteId: diaryId,
    };

    if (comment !== '' && diaryId) {
      commentRepository.createComment(config)
        .then(() => {
          dispatch(fetchComments(diaryId));
        })
        .catch((error) => {
          console.warn(error);
          alert('Не удалось выполниить запрос!');
        });
      setComment('');
    }
  };

  return (
    <div className="diary-container">
      {!isLoading ? (
        <>
          <main className="diary-container-content">
            <div className="diary-container-content__image">
              {items.image ? (
                <img src={items.image} alt="defaultImage" />
              ) : (
                <FiImage />
              )}
            </div>

            <div className="diary-container-content__info">
              <div className="diary-container-content__info__title">
                <span>{items.title}</span>
              </div>

              <div className="diary-container-content__info__description">
                <span>{items.description}</span>
              </div>
            </div>
          </main>

          <section className="diary-container__commentsBox">
            <Title title="Комментарии" />
            <div className="comments__box">
              <Comments id={diaryId} />
            </div>

            <div className="comments__input">
              <Input
                onKeyDown={addComment}
                setValue={setComment}
                value={comment}
              />
            </div>

            <Button
              value="Отправить"
              submit
              onClickButton={addComment}
              classType="comments"
            />
          </section>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Diary;
