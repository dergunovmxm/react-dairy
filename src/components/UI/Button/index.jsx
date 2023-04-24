import React from 'react';
import './Button.scss';

function Button({
  value, submit, onClickButton, disabled,
}) {
  return (
    <div className="button">
      <button type={submit ? 'submit' : 'button'} onClick={onClickButton} disabled={disabled}>
        {value}
      </button>
    </div>
  );
}

export default Button;
