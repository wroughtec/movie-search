// @flow

import React, { Component } from 'react';
import { Spinner } from 'components/Spinner/Spinner';
import { Card } from 'components/Card/Card';
import './_c-results.scss';

type Props = {
  searchParams: SearchContextType,
  searchTerm?: ?string
};
export class Results extends Component<Props> {
  static defaultProps = {
    searchTerm: ''
  };

  async componentDidMount() {
    const {
      searchTerm,
      searchParams: { updateSearchTerms, loadMovies }
    } = this.props;

    if (searchTerm) {
      await updateSearchTerms(searchTerm);
      loadMovies();
    }
  }

  displayCards = () => {
    const { searchParams, popular } = this.props,
      { searchResults, imageBaseUrl, popularResults, lg } = searchParams;

    let cards = <div className="c-results__no-results">No results</div>,
      movieResults = searchResults;

    if (popular) {
      movieResults = popularResults;
    }
    if (movieResults && movieResults.results && movieResults.results.length) {
      cards = movieResults.results.map(card => {
        const { title, id, release_date: releaseDate, poster_path: posterPath, overview, genre_ids: genreIds } = card;
        return (
          <Card
            key={id}
            title={title}
            releaseDate={releaseDate}
            overview={overview}
            path={posterPath}
            imageBaseUrl={imageBaseUrl}
            size={lg}
            genreIds={genreIds}
            id={id}
          />
        );
      });
    }

    return cards;
  };

  render() {
    const { searchParams } = this.props,
      { loading } = searchParams,
      cards = this.displayCards();

    return (
      <section className="c-results">
        {loading && <Spinner />}
        {!loading && <div className="c-results__container">{cards}</div>}
      </section>
    );
  }
}
