// @flow

import React from 'react';
import { Consumer } from 'components/SearchContext/SearchContext';
import { Results } from './Results';

export const ResultsWrapper = (props: any) => (
  <Consumer>{(context: SearchContextType) => <Results {...props} searchParams={context} />}</Consumer>
);
