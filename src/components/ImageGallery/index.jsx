import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import style from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className={style.gallery}>
    {images.map((image, index) => (
      <ImageGalleryItem
        key={image.id}
        src={image.webformatURL}
        onClick={() => onImageClick(index)}
      />
    ))}
  </ul>
);

export default ImageGallery;
