import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from '../../Styles.module.css';


const modal = document.querySelector('#modal');


export default class Modal extends Component {

    
    componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown)
    }
    componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
    }

    handleKeydown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }
      handleBackdropClick = e => {
            if (e.target === e.currentTarget) {
                this.props.onClose();
            }
        }
    render() {
        const { largeImageURL, tags } = this.props.modalData;
        return createPortal(            
            <div className={css.overlay} onClick={this.handleBackdropClick}>
                <div className={css.modal}>
                     <img src={largeImageURL} alt={tags} />
                </div>
            </div>, modal
        )
    }
}

Modal.propTypes = {
    largeImageURL: PropTypes.string,
    tags: PropTypes.string
}