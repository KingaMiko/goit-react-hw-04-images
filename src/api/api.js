import axios from 'axios';
import { debounce } from 'lodash';

const API_KEY = '36836755-9f43607b903fa703cdff42e50';
const API_URL = 'https://pixabay.com/api/';

export const fetchImages = debounce(async (query = this.state.inputValue) => {
  this.setState({ loading: true });
  try {
    const response = await axios.get(
      `${API_URL}?q=${query}&page=${this.state.currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );

    const newImages = response.data.hits.filter(
      image => !this.state.images.some(stateImage => stateImage.id === image.id)
    );

    this.setState(prevState => ({
      images: [...prevState.images, ...newImages],
      currentPage: prevState.currentPage + 1,
    }));
  } catch (error) {
    console.error(error);
  } finally {
    this.setState({ loading: false });
  }
}, 500);
