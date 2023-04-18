import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { useNavigate } from 'react-router-dom';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as yup from 'yup';
import {
  Error, Title, Button, ImageCropDialog,
} from '../../components/UI';
import convertBase64 from '../../utils/functions';
import axios from '../../axios';
import 'react-image-crop/dist/ReactCrop.css';
import './CreateNote.scss';
import crud from '../../crud';

moment.locale('ru');
function CreateNote() {
  const [noteImage, setNoteImage] = useState('');
  const [noteTitle, setTitle] = useState('');
  const [noteDescription, setDescription] = useState('');
  const [src, selectFile] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [closeCrop, setCloseCrop] = useState(true);
  const navigate = useNavigate();

  const onCancel = () => {
    setOpenCrop(false);
  };

  const setCroppedImageFor = (crop, zoom, aspect, croppedImageUrl) => {
    const newImage = {
      noteImage,
      crop,
      zoom,
      aspect,
      croppedImageUrl,
    };
    setNoteImage(croppedImageUrl);
  };

  const validationSchema = yup.object().shape({
    title: yup
      .string()
      .typeError('Неверный тип')
      .required('Введите заголовок записи'),
    description: yup
      .string()
      .typeError('Неверный тип')
      .required('Введите текст записи'),
    image: yup
      .string()
      .typeError('Неверный тип')
      .required('Загрузите изображение'),
  });

  const initialValues = {
    title: noteTitle,
    description: noteDescription,
    image: noteImage,
    date: moment().format('LLL'),
  };

  const onSubmit = (values) => {
    crud.creatingNote({ values, noteImage, navigate });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form className="createNote-container">
          <Title title="Создание записи" />

          <div className="createNote-container__title">
            <Field
              id="title"
              type="text"
              name="title"
              placeholder="Введите заголовок записи"
            />
          </div>
          <ErrorMessage className="error" name="title" component={Error} />

          <div className="createNote-container__description">
            <Field
              id="descripton"
              name="description"
              as="textarea"
              placeholder="Введите запись"
            />
          </div>

          <ErrorMessage
            className="error"
            name="description"
            component={Error}
          />

          <div className="createNote-container__image">
            <div className="input__wrapper">
              <input
                name="image"
                className="input input__file"
                id="input__file"
                type="file"
                onChange={(event) => {
                  formik.handleChange(event);
                  selectFile(
                    convertBase64(event.target.files[0], setNoteImage),
                    setOpenCrop(true),
                  );
                }}
                onBlur={formik.handleBlur}
                value={formik.values.image}
                multiple
              />
              <label htmlFor="input__file" className="input__file-button">
                <span className="input__file-button-text">Выберите файл</span>
              </label>
            </div>

            <div className="createNote-container__image__prewiew">
              {openCrop ? (
                <ImageCropDialog
                  imageUrl={noteImage}
                  onCancel={onCancel}
                  setCroppedImageFor={setCroppedImageFor}
                  setOpenCrop={setOpenCrop}
                />
              ) : null}
              {noteImage ? (
                <img
                  className="createNote-container__image__prewiew__img"
                  src={noteImage}
                  onClick={() => setOpenCrop(!openCrop)}
                />
              ) : (
                <> </>
              )}
            </div>
          </div>
          {formik.touched.image && formik.errors.image ? (
            <div className="error" name="image">
              {formik.errors.image}
            </div>
          ) : null}

          <Button name="Записать" submit disable={!formik.isValid} />
          <Button
            name="Сбросить"
            onClickButton={(event) => {
              setNoteImage('');
              event.stopPropagation();
            }}
          />
        </Form>
      )}
    </Formik>
  );
}

export default CreateNote;
