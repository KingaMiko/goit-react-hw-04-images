import React, { useState, useEffect, useRef } from 'react';
import ReactModal from 'react-modal';
import ImageGallery from 'react-image-gallery';
import style from './Modal.module.css';
import Loader from '../Loader';

import 'react-image-gallery/styles/css/image-gallery.css';

ReactModal.setAppElement('#root');

const Modal = ({ images, currentIndex, onClose }) => {
  const [loaded, setLoaded] = useState(false);
  const imageGalleryRef = useRef(null);

  useEffect(() => {
    setLoaded(false);
  }, [currentIndex]);

  useEffect(() => {
    if (imageGalleryRef.current) {
      imageGalleryRef.current.slideToIndex(currentIndex);
      setLoaded(false);
    }
  }, [currentIndex]);

  const items = images.map(image => ({
    original: image.largeImageURL,
    thumbnail: image.webformatURL,
  }));

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <ReactModal
      isOpen={currentIndex !== null && currentIndex !== undefined}
      onRequestClose={onClose}
      className={style.modal}
      overlayClassName={style.overlay}
    >
      {!loaded && <Loader />}
      <img
        src={items[currentIndex]?.original}
        style={{ display: 'none' }}
        onLoad={handleLoad}
        alt="Invisible"
      />
      {loaded && (
        <ImageGallery
          ref={imageGalleryRef}
          items={items}
          startIndex={currentIndex}
          showPlayButton={false}
          showBullets={false}
          showNav={true}
          showThumbnails={false}
          showFullscreenButton={false}
          slideDuration={500}
        />
      )}
    </ReactModal>
  );
};

export default Modal;
