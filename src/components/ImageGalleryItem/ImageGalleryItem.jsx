import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ imageId, imageURL, onOpenModal }) => {
  const handleClick = () => {
    onOpenModal(imageId);
  };
  
    return (
      <li className={css.galleryItem} key={imageId} onClick={handleClick}>
        <img src={imageURL} alt="search result" />
      </li>
    );
};

ImageGalleryItem.propTypes = {
    imageWeb: PropTypes.string,
    onOpenModal: PropTypes.func,
    imageId: PropTypes.number,
}