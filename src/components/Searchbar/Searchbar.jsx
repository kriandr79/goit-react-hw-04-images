import { useState } from 'react';
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchWord, setSearchWord] = useState('');

  const handleFormSubmit = e => {
    e.preventDefault();

    onSubmit(searchWord.trim());
    reset();
  };

  const handleInput = ({ currentTarget }) => {
    setSearchWord(currentTarget.value);
  };

  const reset = () => {
    setSearchWord('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchform} onSubmit={handleFormSubmit}>
        <button type="submit" className={css.button}>
          Search
        </button>

        <input
          className={css.input}
          type="text"
          value={searchWord}
          onChange={handleInput}
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
