// @flow

import { createContext } from 'react';
import { searchContext } from 'consts/searchContext';

const SearchContext = createContext({
  ...searchContext
});

export const { Provider, Consumer } = SearchContext;
