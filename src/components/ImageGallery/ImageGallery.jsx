import React, { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal'
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import css from '../../Styles.module.css';
import waitImg from '../../images/waiting.jpg';
import errorImg from '../../images/error.jpg';
import emptyImg from '../../images/empty.jpg'
    
export default class ImageGallery extends Component {
    state = {
    page: 1,
    result: null,
    status: 'idle',
    value: '',
    error: null,
    showModal: false,
    modalData: { largeImageURL: "https://ik.imagekit.io/demo/medium_cafe_B1iTdD0C.jpg" , tags: '' },
    }
static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.value !== nextProps.value) {
      return { page: 1, value: nextProps.value };
    }
    return null;
  }
 
  componentDidUpdate(prevProps, prevState) {
    
    const url = 'https://pixabay.com/api/'
    const params = `?q=${this.props.value}&page=${this.state.page}&key=38328283-3432d4ee282ba2126186b7660&image_type=photo&orientation=horizontal&per_page=12`
      if (prevProps.value !== this.props.value || prevState.page !== this.state.page) {
          this.setState({ status: 'pending' });
          setTimeout(
            () =>
              fetch(`${url}${params}`)
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
                      this.state.page === 1
                        ? response.hits
                        : [...prevState.result, ...response.hits],
                    status: 'resolved',
                  });
                })
              .catch(error => this.setState({error, status: 'rejected'})),
            2000
          );
              
      }
                }

    onLoadMore = () => {
    this.setState(({page}) => ({ page: page + 1 }));
    console.log(this.state.page)
    }

    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal
        }))
    }

    setModalData = modalData => {
    this.setState({ modalData, showModal: true });
  };
 
     
    render() {
        const { result, status, showModal, modalData, error } = this.state;
        console.log(result)
       
        if (status === 'idle') {
            return <h1 className={css.idletitle}>Введіть запит</h1>
        }
        if (status === 'pending') {
            return <><Loader />
                <img src={waitImg} alt="" width="480" className={css.infoImage}/></>;
                }
            if (status === 'rejected') {
                return <>
                <h1 className={css.idletitle}>{error.message}</h1>
                <img src={errorImg} alt="" width="480" className={css.infoImage}/></>;
        }

           if (result === null || result.length === 0) {
                return <>
                <h1 className={css.idletitle}>Нема результатів по даному запиту</h1>
                <img src={emptyImg} alt="" width="480" className={css.infoImage}/></>;
        }
        
   if   (status === 'resolved'){
       return (
           <>
            <ul className={css.gallery}>
                {result && result.map(item =>
                    <ImageGalleryItem
                        options={item}
                        key={item.id}
                        onImageClick={this.setModalData}
                    />)}                
            </ul>
               <Button loadMore={this.onLoadMore} />
               {showModal && <Modal modalData={modalData} onClose={this.toggleModal} />}
           </>
         
            )
        }

      
        }
}