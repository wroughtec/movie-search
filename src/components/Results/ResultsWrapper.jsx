import React from 'react';
import { Results } from './Results';
import { Consumer } from '../SearchContext/SearchContext';

export const ResultsWrapper = props => <Consumer>{context => <Results {...props} searchParams={context} />}</Consumer>;
