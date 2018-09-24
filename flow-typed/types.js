// @flow

declare type GenresType = {
  id: number,
  name: string
};

declare type SearchType = {
  page: number,
  results: SearchResultsType[],
  total_pages: number,
  total_results: number
};
declare type SearchResultsType = {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
};

declare type SearchContextType = {
  loading: boolean,
  imageBaseUrl: string,
  sm: string,
  md: string,
  lg: string,
  xl: string,
  genres: GenresType[],
  searchTerms: string,
  searchResults: SearchType,
  searchPageNo: number,
  handleMovieSubmit: Function,
  handleSearchChang: Function,
  updateSearchTerms: Function,
  popularResults: any,
  popularPageNo: number,
  loadMovies: Function
};
