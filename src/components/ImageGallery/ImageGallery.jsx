import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'
import css from './ImageGallery.module.css';

export const ImageGallery = ({ arrayResults, onOpenModal }) => {

    return (
        <ul className={css.gallery} id='gallery'>
              {arrayResults.map(image => {
                return (
                    <ImageGalleryItem
                        key={image.id}
                        imageId={image.id}
                        imageURL={image.webformatURL}
                        onOpenModal={onOpenModal}
                    />
                )
            })}
        </ul>
    );
};