import React from 'react';
import css from '../../Styles.module.css';

export default function ImageGalleryItem ({ options }) {
    return (
        options.map(({id, tag, webformatURL}) => {
            return (
                <li className={css.gallery_item} key={id}>
                    <img src={webformatURL} alt={tag} className={css.item_image} />
</li>
            )
        })
        
             )
}