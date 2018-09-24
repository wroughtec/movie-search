// @flow

import React, { Component } from 'react';
import { Spinner } from '../Spinner/Spinner';
import { Card } from '../Card/Card';
import './_c-results.scss';

export class Results extends Component {
  displayCards = () => {
    const { searchParams } = this.props,
      { searchResults, imageBaseUrl, lg } = searchParams;

    let cards = null;

    if (searchResults && searchResults.results) {
      if (searchResults.results.length) {
        cards = searchResults.results.map(card => {
          const { title, id, release_date: releaseDate, poster_path: posterPath, overview } = card;
          return (
            <Card
              key={id}
              title={title}
              releaseDate={releaseDate}
              overview={overview}
              path={posterPath}
              imageBaseUrl={imageBaseUrl}
              size={lg}
            />
          );
        });
      }
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
