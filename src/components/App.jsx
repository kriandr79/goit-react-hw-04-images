import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import getImages from 'services/getImages';
import Loader from 'components/Loader/Loader';
import { scrollDown } from 'utils/scrolldown';
import Modal from 'components/Modal/Modal';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);

    const fetchImages = async (query, page) => {
      try {
        const { data, status, statusText } = await getImages(query, page);
        if (status === 200) {
          setImages(prevState => [...prevState, ...data.hits]);
        } else return Promise.reject(statusText);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages(query, page);

    // getImages(query, page)
    //   .then(({ data, status, statusText }) => {
    //     if (status === 200) {
    //       setImages(prevState => [...prevState, ...data.hits]);
    //     } else return Promise.reject(statusText);
    //   })
    //   .catch(error => {
    //     setError(error);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });


  }, [query, page]);

  // Submit форми пошуку
  const handleFormSubmit = data => {
    setQuery(data);
    setImages('');
    setPage(1);
  };


  const handleLoadMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
    scrollDown();
  };

  const handleshowModal = imageURL => {
    setShowModal(true);
    setLargeImageURL(imageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {showModal && (
        <Modal largeImageURL={largeImageURL} onClose={closeModal}></Modal>
      )}
      {error && <div>{error}</div>}
      {isLoading && <Loader></Loader>}
      {images.length > 0 && (
        <div>
          <ImageGallery images={images} modalShow={handleshowModal} />
          <Button onClick={handleLoadMoreBtn}></Button>
        </div>
      )}
    </>
  );
}
