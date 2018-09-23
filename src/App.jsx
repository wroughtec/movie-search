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
  config: any,
  searchTerms: string,
  searchResults: any
};
export class App extends Component<void, State> {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      config: {},
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
    const config = await RequestMovies.config();

    this.setState(
      produce(this.state, draft => {
        draft.config = config;
        draft.loading = false;
      })
    );
  };

  handleSearchChange = (event: SyntheticEvent<HTMLButtonElement>) => {
    this.setState(
      produce(this.state, draft => {
        draft.searchTerms = event.target.value;
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
    const { searchTerms } = this.state,
      query = { query: searchTerms },
      searchResults = await RequestMovies.searchMovies(query);

    this.setState(
      produce(this.state, draft => {
        draft.searchResults = searchResults;
        draft.loading = false;
      })
    );
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
