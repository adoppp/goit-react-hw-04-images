import React, { useEffect, useState } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import { getImages } from '../Servises/api';

// export class Ap extends Component  {

//   state = {
//     error: null,
//     data: null,
//     search: '',
//     showLoadMore: false,
//     page: 1,
//     showLoader: false,
//     selectedImage: null,
//     showModal: false,
//     galleryRef: React.createRef(),
//   }

//   async componentDidUpdate(prevProps, prevState) {
//     const prevQuery = prevState.search;
//     const nextQuery = this.state.search;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevQuery !== nextQuery || prevPage !== nextPage) {
//       this.setState({ showLoader: true, error: null });
//       try {
//         const data = await fetchImages(nextQuery, nextPage);
//         const totalPage = Math.ceil(data.totalHits / 12)
//         this.setState({
//           data: [...this.state.data, ...data.hits],
//           showLoadMore: data.totalHits > 12 * nextPage
//         });
//         !data.totalHits && alert("No results found. Please try again!");
//         nextPage >= totalPage && alert("We're sorry, but you've reached the end of search results!");
//       } catch (error) {
//         this.setState({ error });
//       } finally {
//         this.setState({ showLoader: false })
//       }
//     }
//   }

//   onFormSubmit = search => {
//     this.setState({ search: search, page: 1, data: [] });
//   }

//   onLoadMore = () => {
//     if (this.state.data) {
//       this.setState(prevState => ({ page: prevState.page + 1 }));
//     }
//   }

//   handleKeydown = e => {
//     if (e.code === 'Escape') {
//       this.setState({ showModal: false, selectedImage: null });
//     }
//   };
//   handleBackdropClick = e => {
//     if (e.target === e.currentTarget) {
//       this.setState({ showModal: false, selectedImage: null });
//     }
//   };

//   onOpenModal = (imageId) => {
//     const { data } = this.state;
//     const selectedImage = data.find(image => image.id === imageId);
//     this.setState({ selectedImage: selectedImage, showModal: true });
//   };

//   render() {
//     const { data, search, showLoader, showModal, selectedImage, showLoadMore } = this.state;
//     return (
//       <div>
//         <Searchbar pushToAnswer={this.handleSearch} onSubmit={this.onFormSubmit} />
//         {search === '' && <h2 className='h2'>Please enter your response!</h2>}
//         {data && <ImageGallery arrayResults={data} key={data.id} onOpenModal={this.onOpenModal}/>}
//         {showLoadMore && <Button handleClick={this.onLoadMore}><span>Load More</span></Button>}
//         {showLoader && <Loader />}
//         {showModal && (
//           <Modal
//             onBackdropClose={this.handleBackdropClick}
//             onKeydownClose={this.handleKeydown}
//           >
//             <img src={selectedImage.largeImageURL} alt="imageSearch" />
//           </Modal>
//         )}
//       </div>
//     );
//   }
// };

export const App = () =>  {

  // state = {
  //   error: null,
  //   data: null,
  //   search: '',
  //   showLoadMore: false,
  //   page: 1,
  //   showLoader: false,
  //   selectedImage: null,
  //   showModal: false,
  //   galleryRef: React.createRef(),
  // }

  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);

  const [selectedImage, setSelectedImage] = useState(null);

  const [error, setError] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);


  // async componentDidUpdate(prevProps, prevState) {
  //   const prevQuery = prevState.search;
  //   const nextQuery = this.state.search;
  //   const prevPage = prevState.page;
  //   const nextPage = this.state.page;

  //   if (prevQuery !== nextQuery || prevPage !== nextPage) {
  //     this.setState({ showLoader: true, error: null });
  //     try {
  //       const data = await fetchImages(nextQuery, nextPage);
  //       const totalPage = Math.ceil(data.totalHits / 12)
  //       this.setState({
  //         data: [...this.state.data, ...data.hits],
  //         showLoadMore: data.totalHits > 12 * nextPage
  //       });
  //       !data.totalHits && alert("No results found. Please try again!");
  //       nextPage >= totalPage && alert("We're sorry, but you've reached the end of search results!");
  //     } catch (error) {
  //       this.setState({ error });
  //     } finally {
  //       this.setState({ showLoader: false })
  //     }
  //   }
  // }

   const scroll = () => {
    const { clientHeight } = document.documentElement;
    window.scrollBy({
      top: clientHeight - 180,
      behavior: 'smooth',
    });
  };

   useEffect(() => {
    const fetchImages = async () => {
      if (!search) {
        return;
      }

      setShowLoader(true);
      try {
        const response = await getImages(search, page);
        const totalPages = Math.ceil(response.totalHits / 12);

        if (response.hits.length === 0) {
          alert(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        setData(data => [...data, ...response.hits]);

        if (page >= totalPages) {
          alert(
            "We're sorry, but you've reached the end of search results."
          );
          setShowLoadMore(false);
        } else {
          setShowLoadMore(true);
        }
      } catch (error) {
        alert(`Oops, something went wrong: ${error.message}`);
      } finally {
        setShowLoader(false);
      }
    };

     fetchImages()
  }, [search, page]);


  const onFormSubmit = search => {
    // this.setState({ search: search, page: 1, data: [] });
    setSearch(search);
    setPage(1);
    setData([]);
  }

  const onLoadMore = () => {
    // if (this.state.data) {
    //   this.setState(prevState => ({ page: prevState.page + 1 }));
    // }
    if (data) {
      setPage({...page, page: page + 1})
    }
  }

  const handleKeydown = e => {
    if (e.code === 'Escape') {
      // this.setState({ showModal: false, selectedImage: null });
      setShowModal(false);
      setSelectedImage(null);
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      // this.setState({ showModal: false, selectedImage: null });
      setShowModal(false);
      setSelectedImage(null);
    }
  };

  const onOpenModal = (imageId) => {
    const selectedImage = data.find(image => image.id === imageId);
    // this.setState({ selectedImage: selectedImage, showModal: true });
    setSelectedImage(selectedImage);
    setShowModal(true);
  };

  
    return (
      <div>
        <Searchbar pushToAnswer={onFormSubmit} onSubmit={onFormSubmit} />
        {search === '' && <h2 className='h2'>Please enter your response!</h2>}
        {data && <ImageGallery arrayResults={data} key={data.id} onOpenModal={onOpenModal}/>}
        {showLoadMore && <Button handleClick={onLoadMore}><span>Load More</span></Button>}
        {showLoader && <Loader />}
        {showModal && (
          <Modal
            onBackdropClose={handleBackdropClick}
            onKeydownClose={handleKeydown}
          >
            <img src={selectedImage.largeImageURL} alt="imageSearch" />
          </Modal>
        )}
      </div>
    );
};