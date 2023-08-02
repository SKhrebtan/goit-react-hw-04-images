import React from 'react';
import PropTypes from 'prop-types';
import css from '../../Styles.module.css';

export default function ImageGalleryItem({ options, onImageClick }) {
    const { tags, webformatURL, largeImageURL } = options;
    return (
        <li className={css.gallery_item}
          onClick={e => {
        e.preventDefault();
        onImageClick({ largeImageURL, tags });
      }}>
        <img src={webformatURL} alt={tags} className={css.item_image} />
        </li>
                  )
}  

ImageGalleryItem.propTypes = {
  options: PropTypes.object,
  onImageClick: PropTypes.func
}