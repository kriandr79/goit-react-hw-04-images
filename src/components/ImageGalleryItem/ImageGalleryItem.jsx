import css from './ImageGalleryItem.module.css'

export default function ImagesGalleryItem({ webformatURL, largeImageURL, onClick }) {
  return (
    <li className={css.imagegalleryitem} onClick={() => onClick(largeImageURL)}>
      <img className={css.itemimage } src={webformatURL} width="350" alt="" />
    </li>
  );
}
