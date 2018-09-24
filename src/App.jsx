// @flow
import React, { Component } from 'react';
import { produce } from 'immer';
import RequestMovies from './utils/requestMovies';
import './_app.scss';
import { Provider } from './components/SearchContext/SearchContext';
import { ResultsWrapper } from './components/Results/ResultsWrapper';
import { SearchBox } from './components/SearchBox/SearchBox';

type State = {
  loading: boolean,
  imageBaseUrl: string,
  sm: string,
  md: string,
  lg: string,
  xl: string,
  searchTerms: string,
  searchResults: any
};
export class App extends Component<void, State> {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      imageBaseUrl: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
      searchTerms: '',
      searchResults: {},
      handleSearchChange: this.handleSearchChange,
      handleMovieSubmit: this.handleMovieSubmit
    };
  }

  componentDidMount() {
    this.addConfigToState();
  }

  addConfigToState = async () => {
    try {
      const config = await RequestMovies.config();

      let sm, md, lg, xl, imageBaseUrl;

      if (config && config.images) {
        imageBaseUrl = config.images.secure_base_url;
        [sm, md, lg, xl] = config.images.still_sizes;
      }

      this.setState(
        produce(this.state, draft => {
          draft.imageBaseUrl = imageBaseUrl;
          draft.sm = sm;
          draft.md = md;
          draft.lg = lg;
          draft.xl = xl;
          draft.loading = false;
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  handleSearchChange = (event: SyntheticEvent<HTMLButtonElement>) => {
    this.setState(
      produce(this.state, draft => {
        draft.searchTerms = event.currentTarget.value;
      })
    );
  };

  handleMovieSubmit = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();

    this.setState(
      produce(this.state, draft => {
        draft.loading = true;
      }),
      this.searchForMovies
    );
  };

  searchForMovies = async () => {
    try {
      const { searchTerms } = this.state,
        query = { query: searchTerms },
        searchResults = await RequestMovies.searchMovies(query);

      this.setState(
        produce(this.state, draft => {
          draft.searchResults = searchResults;
          draft.loading = false;
        })
      );
    } catch (error) {
      throw new Error(error);
    }
  };

  render() {
    return (
      <Provider value={this.state}>
        <SearchBox />
        <ResultsWrapper />
      </Provider>
    );
  }
}
