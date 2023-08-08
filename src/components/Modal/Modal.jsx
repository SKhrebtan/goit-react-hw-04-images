import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from '../../Styles.module.css';


const modal = document.querySelector('#modal');

export default function Modal ({onClose, modalData}) {

   
    useEffect(() => {
           const handleKeydown = e => {
        if (e.code === 'Escape') {
            onClose();
        }
    }
        window.addEventListener('keydown', handleKeydown);
            
        return () => { window.removeEventListener('keydown', handleKeydown) }
    }, [onClose])
  
     const handleBackdropClick = e => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }
           const { largeImageURL, tags } = modalData;
        return createPortal(            
            <div className={css.overlay} onClick={handleBackdropClick}>
                <div className={css.modal}>
                     <img src={largeImageURL} alt={tags} />
                </div>
            </div>, modal
        )
    
}

Modal.propTypes = {
    largeImageURL: PropTypes.string,
    tags: PropTypes.string
}