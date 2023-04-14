import React from 'react';
import './Button.scss';

function Button({
  name, submit, onClickButton, disable, classType,
}) {
  return (
    <div className={classType ? `${classType}__button` : 'button'}>
      <button type={submit ? 'submit' : 'button'} onClick={onClickButton} disabled={disable}>
        {name}
      </button>
    </div>
  );
}

export default Button;
