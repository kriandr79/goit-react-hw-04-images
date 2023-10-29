import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchWord: '',
  };

  handleFormSubmit = data => {
    this.setState({
      searchWord: data,
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchWord={this.state.searchWord} />
      </>
    );
  }
}
