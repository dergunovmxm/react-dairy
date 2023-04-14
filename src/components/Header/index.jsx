import React from 'react';
import { BiBookBookmark } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

function Header() {
  const navigate = useNavigate();
  return (
    <div
      className="header-logo"
      onClick={() => {
        navigate('/');
      }}
    >
      <BiBookBookmark />
      <div className="header-logo__info">
        <b>React-Diary</b>
        <span>By Maxim Dergunov</span>
      </div>
    </div>
  );
}

export default Header;
