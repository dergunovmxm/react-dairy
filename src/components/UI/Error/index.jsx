import React from 'react';
import './Error.scss';

function Error({ ...props }) {
  return (
    <div className="error">
      {props.children}
    </div>
  );
}

export default Error;
