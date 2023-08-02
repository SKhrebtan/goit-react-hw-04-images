import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import css from '../Styles.module.css'
import { ToastContainer } from 'react-toastify';



class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    }
  
  handleFormSubmit = (searchValue) => {
    this.setState({ searchValue })
      this.setState({page : 1})
      ;
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
