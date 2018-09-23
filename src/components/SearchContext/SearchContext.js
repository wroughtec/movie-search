import { createContext } from 'react';

const SearchContext = createContext({
  loading: true,
  config: {},
  searchTerms: '',
  searchResults: {},
  handleMovieSubmit() {},
  handleSearchChange() {}
});

export const { Provider, Consumer } = SearchContext;
