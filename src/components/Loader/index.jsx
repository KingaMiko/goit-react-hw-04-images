import React from 'react';
import { Puff } from 'react-loader-spinner';
import style from './Loader.module.css';

const Loader = () => (
  <div className={style.loader}>
    <Puff color="#FFC0CB" height={100} width={100} />
  </div>
);

export default Loader;
