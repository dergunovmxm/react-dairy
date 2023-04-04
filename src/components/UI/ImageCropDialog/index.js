import './ImageCropDialog.scss'
import React, { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";

const ImageCropDialog = ({ imageUrl, cropInit, zoomInit, aspectInit, onCancel, setCroppedImageFor, setOpenCrop }) => {

    const aspectRatios = [
        { value: 4 / 3, text: "4/3" },
        { value: 16 / 9, text: "16/9" },
        { value: 1 / 1, text: "1/1" }
    ]

    if (zoomInit == null) {
        zoomInit = 1
    }

    if (cropInit == null) {
        cropInit = {
            x: 0,
            y: 0
        }
    }

    if (aspectInit == null) {
        aspectInit = aspectRatios[0].value
    }

    const [zoom, setZoom] = useState(zoomInit);
    const [crop, setCrop] = useState(cropInit);
    const [aspect, setAspect] = useState(aspectInit);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropChange = (crop) => {
        setCrop(crop)
    }

    const onZoomChange = (zoom) => {
        setZoom(zoom)
    }

    const onAspectChange = (e) => {
        const value = e.target.value;
        const ratio = aspectRatios.find((ratio) => ratio.value == value);
        setAspect(ratio);
    };

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };


    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels);
        setCroppedImageFor(crop, zoom, aspect, croppedImageUrl);
        setOpenCrop(false)
    };

    return (
        <div>
            <div className='backdrop'></div>
            <div className='crop-container'>
                <Cropper image={imageUrl}
                    zoom={zoom}
                    crop={crop}
                    aspect={aspect.value}
                    onCropChange={onCropChange}
                    onZoomChange={onZoomChange}
                    onCropComplete={onCropComplete}
                />
            </div>
            <div className='controls'>
                <div className='controlls__upper__area'>
                    <input type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onInput={(event) => {
                            onZoomChange(event.target.value)
                        }}
                        className="slider"
                    ></input>
                    <select onChange={onAspectChange} value={aspect}>
                        {aspectRatios.map((ratio) => (
                            <option
                                key={ratio.text}
                                value={ratio.value}

                            >
                                {ratio.text}
                            </option>
                        ))}
                    </select>

                </div>
                <div className='button__area'>
                    <div className='button__area__button exit' onClick={onCancel}>Выйти</div>
                    <div className='button__area__button save' onClick={onCrop}>Сохранить</div>
                </div>
            </div>
        </div>
    )
}

export default ImageCropDialog