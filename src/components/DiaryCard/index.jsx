import './DiaryCard.scss';
import { FiEdit, FiTrash2, FiImage } from 'react-icons/fi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditModal from '../EditModal';
import axios from '../../axios';
import crud from '../../crud';

function DiaryCard({
  image,
  title,
  description,
  id,
  date,
  removeNote,
  setIsEdit,
  isEdit,
}) {
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editImage, setEditImage] = useState('');

  return (
    <>
      {editOpen ? (
        <section className={editOpen ? 'editModal active' : 'editModal'}>
          <EditModal
            editOpen={editOpen}
            setEditOpen={setEditOpen}
            id={id}
            editTitle={editTitle}
            setEditTitle={setEditTitle}
            editDescription={editDescription}
            setEditDescription={setEditDescription}
            editImage={editImage}
            setEditImage={setEditImage}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
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
                setEditOpen(true); crud.getData({
                  id, setEditDescription, setEditImage, setEditOpen, setEditTitle, setIsEdit,
                }); event.stopPropagation();
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
