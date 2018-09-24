// @flow
import {
  searchEndpoint,
  configEndpoint,
  genresEndpoint,
  popularEndpoint,
  movieDetailsEndpoint
} from 'consts/apiEndpoints';
import { asyncFetch } from 'utils/asyncFetch';

class RequestMovies {
  config = () => asyncFetch(configEndpoint);

  getGenres = () => asyncFetch(genresEndpoint);

  searchMovies = (searchText: string, pageNo?: number = 1) => {
    const searchParams = {
      query: searchText,
      page: pageNo.toString()
    };

    return asyncFetch(searchEndpoint, searchParams);
  };

  popularMovies = (pageNo?: number = 1) => {
    const params = {
      page: pageNo.toString()
    };

    return asyncFetch(popularEndpoint, params);
  };

  movieDetails = (id: string) => asyncFetch(movieDetailsEndpoint(id));
}

export default new RequestMovies();
