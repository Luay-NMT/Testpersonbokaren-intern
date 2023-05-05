import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
const config = require('../config');


export const Button = ({
  children,
  onClick,
}) => {

  return (
    <Link to={config.externURL}  target={"_blank"} rel="noopener noreferrer" className='btn-mobile'>
      <button
        className={`btn--outline btn--medium`}
        onClick={onClick}
      >
        {children}
      </button>
    </Link>
  );
};
