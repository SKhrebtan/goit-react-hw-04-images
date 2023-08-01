import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Button from './Button/Button'
import { ToastContainer } from 'react-toastify';



class App extends Component {
  state = {
    searchValue: '',
    page: 0,
    result: null,
    status: 'idle',
  }
  
  handleFormSubmit = (searchValue) => {
    this.setState({ searchValue });
    this.setState({ page: 1 });
  }

  componentDidUpdate(prevProps, prevState) {
    
    const url = 'https://pixabay.com/api/'
    const params = `?q=${this.state.searchValue}&page=${this.state.page}&key=38328283-3432d4ee282ba2126186b7660&image_type=photo&orientation=horizontal&per_page=12`
    if (prevState.page !== this.state.page || prevState.searchValue !== this.state.searchValue) {
      this.setState({staturs: 'pending' })
    fetch(`${url}${params}`).then(res => res.json()).then(res => this.setState({result: this.state.page === 1 ? res.hits : [...prevState.result, ...res.hits]}))
              }       
  }
  
  onLoadMore = () => {
    this.setState(({page}) => ({ page: page + 1 }));
    console.log(this.state.page)
  }
    
  render() {
       const { result } = this.state;
    console.log(result)
    return (<div>
      <ToastContainer autoClose={2000} />
    
      <Searchbar onSubmit={this.handleFormSubmit} />
      <Loader />
      <ImageGallery>
        {result && <ImageGalleryItem options={result} />}
      </ImageGallery>
      <Button loadMore={this.onLoadMore} />
   </div>
     
  );
}
 
};

export default App;
