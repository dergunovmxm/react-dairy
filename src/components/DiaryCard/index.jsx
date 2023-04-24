import './DiaryCard.scss';
import { FiEdit, FiTrash2, FiImage } from 'react-icons/fi';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditModal from '../EditModal';
import axios from '../../API/Service';
import noteRepository from '../../API/Repositories/noteRepository';

function DiaryCard({
  image,
  title,
  description,
  date,
  id,
  removeNote,
  setIsEdit,
}) {
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [items, setItems] = useState({});

  const getNote = () => {
    noteRepository.getNote(id)
      .then(({ data }) => {
        setItems(data);
      })
      .catch((error) => {
        alert('Не удалось выполниить запрос!');
        console.warn(error);
      });
  };

  return (
    <>
      {editOpen ? (
        <section className={editOpen ? 'editModal active' : 'editModal'}>
          <EditModal
            setEditOpen={setEditOpen}
            id={id}
            editTitle={items.title}
            editDescription={items.description}
            editImage={items.image}
            setIsEdit={setIsEdit}
          />
        </section>
      ) : (
        <> </>
      )}

      <section
        className="dairy-card"
        onClick={() => {
          navigate(`/notes/?id=${id}`);
        }}
      >
        <div className="dairy-card__image">
          {image ? <img src={image} alt="dairyImage" /> : <FiImage />}
        </div>

        <div className="dairy-card__title">
          <span>{title}</span>
        </div>

        <div className="dairy-card__description">
          <span>{description}</span>
        </div>

        <div className="dairy-card__date">
          <span>{date}</span>
        </div>

        <aside className="dairy-card__toolbar">
          <div className="dairy-card__toolbar__item">
            <div
              className="edit"
              onClick={(event) => {
                setEditOpen(true);
                getNote();
                event.stopPropagation();
              }}
            >
              <FiEdit />
            </div>
            <div
              className="delete"
              onClick={(event) => { event.stopPropagation(); removeNote(id); }}
            >
              <FiTrash2 />
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}

export default DiaryCard;
