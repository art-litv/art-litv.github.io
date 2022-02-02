import React from 'react';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';

import './search-form.scss';

import useRedirectedSubmit from '../../utils/hooks/useRedirectedSubmit';

function SearchForm({ className }) {
  const location = useLocation();
  const redirectUrl = location.pathname === '/' ? 'departments/' : location.pathname;

  const handleSubmit = useRedirectedSubmit(redirectUrl);

  return (
    <form className={classnames('search-form', className)} onSubmit={handleSubmit}>
      <legend className="search-form__title">Search flight</legend>
      <div className="search-form__content">
        <div className="search-form__input-group">
          <i className="search-form__icon fas fa-search"></i>
          <input
            className="search-form__input"
            name="search"
            placeholder="Airline, destination or flight #"
          />
        </div>
        <button className="search-form__btn" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
