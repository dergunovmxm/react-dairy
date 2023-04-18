import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Input.scss';

function Input({
  setValue, onKeyDown, value, nav, placeholder,
}) {
  const navigate = useNavigate();
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(event) => {
        setValue(event.target.value);
        const n = nav;
        if (n) {
          navigate(n);
        }
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
