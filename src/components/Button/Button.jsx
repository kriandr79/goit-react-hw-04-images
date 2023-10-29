import css from './Button.module.css'


export default function Button({ onClick }) {
  return (
    <div className={css.buttonwrapper}>
      <button className={css.Button} type="button" onClick={onClick}>
        Load more...
      </button>
    </div>
  );
}
