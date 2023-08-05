import React from 'react';
import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import { fetchImages } from '../Servises/api';

export class App extends Component  {

  state = {
    error: null,
    data: null,
    search: '',
    showLoadMore: false,
    page: 1,
    showLoader: false,
    selectedImage: null,
    showModal: false,
    galleryRef: React.createRef(),
  }

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.search;
    const nextQuery = this.state.search;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ showLoader: true, error: null });
      try {
        const data = await fetchImages(nextQuery, nextPage);
        const totalPage = Math.ceil(data.totalHits / 12)
        this.setState({
          data: [...this.state.data, ...data.hits],
          showLoadMore: data.totalHits > 12 * nextPage
        });
        !data.totalHits && alert("No results found. Please try again!");
        nextPage >= totalPage && alert("We're sorry, but you've reached the end of search results!");
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ showLoader: false })
      }
    }
  }

  onFormSubmit = search => {
    this.setState({ search: search, page: 1, data: [] });
  }

  onLoadMore = () => {
    if (this.state.data) {
      this.setState(prevState => ({ page: prevState.page + 1 }));
    }
  }

  handleKeydown = e => {
    if (e.code === 'Escape') {
      this.setState({ showModal: false, selectedImage: null });
    }
  };
  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.setState({ showModal: false, selectedImage: null });
    }
  };

  onOpenModal = (imageId) => {
    const { data } = this.state;
    const selectedImage = data.find(image => image.id === imageId);
    this.setState({ selectedImage: selectedImage, showModal: true });
  };

  render() {
    const { data, search, showLoader, showModal, selectedImage, showLoadMore } = this.state;
    return (
      <div>
        <Searchbar pushToAnswer={this.handleSearch} onSubmit={this.onFormSubmit} />
        {search === '' && <h2 className='h2'>Please enter your response!</h2>}
        {data && <ImageGallery arrayResults={data} key={data.id} onOpenModal={this.onOpenModal}/>}
        {showLoadMore && <Button handleClick={this.onLoadMore}><span>Load More</span></Button>}
        {showLoader && <Loader />}
        {showModal && (
          <Modal
            onBackdropClose={this.handleBackdropClick}
            onKeydownClose={this.handleKeydown}
          >
            <img src={selectedImage.largeImageURL} alt="imageSearch" />
          </Modal>
        )}
      </div>
    );
  }
};
