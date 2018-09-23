// @flow
import { asyncFetch } from './asyncFetch';
import { searchEndpoint, configEndpoint, genresEndpoint } from '../consts/apiEndpoints';

type SearchParamProps = {
  [key: string]: string
};

class RequestMovies {
  config = () => asyncFetch(configEndpoint);

  getGenres = () => asyncFetch(genresEndpoint);

  searchMovies = (searchParams: SearchParamProps) => asyncFetch(searchEndpoint, searchParams);

  popularMovies = () => {};
}

export default new RequestMovies();
