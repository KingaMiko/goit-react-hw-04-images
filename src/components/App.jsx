import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

import Searchbar from './Searchbar/index';
import ImageGallery from './ImageGallery/index';
import Button from './Button/index';
import Loader from './Loader/index';
import Modal from './Modal/index';

const API_KEY = '36836755-9f43607b903fa703cdff42e50';
const API_URL = 'https://pixabay.com/api/';

const App = () => {
  const [inputValue, setInputValue] = useState('nature');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const fetchImagesRef = useRef(
    debounce(async (query = inputValue) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}?q=${query}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );

        const newImages = response.data.hits.filter(
          image => !images.some(stateImage => stateImage.id === image.id)
        );

        setImages(prevImages => [...prevImages, ...newImages]);
        setCurrentPage(prevPage => prevPage + 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 500)
  );

  const handleSubmit = useCallback(inputValue => {
    setInputValue(inputValue);
    setImages([]);
    setCurrentPage(1);
  }, []);

  const handleImageClick = useCallback(imageIndex => {
    if (typeof imageIndex === 'number') {
      setSelectedImageIndex(imageIndex);
    }
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  const handleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    fetchImagesRef.current();
  }, [inputValue]);

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
        <Button onClick={fetchImagesRef}>Load more</Button>
      ) : !loading && images.length === 0 ? (
        <p style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
          No images found
        </p>
      ) : null}
    </div>
  );
};

export default App;
