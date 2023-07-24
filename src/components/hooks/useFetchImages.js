import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

const API_KEY = '36836755-9f43607b903fa703cdff42e50';
const API_URL = 'https://pixabay.com/api/';

export const useFetchImages = () => {
  const [inputValue, setInputValue] = useState('nature');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchImages = useCallback(
    async (query = inputValue, page = currentPage) => {
      const debouncedFetch = debounce(async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${API_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
          );

          setImages(prevImages => {
            const newImages = response.data.hits.filter(
              image =>
                !prevImages.some(stateImage => stateImage.id === image.id)
            );
            return [...prevImages, ...newImages];
          });
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }, 500);
      debouncedFetch();
    },
    [inputValue, currentPage]
  );

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const loadMoreImages = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return {
    setInputValue,
    images,
    loading,
    loadMoreImages,
    setImages,
    setCurrentPage,
  };
};
