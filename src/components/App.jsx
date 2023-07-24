import React, { Component } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

import Searchbar from './Searchbar/index';
import ImageGallery from './ImageGallery/index';
import Button from './Button/index';
import Loader from './Loader/index';
import Modal from './Modal/index';

const API_KEY = '36836755-9f43607b903fa703cdff42e50';
const API_URL = 'https://pixabay.com/api/';

class App extends Component {
  state = {
    inputValue: 'nature',
    images: [],
    loading: false,
    currentPage: 1,
    selectedImage: null,
  };

  handleSubmit = inputValue => {
    this.setState({ inputValue, images: [], currentPage: 1 }, () =>
      this.fetchImages(inputValue)
    );
  };

  handleImageClick = imageIndex => {
    if (typeof imageIndex === 'number') {
      this.setState({ selectedImageIndex: imageIndex });
    }
  };

  closeModal = () => {
    this.setState({ selectedImageIndex: null });
  };

  fetchImages = debounce(async (query = this.state.inputValue) => {
    this.setState({ loading: true });
    try {
      const response = await axios.get(
        `${API_URL}?q=${query}&page=${this.state.currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      const newImages = response.data.hits.filter(
        image =>
          !this.state.images.some(stateImage => stateImage.id === image.id)
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

  componentDidMount() {
    this.fetchImages();

    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.closeModal();
    }
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />

        <Modal
          images={this.state.images}
          onClose={this.closeModal}
          currentIndex={this.state.selectedImageIndex}
        />

        <ImageGallery
          images={this.state.images}
          onImageClick={this.handleImageClick}
        />

        {this.state.loading ? (
          <Loader />
        ) : this.state.images.length > 0 ? (
          <Button onClick={this.fetchImages}>Load more</Button>
        ) : !this.state.loading && this.state.images.length === 0 ? (
          <p style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>
            No images found
          </p>
        ) : null}
      </div>
    );
  }
}

export default App;
