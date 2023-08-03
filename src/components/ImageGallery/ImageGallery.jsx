import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal'
import css from '../../Styles.module.css';
import PropTypes from 'prop-types';
    
export default class ImageGallery extends Component {
  state = {
  showModal: false,
   modalData: {
      largeImageURL: 'https://ik.imagekit.io/demo/medium_cafe_B1iTdD0C.jpg',
      tags: '',
    },
  };
  
  static propTypes = {
    showModal: PropTypes.bool,
    modalData: PropTypes.object
  };
  
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleModalData = modalData => {
    this.setState({ modalData, showModal: true });
  };
  


  render() {
    const { showModal, modalData} = this.state;
     const { result } = this.props;
       
      return (
        <>
          <ul className={css.gallery}>
            {result &&
              result.map(item => (
                <ImageGalleryItem
                  options={item}
                  key={item.id}
                  onImageClick={this.handleModalData}
                />
              ))}
          </ul>
         
           {showModal && (
            <Modal modalData={modalData} onClose={this.toggleModal} />)}
        </>
      );
    }
  }
