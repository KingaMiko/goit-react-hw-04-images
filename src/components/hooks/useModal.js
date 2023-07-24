import { useState, useEffect, useCallback } from 'react';

export const useModal = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

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

  return { selectedImageIndex, setSelectedImageIndex, closeModal };
};
