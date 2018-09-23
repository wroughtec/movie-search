// @flow
import { asyncFetch } from './asyncFetch';
import { searchEndpoint, configEndpoint } from '../consts/apiEndpoints';

type SearchParamProps = {
  [key: string]: string
};

class RequestMovies {
  config = () => asyncFetch(configEndpoint);

  searchMovies = (searchParams: SearchParamProps) => asyncFetch(searchEndpoint, searchParams);

  popularMovies = () => {};
}

export default new RequestMovies();
