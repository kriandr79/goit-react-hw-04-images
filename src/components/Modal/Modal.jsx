import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, largeImageURL }) {
  
  useEffect(() => {
    
    const handleKeyDown = ({ code }) => {
      if (code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleModalClose = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleModalClose}>
      <div className={css.Modal}>
        <img
          className={css.imagelarge}
          src={largeImageURL}
          alt=""
          width="100"
        />
      </div>
    </div>,
    modalRoot
  );
}

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = ({ code }) => {
//     if (code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   handleModalClose = ({ target, currentTarget }) => {
//     if (target === currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={css.Overlay} onClick={this.handleModalClose}>
//         <div className={css.Modal}>
//           <img className={css.imagelarge}  src={this.props.largeImageURL} alt="" width="100" />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }
