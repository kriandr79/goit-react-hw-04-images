import { Component } from 'react';
import css from './Searchbar.module.css'

export default class Searchbar extends Component {
  state = {
    searchWord: '',
  };

  handleFormSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.searchWord.trim());
    this.reset();
  };

  handleInput = e => {
    this.setState({
      searchWord: e.currentTarget.value,
    });
  };

  reset = () => {
    this.setState({
      searchWord: '',
    });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchform} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={css.button}>
            Search
          </button>

          <input
            className={css.input}
            type="text"
            value={this.state.searchWord}
            onChange={this.handleInput}
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
