import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';
import convertBase64 from '../../../utils/functions';
import './ImageCropDialog.scss';

function ImageCropDialog({
  imageUrl,
  cropInit,
  zoomInit,
  aspectInit,
  onCancel,
  setCroppedImageFor,
  setOpenCrop,
  selectFile,
  setNoteImage,
}) {
  const aspectRatios = [
    { value: 4 / 3, text: '4/3' },
    { value: 3 / 4, text: '3/4' },
    { value: 16 / 9, text: '16/9' },
    { value: 9 / 16, text: '9/16' },
    { value: 1 / 1, text: '1/1' },
  ];

  if (zoomInit == null) {
    zoomInit = 1;
  }

  if (cropInit == null) {
    cropInit = {
      x: 0,
      y: 0,
    };
  }

  if (aspectInit == null) {
    aspectInit = aspectRatios[0].value;
  }

  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  const [aspect, setAspect] = useState(aspectInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onAspectChange = (e) => {
    const { value } = e.target;
    setAspect(value);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels);
    setCroppedImageFor(crop, zoom, aspect, croppedImageUrl);
    setOpenCrop(false);
  };

  return (
    <div>
      <div className="backdrop" />
      <div className="crop-container">
        <Cropper
          image={imageUrl}
          zoom={zoom}
          crop={crop}
          aspect={aspect}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="controls">
        <div className="controlls__upper__area">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onInput={(event) => {
              onZoomChange(event.target.value);
            }}
            className="slider"
          />
          <select onChange={onAspectChange}>
            {aspectRatios.map((ratio) => (
              <option key={ratio.text} value={ratio.value}>
                {ratio.text}
              </option>
            ))}
          </select>
        </div>
        <div className="button__area">
          <div className="button__area__button exit" onClick={onCancel}>
            Выйти
          </div>
          <div className="button__area__button save" onClick={onCrop}>
            Сохранить
          </div>
          <div
            className="button__area__button load"
          >
            <input
              name="image"
              className="input input__file"
              id="input__file"
              type="file"
              onChange={(event) => {
                selectFile(
                  convertBase64(event.target.files[0], setNoteImage),
                  setOpenCrop(true),
                );
              }}
              multiple
            />
            <label htmlFor="input__file">
              <span className="input__file-button-text">Загрузить новое</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageCropDialog;
