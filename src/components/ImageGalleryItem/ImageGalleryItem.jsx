import React from 'react';
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