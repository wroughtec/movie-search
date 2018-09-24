// @flow

import React from 'react';
import { Consumer } from '../SearchContext/SearchContext';
import './_c-search-box.scss';

export const SearchBox = () => (
  <Consumer>
    {context => (
      <section className="c-search-box">
        <form className="c-search-box__form" onSubmit={context.handleMovieSubmit}>
          <label htmlFor="search" className="c-search-box__label">
            Search
            <div className="c-search-box__input-wrapper">
              <input
                className="c-search-box__input"
                id="search"
                name="search"
                value={context.searchTerms}
                onChange={context.handleSearchChange}
              />
              <button className="c-search-box__btn">Search</button>
            </div>
          </label>
        </form>
      </section>
    )}
  </Consumer>
);
