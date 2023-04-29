import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export const Button = ({
  children,
  onClick,
}) => {

  return (
    <Link to='http://localhost:4000/'  target={"_blank"} rel="noopener noreferrer" className='btn-mobile'>
      <button
        className={`btn--outline btn--medium`}
        onClick={onClick}
      >
        {children}
      </button>
    </Link>
  );
};