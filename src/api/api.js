import axios from 'axios';

const API_KEY = '36836755-9f43607b903fa703cdff42e50';
const API_URL = 'https://pixabay.com/api/';

export const fetchImagesFromAPI = async (query, page) => {
  try {
    const response = await axios.get(
      `${API_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data.hits;
  } catch (error) {
    console.error(error);
    return [];
  }
};
