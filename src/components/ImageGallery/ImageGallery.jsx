import css from './ImageGallery.module.css';
import ImagesGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ images, modalShow }) {
  return (
    <>
      <div>
        <ul className={css.ImageGallery}>
          {images.map(({ id, webformatURL, largeImageURL }) => (
            <ImagesGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              onClick={modalShow}
            ></ImagesGalleryItem>
          ))}
        </ul>
      </div>
    </>
  );
}
