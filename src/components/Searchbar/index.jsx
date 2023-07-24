import React, { Component } from 'react';
import style from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
    isActiveSearchButton: true,
  };

  handleInputChange = e => {
    this.setState({ query: e.target.value }, () => {
      if (!this.state.isActiveSearchButton) {
        this.props.onSubmit(this.state.query);
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.isActiveSearchButton) {
      this.props.onSubmit(this.state.query);
      this.setState({ query: '' });
    }
  };

  toggleSearchMode = () => {
    this.setState(prevState => ({
      isActiveSearchButton: !prevState.isActiveSearchButton,
    }));
  };

  render() {
    return (
      <header className={style.searchbar}>
        <form className={style.searchform} onSubmit={this.handleSubmit}>
          <div className={style['input-container']}>
            <input
              className={style['searchform-input']}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.query}
              onChange={this.handleInputChange}
            />
            {this.state.isActiveSearchButton && (
              <button
                type="submit"
                className={`${style['searchform-button']}`}
                disabled={!this.state.isActiveSearchButton}
              >
                <span className="SearchForm-button-label">Search</span>
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={this.toggleSearchMode}
            className={`${style['searchform-button']} ${style['toggle-button']}`}
          >
            Dynamic search
          </button>
        </form>
      </header>
    );
  }
}

export default Searchbar;
