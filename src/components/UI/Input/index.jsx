import React from 'react';
import './Input.scss';

function Input({
  setValue, onKeyDown, value, navigate, placeholder,
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(event) => {
        setValue(event.target.value);
        navigate(navigate);
      }}
      onKeyDown={(event) => {
        if (event.keyCode === 13) {
          onKeyDown();
        }
      }}
      value={value}
    />
  );
}

export default Input;
