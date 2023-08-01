import React from 'react';
import css from '../../Styles.module.css';
    
export default function ImageGallery({ children }) {
    return (
        <ul className={css.gallery}>
  {children}
  </ul>
    )
}