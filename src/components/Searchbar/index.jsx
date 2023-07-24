import React, { useState, useCallback } from 'react';
import style from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const [isActiveSearchButton, setIsActiveSearchButton] = useState(true);

  const handleInputChange = useCallback(
    e => {
      const newQuery = e.target.value;
      setQuery(newQuery);
      if (!isActiveSearchButton) {
        onSubmit(newQuery);
      }
    },
    [isActiveSearchButton, onSubmit]
  );

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (isActiveSearchButton) {
        onSubmit(query);
        setQuery('');
      }
    },
    [isActiveSearchButton, onSubmit, query]
  );

  const toggleSearchMode = useCallback(() => {
    setIsActiveSearchButton(
      prevIsActiveSearchButton => !prevIsActiveSearchButton
    );
  }, []);

  return (
    <header className={style.searchbar}>
      <form className={style.searchform} onSubmit={handleSubmit}>
        <div className={style['input-container']}>
          <input
            className={style['searchform-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={handleInputChange}
          />
          {isActiveSearchButton && (
            <button
              type="submit"
              className={`${style['searchform-button']}`}
              disabled={!isActiveSearchButton}
            >
              <span className="SearchForm-button-label">Search</span>
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={toggleSearchMode}
          className={`${style['searchform-button']} ${style['toggle-button']}`}
        >
          Dynamic search
        </button>
      </form>
    </header>
  );
};

export default Searchbar;
