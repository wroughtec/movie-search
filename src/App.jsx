// @flow
import React, { Component } from 'react';
import { produce } from 'immer';
import RequestMovies from 'utils/requestMovies';
import { Provider } from 'components/SearchContext/SearchContext';
import { ResultsWrapper } from 'components/Results/ResultsWrapper';
import { SearchBox } from 'components/SearchBox/SearchBox';
import { Nav } from 'components/Nav/Nav';
import { Router, navigate } from '@reach/router';
import { home, search } from 'consts/routes';
import 'app/_app.scss';

type State = {
  ...SearchContextType
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
      genres: [],
      searchTerms: '',
      searchResults: {},
      searchPageNo: 1,
      popularResults: {},
      popularPageNo: 1,
      handleSearchChange: this.handleSearchChange,
      handleMovieSubmit: this.handleMovieSubmit,
      updateSearchTerms: this.updateSearchTerms,
      loadMovies: this.loadMovies
    };
  }

  async componentDidMount() {
    Promise.all([this.addConfigToState(), this.addGenresToState(), this.addPopularToState()]).then(() =>
      this.loadingComplete()
    );
  }

  loadingComplete = () => {
    this.setState(
      produce(this.state, draft => {
        draft.loading = false;
      })
    );
  };

  addPopularToState = async () => {
    const popular = await RequestMovies.popularMovies();

    if (popular && popular.results) {
      this.setState(
        produce(this.state, draft => {
          draft.popularResults = popular;
        })
      );
    }
  };

  addConfigToState = async () => {
    const config = await RequestMovies.config();

    let sm, md, lg, xl, imageBaseUrl;

    if (config && config.images) {
      imageBaseUrl = config.images.secure_base_url;
      [sm, md, lg, xl] = config.images.still_sizes;

      this.setState(
        produce(this.state, draft => {
          draft.imageBaseUrl = imageBaseUrl;
          draft.sm = sm;
          draft.md = md;
          draft.lg = lg;
          draft.xl = xl;
        })
      );
    }
  };

  addGenresToState = async () => {
    const genres = await RequestMovies.getGenres();

    if (Array.isArray(genres.genres)) {
      this.setState(
        produce(this.state, draft => {
          draft.genres = genres.genres;
        })
      );
    }
  };

  handleSearchChange = (event: SyntheticEvent<HTMLButtonElement>) => {
    const searchTerms = event.currentTarget.value;

    this.updateSearchTerms(searchTerms);
  };

  updateSearchTerms = (searchTerms: string) => {
    this.setState(
      produce(this.state, draft => {
        draft.searchTerms = searchTerms;
      })
    );
  };

  handleMovieSubmit = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { searchTerms } = this.state;
    navigate(`/search/${searchTerms}`);
    this.loadMovies();
  };

  loadMovies = () => {
    this.setState(
      produce(this.state, draft => {
        draft.loading = true;
      }),
      this.searchForMovies
    );
  };

  searchForMovies = async () => {
    const { searchTerms, searchPageNo } = this.state,
      searchResults = await RequestMovies.searchMovies(searchTerms, searchPageNo);

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
        <Nav resetSearchTerm={this.updateSearchTerms} />
        <Router>
          <ResultsWrapper path={home} popular />
          <ResultsWrapper path={search} />
        </Router>
      </Provider>
    );
  }
}
