import React from 'react';

import Searchbar from './Searchbar/index';
import ImageGallery from './ImageGallery/index';
import Button from './Button/index';
import Loader from './Loader/index';
import Modal from './Modal/index';

import { useFetchImages } from './hooks/useFetchImages';
import { useModal } from './hooks/useModal';

const App = () => {
  const {
    setInputValue,
    images,
    loading,
    loadMoreImages,
    setImages,
    setCurrentPage,
  } = useFetchImages();
  const { selectedImageIndex, setSelectedImageIndex, closeModal } = useModal();

  const handleImageClick = imageIndex => {
    if (typeof imageIndex === 'number') {
      setSelectedImageIndex(imageIndex);
    }
  };

  const handleSubmit = newInputValue => {
    if (newInputValue.trim() === '') {
      setImages([]);
      return;
    }

    setInputValue(newInputValue);
    setImages([]);
    setCurrentPage(1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />

      <Modal
        images={images}
        onClose={closeModal}
        currentIndex={selectedImageIndex}
      />

      <ImageGallery images={images} onImageClick={handleImageClick} />

      {loading ? (
        <Loader />
      ) : images.length > 0 ? (
        <Button onClick={loadMoreImages}>Load more</Button>
      ) : !loading && images.length === 0 ? (
        <p style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
          No images found
        </p>
      ) : null}
    </div>
  );
};

export default App;
