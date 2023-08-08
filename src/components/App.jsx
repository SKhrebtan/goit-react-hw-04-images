import React, { useState, useEffect, useRef } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import waitImg from '../images/waiting.jpg';
import errorImg from '../images/error.jpg';
import emptyImg from '../images/empty.jpg';
import { GetImages } from './FetchImages';
import css from 'Styles.module.css'
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [result, setResult] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null)


  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current && messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

useEffect( () => {
    scrollToBottom()
}, [result]);
  
  useEffect(() => {
    if (searchValue === '') {
      return
    };
    setStatus('pending');
    GetImages(searchValue, page)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(
          new Error('Щось пішло не так, повторіть спробу')
        );
      })
      .then(({ hits, totalHits }) => {
        setResult(result => page === 1 ? hits : [...result, ...hits])
        setStatus(status => totalHits === 0 ? 'empty' : 'resolved');
        setTotalPages(Math.floor(totalHits / 12))
      })
      .catch(error => { 
        setError(error);
        setStatus('rejected')
      }
    )
     }
    , [searchValue, page])

  const onLoadMore = () => {
   setPage(page=>page + 1)
       };
  
  const handleFormSubmit = (searchValue) => {
    setSearchValue(searchValue);
    setPage(page => page !== 1 ? 1 : page)
     }
    
    return (
      <div className={css.app}>
      <ToastContainer autoClose={2000} />
        <Searchbar onSubmit={handleFormSubmit} />
        {(status === 'idle') && (<h1 className={css.idletitle}>Введіть запит</h1>)}
        <ImageGallery result={result} />  
       {(status === 'pending') && (
        <>
          <Loader />
          <img src={waitImg} alt="await" width="480" className={css.infoImage} />
        </>
      )
        }  
          { (status === 'rejected') && (
          <div> <h1 className={css.idletitle}>{error.message}</h1>
          <img src={errorImg} alt="error" width="480" className={css.infoImage} /></div>
               )
        }
         { status === 'empty' && (
      <div>
         <h1 className={css.idletitle}>Нема результатів по даному запиту</h1>
          <img src={emptyImg} alt="empty" width="480" className={css.infoImage} />   
      </div>   
              )
    }
    
       {result.length > 0 && page <= totalPages && (
            <Button loadMore={onLoadMore} />
        )}
             < div ref = { messagesEndRef } />  
   </div>
       );
};

export default App;

   App.propTypes = {
    page: PropTypes.number,
    totalPages: PropTypes.number,
    result: PropTypes.array,
    status: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
  };
 
      
    