import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import css from '../Styles.module.css'
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';

class App extends Component {
  state = {
    searchValue: '',
       }
  
  handleFormSubmit = (searchValue) => {
    this.setState({ searchValue })
      }
    
  render() {
       const { searchValue } = this.state;
    
    return (<div className={css.app}>
      <ToastContainer autoClose={2000} />
    
      <Searchbar onSubmit={this.handleFormSubmit} />
      
      <ImageGallery value={searchValue} />
      
   </div>
     
  );
}
 
};

export default App;

App.propTypes = {
  searchValue: PropTypes.string,
}