import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';

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
      <Searchbar onSubmit={this.handleFormSubmit} />
      <ul className="gallery">
  <li className="gallery-item">
          {result && <img src={result.hits[0].webformatURL} alt="" />}
</li>
</ul>
   </div>
     
  );
}
 
};

export default App;
