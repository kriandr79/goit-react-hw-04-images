import { Component } from 'react';
import css from './ImageGallery.module.css';
import ImagesGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import getImages from 'services/getImages';
import Loader from 'components/Loader/Loader';
import { scrollDown } from 'utils/scrolldown';
import Modal from 'components/Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    images: '',
    page: 1,
    isLoading: false,
    error: '',
    showModal: false,
    largeImageURL: '',
    // status: 'idle',
  };
  componentDidUpdate(prevProps, prevState) {
    const lastSearchWord = prevProps.searchWord;
    const nextSearchWord = this.props.searchWord;
    const lastPage = prevState.page;
    const nextPage = this.state.page;

    // Коли вводиться інше пошукове слово - обнуляем стейт
    if (lastSearchWord !== nextSearchWord) {
      this.setState({ images: '', page: 1 });
    }

    // коли змінюється сторінка
    if (lastSearchWord !== nextSearchWord || lastPage !== nextPage) {
      this.setState({ isLoading: true });

      getImages(nextSearchWord, nextPage)
        .then(({ data, status, statusText }) => {
          if (status === 200) {
            this.setState(({ images }) => ({
              images: [...images, ...data.hits],
            }));
          } else return Promise.reject(statusText);
        })
        .catch(error => {
          this.setState({ error });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleLoadMoreBtn = () => {
    this.setState({ page: this.state.page + 1 });
    scrollDown();
  };

  showModal = imageURL => {
    console.log(imageURL);
    this.setState({ showModal: true, largeImageURL: imageURL });
  };
  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const { images, isLoading, error, showModal, largeImageURL } = this.state;

    // if (status === 'resolved') {
    //   return (
    //     <div>
    //       <ul className={css.ImageGallery}>
    //         {images.map(({ id, webformatURL, largeImageURL }) => (
    //           <ImagesGalleryItem
    //             key={id}
    //             webformatURL={webformatURL}
    //             largeImageURL={largeImageURL}
    //           ></ImagesGalleryItem>
    //         ))}
    //       </ul>
    //       <Button onClick={this.handleLoadMoreBtn}></Button>
    //     </div>
    //   );
    // }
    // else if (status === 'pending') {
    //   return <div>Loading...</div>;
    // }
    // else if (status === 'rejected') {
    //   return <div>Error</div>;
    // }

    return (
      <>
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            onClose={this.closeModal}
          ></Modal>
        )}
        {error && <div>{error}</div>}
        {isLoading && <Loader></Loader>}
        {images.length > 0 && (
          <div>
            <ul className={css.ImageGallery}>
              {images.map(({ id, webformatURL, largeImageURL }) => (
                <ImagesGalleryItem
                  key={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  onClick={this.showModal}
                ></ImagesGalleryItem>
              ))}
            </ul>

            <Button onClick={this.handleLoadMoreBtn}></Button>
          </div>
        )}
      </>
    );
  }
}
