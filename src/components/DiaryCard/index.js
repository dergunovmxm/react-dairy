import { useState } from 'react'
import './DiaryCard.scss'


const DairyCard = (props) => {

  const onClickCard = (event) => {
    (alert("Удалить"))
    event.stopPropagation()
  }

    return (
        <div className='dairy__card' onClick={() =>  (alert("Click"))} >



            <div className='dairy__card__image' >
                <img src={props.img} alt="dairyImage" />
            </div>

            <div className='dairy__card__title'>
                <span>Тестовая запись №1 </span>
            </div>

            <div className='dairy__card__description'>
                <span>Часто возникает необходимость растянуть картинку по размеру блока с сохранением пропорций, чтобы изображение не искажалось. При этом результат бывает нужен разный. Иногда нужно обязательно заполнить всё пространство блока. </span>
            </div>

            <div className='dairy__card__date'>
                <span>09.12.22</span>  
            </div>

            <div className='dairy__card__toolbar'>
                <div className='dairy__card__toolbar__item'>
                    <div className='edit' onClick={() => (alert("Редактирвоать"))}>Редактировать</div>
                    <div className='delete' onClick={() => onClickCard } >Удалить</div>
                </div>
            </div>

        </div>
    )
}

export default DairyCard