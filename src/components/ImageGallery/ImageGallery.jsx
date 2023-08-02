import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal'
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import {GetImages} from '../FetchImages/FetchImages'
import css from '../../Styles.module.css';
import waitImg from '../../images/waiting.jpg';
import errorImg from '../../images/error.jpg';
import emptyImg from '../../images/empty.jpg';
import PropTypes from 'prop-types';
    
export default class ImageGallery extends Component {
  state = {
    page: 1,
    totalPages: 0,
    result: null,
    status: 'idle',
    value: '',
    error: null,
    showModal: false,
    modalData: {
      largeImageURL: 'https://ik.imagekit.io/demo/medium_cafe_B1iTdD0C.jpg',
      tags: '',
    },
  };
  
  static propTypes = {
    page: PropTypes.number,
    totalPages: PropTypes.number,
    result: PropTypes.array,
    status: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    showModal: PropTypes.bool,
    modalData: PropTypes.object
};
    
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.value !== nextProps.value) {
      return { page: 1, value: nextProps.value };
    }
    return null;
  }

    componentDidUpdate(prevProps, prevState) {
        const { page } = this.state;
        const currentValue = this.props.value

    if (prevProps.value !== currentValue || prevState.page !== page
    ) {
      this.setState({ status: 'pending' });
     
      GetImages(currentValue, page)
            .then(response => {
              if (response.ok) {
                return response.json();
              }
              return Promise.reject(
                new Error('Щось пішло не так, повторіть спробу')
              );
            })
            .then(response => {
              this.setState({
                result:
                  page === 1
                    ? response.hits
                    : [...prevState.result, ...response.hits],
                status: 'resolved',
                totalPages: Math.floor(response.totalHits / 12),
              });
            })
                  .catch(error => this.setState({ error, status: 'rejected' }))
    }
  }

  onLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
       };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  setModalData = modalData => {
    this.setState({ modalData, showModal: true });
    };

  render() {
    const { result, status, showModal, modalData, error, page, totalPages } = this.state;
  
          if (status === 'idle') {
            return <h1 className={css.idletitle}>Введіть запит</h1>;
          }
      
    if (status === 'pending') {
      return (
        <>
          <Loader />
          <img src={waitImg} alt="" width="480" className={css.infoImage} />
        </>
      );
    }
      
    if (status === 'rejected') {
      return (
        <>
          <h1 className={css.idletitle}>{error.message}</h1>
          <img src={errorImg} alt="" width="480" className={css.infoImage} />
        </>
      );
    }

    if (result === null || result.length === 0) {
      return (
        <>
          <h1 className={css.idletitle}>Нема результатів по даному запиту</h1>
          <img src={emptyImg} alt="" width="480" className={css.infoImage} />
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={css.gallery}>
            {result &&
              result.map(item => (
                <ImageGalleryItem
                  options={item}
                  key={item.id}
                  onImageClick={this.setModalData}
                />
              ))}
          </ul>
          {result.length > 0 && page <= totalPages && (
            <Button loadMore={this.onLoadMore} />
          )}
          {showModal && (
            <Modal modalData={modalData} onClose={this.toggleModal} />
          )}
        </>
      );
    }
  }
}