import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { fetchImagesFromAPI } from 'api/api';

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
          const newImages = await fetchImagesFromAPI(query, page);

          setImages(prevImages => {
            const filteredImages = newImages.filter(
              image =>
                !prevImages.some(stateImage => stateImage.id === image.id)
            );
            return [...prevImages, ...filteredImages];
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
