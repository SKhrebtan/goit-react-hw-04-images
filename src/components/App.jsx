import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import { ToastContainer } from 'react-toastify';



class App extends Component {
  state = {
    searchValue: '',
    result: null,
  }
  
  handleFormSubmit = (searchValue) => {
    this.setState({searchValue})
  }

  componentDidUpdate(prevProps, prevState) {
    const url = 'https://pixabay.com/api/'
    const params = `?q=${this.state.searchValue}&page=1&key=38328283-3432d4ee282ba2126186b7660&image_type=photo&orientation=horizontal&per_page=12`
    if (prevState.searchValue !== this.state.searchValue) {
      fetch(`${url}${params}`).then(res => res.json()).then(result => this.setState({result}))
              }       
         }
    
  render() {
    const { result } = this.state;
    return (<div>
      <ToastContainer autoClose={2000} />
    
      <Searchbar onSubmit={this.handleFormSubmit} />
      <Loader />
      <ImageGallery>
        {result && <ImageGalleryItem options={result.hits} />}
       </ImageGallery>
   </div>
     
  );
}
 
};

export default App;
