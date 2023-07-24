import React, { useState } from 'react';
import Loader from '../Loader/index';
import style from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, onClick }) => {
  const [loading, setLoading] = useState(true);

  return (
    <li className={style['gallery-item']} onClick={onClick}>
      <img
        src={src}
        alt=""
        onLoad={() => setLoading(false)}
        style={{ display: loading ? 'none' : 'block' }}
      />
      {loading && <Loader />}
    </li>
  );
};

export default ImageGalleryItem;
