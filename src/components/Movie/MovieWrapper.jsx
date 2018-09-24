// @flow

import React from 'react';
import { Consumer } from 'components/SearchContext/SearchContext';
import { Movie } from './Movie';

export const MovieWrapper = (props: any) => (
  <Consumer>
    {({ xl, imageBaseUrl }: SearchContextType) => <Movie {...props} size={xl} imageBaseUrl={imageBaseUrl} />}
  </Consumer>
);
