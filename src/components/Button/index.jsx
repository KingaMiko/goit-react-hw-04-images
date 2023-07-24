import React from 'react';
import style from './Button.module.css';

const Button = ({ onClick, children }) => (
  <button className={style.button} onClick={onClick}>
    {children}
  </button>
);

export default Button;
