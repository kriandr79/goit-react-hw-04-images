import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export function App() {
  const [query, setQuery] = useState('');

  const handleFormSubmit = data => {
    setQuery(data);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchWord={query} />
    </>
  );
}

// export class App extends Component {
//   state = {
//     searchWord: '',
//   };

//   handleFormSubmit = data => {
//     this.setState({
//       searchWord: data,
//     });
//   };

//   render() {
//     return (
//       <>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery searchWord={this.state.searchWord} />
//       </>
//     );
//   }
// }
